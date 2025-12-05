// src/app/views/bookings/my-bookings/my-bookings.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { PageHeroComponent } from '@/app/shared/components/page-hero/page-hero.component';
import { FormattersService } from '@/app/shared/service/formatters.service';
import { SHARED_IMPORTS } from '@/app/shared/shared-imports';
import { BookingWithDetails } from '@core/models/fitness.models';
import { FitnessClassService } from '@core/services/fitness-class.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, PageHeroComponent, ...SHARED_IMPORTS],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingWithDetails[] = [];
  loading = false;

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

  trackByBookingId(_index: number, booking: BookingWithDetails): string {
    return booking.id;
  }
}
