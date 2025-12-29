import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { FallbackImageDirective } from '@/app/shared/directives/fallback-image.directive';
import { FormattersService } from '@/app/shared/service/formatters.service';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { BookingWithDetails, FitnessClass, Instructor } from '@core/models/fitness.models';
import { AuthService } from '@core/services/auth.service';
import { FitnessClassService } from '@core/services/fitness-class.service';
import { ToastService } from '@core/services/toast.service';

type TimeFilter = 'all' | 'upcoming' | 'past';
type StatusFilter = 'all' | 'booked' | 'cancelled' | 'no_show';

type SortOption =
  | 'newest'
  | 'oldest'
  | 'class_name_asc'
  | 'class_name_desc'
  | 'session_date_asc'
  | 'session_date_desc';

interface GroupedMonth {
  monthLabel: string;
  bookings: BookingWithDetails[];
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PageHeroComponent,
    FallbackImageDirective,
    ...SHARED_IMPORTS,
  ],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  @Input() showHero = true;

  bookings: BookingWithDetails[] = [];

  groupedBookings: GroupedMonth[] = [];

  loading = false;

  // FILTER STATE
  timeFilter: TimeFilter = 'upcoming';
  statusFilter: StatusFilter = 'all';

  // SORTING STATE
  sortOption: SortOption = 'newest';

  bookingPendingCancel: BookingWithDetails | null = null;
  cancellingBookingId: string | null = null;

  constructor(
    private fitnessClassService: FitnessClassService,
    public formatter: FormattersService,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private loadBookings(): void {
    this.loading = true;

    this.fitnessClassService
      .getMyBookings()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.bookings = data;
          this.computeGroupedBookings(); // compute once after load
        },
        error: () => {
          this.toast.error('Could not load your bookings at this time.');
        },
      });
  }

  isUpcoming(booking: BookingWithDetails): boolean {
    const s = booking.class_session;
    const start = new Date(`${s.date}T${s.start_time}`);
    return start.getTime() >= Date.now();
  }

  private applyFilters(list: BookingWithDetails[]): BookingWithDetails[] {
    return list.filter((b) => {
      // Time filter
      if (this.timeFilter === 'upcoming' && !this.isUpcoming(b)) return false;
      if (this.timeFilter === 'past' && this.isUpcoming(b)) return false;

      // Status filter
      if (this.statusFilter !== 'all' && b.status !== this.statusFilter) return false;

      return true;
    });
  }

  setTimeFilter(value: TimeFilter): void {
    this.timeFilter = value;
    this.computeGroupedBookings();
  }

  setStatusFilter(value: StatusFilter): void {
    this.statusFilter = value;
    this.computeGroupedBookings();
  }

  private applySorting(list: BookingWithDetails[]): BookingWithDetails[] {
    return [...list].sort((a, b) => {
      const as = a.class_session;
      const bs = b.class_session;

      if (!as || !bs) {
        return 0; // safety guard
      }

      const dateA = new Date(`${as.date}T${as.start_time}`).getTime();
      const dateB = new Date(`${bs.date}T${bs.start_time}`).getTime();

      switch (this.sortOption) {
        case 'newest':
          // ✅ closest / soonest session first
          return dateA - dateB;

        case 'oldest':
          // furthest in the future first
          return dateB - dateA;

        case 'class_name_asc':
          return as.fitness_class.name.localeCompare(bs.fitness_class.name);

        case 'class_name_desc':
          return bs.fitness_class.name.localeCompare(as.fitness_class.name);

        case 'session_date_asc':
          // same as 'newest' – earliest date first
          return dateA - dateB;

        case 'session_date_desc':
          // latest date first
          return dateB - dateA;
      }
    });
  }

  onSortChange(): void {
    this.computeGroupedBookings();
  }

  // -----------------------------
  // GROUP BY MONTH
  // -----------------------------
  private applyGrouping(list: BookingWithDetails[]): GroupedMonth[] {
    const groups: Record<string, BookingWithDetails[]> = {};

    list.forEach((booking) => {
      const s = booking.class_session;
      const date = new Date(`${s.date}T00:00:00`);

      const monthLabel = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      if (!groups[monthLabel]) groups[monthLabel] = [];
      groups[monthLabel].push(booking);
    });

    return Object.entries(groups).map(([monthLabel, bookings]) => ({
      monthLabel,
      bookings,
    }));
  }

  computeGroupedBookings(): void {
    const filtered = this.applyFilters(this.bookings);
    const sorted = this.applySorting(filtered);
    this.groupedBookings = this.applyGrouping(sorted);
  }

  getInstructors(b: BookingWithDetails): Instructor[] {
    const cls = b.class_session.fitness_class as FitnessClass;
    return cls.instructors || [];
  }

  trackByBookingId(_: number, b: BookingWithDetails): string {
    return b.id;
  }

  // Track global cancelling state (used to disable modal buttons)
  isCancelling = false;

  // ---- Helpers ----

  // Only allow cancelling for active, upcoming bookings
  canCancel(booking: BookingWithDetails): boolean {
    return booking.status === 'booked' && this.isUpcoming(booking);
  }

  // ---- Modal open/close ----

  openCancelModal(booking: BookingWithDetails): void {
    if (!this.canCancel(booking)) {
      return;
    }
    this.bookingPendingCancel = booking;
  }

  closeCancelModal(): void {
    // Don’t close while a cancel request is in flight
    if (this.isCancelling) return;
    this.bookingPendingCancel = null;
  }

  // ---- Confirm + call API ----

  confirmCancelBooking(): void {
    const booking = this.bookingPendingCancel;
    if (!booking) {
      return;
    }

    this.isCancelling = true;
    this.cancellingBookingId = booking.id;

    this.fitnessClassService.cancelBooking(booking.id).subscribe({
      next: (updated) => {
        // Merge updated booking from backend into local list
        const idx = this.bookings.findIndex((b) => b.id === updated.id);
        if (idx !== -1) {
          this.bookings[idx] = {
            ...this.bookings[idx],
            ...updated,
          };
        }

        // 🔁 Rebuild filtered/sorted/grouped view
        // Replace this with whatever method you already use
        // to recompute groupedBookings from this.bookings.
        // e.g. this.applyFiltersAndSorting(); or this.computeGroupedBookings();
        this.computeGroupedBookings?.();
        // If your method is named differently, change the line above.

        this.toast.success('Your booking has been cancelled.');

        this.isCancelling = false;
        this.cancellingBookingId = null;
        this.bookingPendingCancel = null;
      },
      error: (err) => {
        this.isCancelling = false;
        this.cancellingBookingId = null;

        const detail = err?.error?.detail;

        if (detail === 'This booking is not active.') {
          this.toast.error('This booking is already cancelled.');
        } else if (
          detail === 'Cancellation window has passed. Please contact the gym if you need help.'
        ) {
          this.toast.error('Cancellation window has passed. Please contact the gym.');
        } else if (detail === 'Not found.') {
          this.toast.error('Booking not found or not owned by this account.');
        } else {
          this.toast.error('Could not cancel this booking. Please try again.');
        }

        // keep the modal open so they can read the message;
        // they can press "Keep booking" to close it
      },
    });
  }
}
