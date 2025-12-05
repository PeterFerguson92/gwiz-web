import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
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
    SidebarComponent,
    FallbackImageDirective,
    ...SHARED_IMPORTS,
  ],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingWithDetails[] = [];

  groupedBookings: GroupedMonth[] = [];

  loading = false;

  // FILTER STATE
  timeFilter: TimeFilter = 'upcoming';
  statusFilter: StatusFilter = 'all';

  // SORTING STATE
  sortOption: SortOption = 'newest';

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

      const dateA = new Date(`${as.date}T${as.start_time}`).getTime();
      const dateB = new Date(`${bs.date}T${bs.start_time}`).getTime();

      switch (this.sortOption) {
        case 'newest':
          return dateB - dateA;
        case 'oldest':
          return dateA - dateB;
        case 'class_name_asc':
          return as.fitness_class.name.localeCompare(bs.fitness_class.name);
        case 'class_name_desc':
          return bs.fitness_class.name.localeCompare(as.fitness_class.name);
        case 'session_date_asc':
          return dateA - dateB;
        case 'session_date_desc':
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
}
