import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { FormattersService } from '@/app/shared/service/formatters.service';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { BookingWithDetails } from '@core/models/fitness.models';
import { FitnessClassService } from '@core/services/fitness-class.service';
import { ToastService } from '@core/services/toast.service';

type TimeFilter = 'all' | 'upcoming' | 'past';
type StatusFilter = 'all' | 'booked' | 'cancelled' | 'no_show';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeroComponent, ...SHARED_IMPORTS],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingWithDetails[] = [];
  loading = false;

  // --- filters ---
  timeFilter: TimeFilter = 'upcoming'; // default: only upcoming
  statusFilter: StatusFilter = 'all'; // default: all statuses

  constructor(
    private fitnessClassService: FitnessClassService,
    public display: FormattersService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  private loadBookings(): void {
    this.loading = true;

    this.fitnessClassService
      .getMyBookings()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (bookings) => {
          this.bookings = bookings;
        },
        error: (err) => {
          console.error('Failed to load bookings', err);
          this.toast.error('Could not load your bookings at the moment. Please try again.');
        },
      });
  }

  // --- filter helpers ---

  /** Session is upcoming if its start datetime is in the future. */
  private isUpcoming(booking: BookingWithDetails): boolean {
    const s = booking.class_session;
    // naive local Date – good enough for this UI
    const start = new Date(`${s.date}T${s.start_time}`);
    const now = new Date();
    return start.getTime() >= now.getTime();
  }

  get filteredBookings(): BookingWithDetails[] {
    return this.bookings.filter((b) => {
      // time filter
      if (this.timeFilter === 'upcoming' && !this.isUpcoming(b)) {
        return false;
      }
      if (this.timeFilter === 'past' && this.isUpcoming(b)) {
        return false;
      }

      // status filter
      if (this.statusFilter !== 'all' && b.status !== this.statusFilter) {
        return false;
      }

      return true;
    });
  }

  setTimeFilter(value: TimeFilter): void {
    this.timeFilter = value;
  }

  setStatusFilter(value: StatusFilter): void {
    this.statusFilter = value;
  }

  trackByBookingId(_index: number, booking: BookingWithDetails): string {
    return booking.id;
  }
}
