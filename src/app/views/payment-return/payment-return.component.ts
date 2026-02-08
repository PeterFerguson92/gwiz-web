import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { EventService } from '@core/services/event.service';
import { FitnessClassService } from '@core/services/fitness-class.service';

type PaymentReturnStatus =
  | 'checking'
  | 'pending'
  | 'paid'
  | 'void'
  | 'none'
  | 'timeout'
  | 'error'
  | 'unauth';

@Component({
  selector: 'app-payment-return',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-return.component.html',
  styleUrls: ['./payment-return.component.scss'],
})
export class PaymentReturnComponent implements OnInit, OnDestroy {
  status: PaymentReturnStatus = 'checking';
  message = 'Payment processing…';

  private pollTimerId: number | null = null;
  private attempts = 0;
  private readonly maxAttempts = 40;
  private readonly pollIntervalMs = 3000;
  private initialCheckDone = false;
  private pendingBookingIds = new Set<string>();
  private pendingTicketIds = new Set<string>();

  constructor(
    private authService: AuthService,
    private fitnessClassService: FitnessClassService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.status = 'unauth';
      this.message = 'Please log in to confirm your payment status.';
      return;
    }

    this.checkStatus();
    this.pollTimerId = window.setInterval(() => this.checkStatus(), this.pollIntervalMs);
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private stopPolling(): void {
    if (this.pollTimerId) {
      window.clearInterval(this.pollTimerId);
      this.pollTimerId = null;
    }
  }

  private checkStatus(): void {
    this.attempts += 1;

    forkJoin({
      bookings: this.fitnessClassService.getMyBookings(),
      tickets: this.eventService.getMyTickets(),
    }).subscribe({
      next: ({ bookings, tickets }) => {
        if (!this.initialCheckDone) {
          bookings
            .filter((booking) => booking.payment_status === 'pending')
            .forEach((booking) => this.pendingBookingIds.add(booking.id));
          tickets
            .filter((ticket) => ticket.payment_status === 'pending')
            .forEach((ticket) => this.pendingTicketIds.add(ticket.id));

          this.initialCheckDone = true;

          if (this.pendingBookingIds.size === 0 && this.pendingTicketIds.size === 0) {
            this.status = 'none';
            this.message =
              'No pending payments found. If you just paid, check My Bookings or My Tickets in a moment.';
            this.stopPolling();
            return;
          }
        }

        const paidBooking = bookings.find(
          (booking) =>
            this.pendingBookingIds.has(booking.id) && booking.payment_status === 'paid'
        );
        const paidTicket = tickets.find(
          (ticket) => this.pendingTicketIds.has(ticket.id) && ticket.payment_status === 'paid'
        );
        const voidBooking = bookings.find(
          (booking) =>
            this.pendingBookingIds.has(booking.id) && booking.payment_status === 'void'
        );
        const voidTicket = tickets.find(
          (ticket) => this.pendingTicketIds.has(ticket.id) && ticket.payment_status === 'void'
        );

        if (paidBooking || paidTicket) {
          this.status = 'paid';
          this.message = 'Payment confirmed. Your booking or ticket is now active.';
          this.stopPolling();
          return;
        }

        if (voidBooking || voidTicket) {
          this.status = 'void';
          this.message = 'Payment was cancelled or voided. No charge was completed.';
          this.stopPolling();
          return;
        }

        if (this.attempts >= this.maxAttempts) {
          this.status = 'timeout';
          this.message = 'Payment is still processing. Please check back in a few minutes.';
          this.stopPolling();
          return;
        }

        this.status = 'pending';
        this.message = 'Payment processing…';
      },
      error: () => {
        if (this.attempts >= this.maxAttempts) {
          this.status = 'error';
          this.message = 'Unable to confirm payment status right now.';
          this.stopPolling();
        }
      },
    });
  }
}
