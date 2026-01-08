import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClassSession, FitnessClass } from '@core/models/fitness.models';

import { FormattersService } from '../../service/formatters.service';
import { SHARED_IMPORTS } from '../../shared-imports';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SHARED_IMPORTS],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss',
})
export class SessionListComponent {
  @Input() sessions: ClassSession[] = [];
  @Input() loading = false;
  @Input() isLoggedIn = false;
  @Input() showGuestBooking = false;
  @Input() activeGuestSessionId: string | null = null;
  @Input() guestName = '';
  @Input() guestEmail = '';
  @Input() guestPhone = '';
  @Input() guestBookingComplete = false;
  @Input() guestBookingId: string | null = null;
  @Input() guestCancelToken: string | null = null;
  @Input() paymentLink: string | null | undefined;

  /**
   * Map of session.id -> loading boolean.
   * Parent sets bookingLoading[session.id] = true while it calls the booking API
   * and (if needed) shows Stripe payment UI.
   */
  @Input() bookingLoading: Record<string, boolean> = {};

  @Input() fitnessClass: FitnessClass | null = null;

  @Output() book = new EventEmitter<ClassSession>();
  @Output() guestBook = new EventEmitter<ClassSession>();
  @Output() guestCancel = new EventEmitter<void>();
  @Output() guestNameChange = new EventEmitter<string>();
  @Output() guestEmailChange = new EventEmitter<string>();
  @Output() guestPhoneChange = new EventEmitter<string>();

  constructor(private formattersService: FormattersService) {}

  sessionDateLabel(session: ClassSession): string {
    return this.formattersService.formatSessionDate(session);
  }

  sessionTimeLabel(session: ClassSession): string {
    return this.formattersService.formatSessionTime(session);
  }

  effectiveCapacity(session: ClassSession): number | null {
    return this.formattersService.getSessionCapacity(session, this.fitnessClass);
  }

  effectivePrice(session: ClassSession): number | null {
    return this.formattersService.getSessionPrice(session, this.fitnessClass);
  }

  isFull(session: ClassSession): boolean {
    return session.spaces_left <= 0 || session.status === 'cancelled';
  }

  getSpacesLabel(session: ClassSession): string {
    if (session.status === 'cancelled') {
      return 'Cancelled';
    }

    if (session.spaces_left <= 0) {
      return 'CLASS FULL';
    }

    return `${session.spaces_left} spaces left`;
  }

  getSpacesClass(session: ClassSession): string {
    if (session.status === 'cancelled') return 'badge-spaces cancelled';
    if (session.spaces_left <= 0) return 'badge-spaces sold-out';
    if (session.spaces_left <= 20) return 'badge-spaces low';
    return 'badge-spaces';
  }

  onBook(session: ClassSession): void {
    // Parent component will:
    // 1) set bookingLoading[session.id] = true
    // 2) call BookingService.bookSession(session.id)
    // 3) if stripe_client_secret exists, open Stripe payment UI
    // 4) when finished, clear bookingLoading[session.id]
    this.book.emit(session);
  }

  onGuestBook(session: ClassSession): void {
    this.guestBook.emit(session);
  }

  onGuestCancel(): void {
    this.guestCancel.emit();
  }

  updateGuestName(value: string): void {
    this.guestName = value;
    this.guestNameChange.emit(value);
  }

  updateGuestEmail(value: string): void {
    this.guestEmail = value;
    this.guestEmailChange.emit(value);
  }

  updateGuestPhone(value: string): void {
    this.guestPhone = value;
    this.guestPhoneChange.emit(value);
  }
}
