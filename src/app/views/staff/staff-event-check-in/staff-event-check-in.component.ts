import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  AttendanceAttendeeItem,
  AttendancePaginatedResponse,
} from '@core/models/attendance.models';
import { AttendanceService } from '@core/services/attendance.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-staff-event-check-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './staff-event-check-in.component.html',
  styleUrls: ['./staff-event-check-in.component.scss'],
})
export class StaffEventCheckInComponent {
  private route = inject(ActivatedRoute);
  private attendanceService = inject(AttendanceService);
  private toast = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  eventId = '';
  searchControl = new FormControl('', { nonNullable: true });
  attendees: AttendanceAttendeeItem[] = [];
  rowLoading: Record<string, boolean> = {};
  isLoading = true;
  errorMessage = '';
  currentPage = 1;
  pageSize = 25;
  totalCount = 0;
  totalPages = 1;
  activeQuery = '';

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('eventId') ?? '';
      this.searchControl.setValue('', { emitEvent: false });
      this.activeQuery = '';
      this.loadPage(1);
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((query) => {
        this.activeQuery = query.trim();
        this.loadPage(1);
      });
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasRows(): boolean {
    return this.attendees.length > 0;
  }

  get isSearchMode(): boolean {
    return this.activeQuery.length > 0;
  }

  get loadingCopy(): string {
    return this.isSearchMode ? 'Searching attendees for the door list…' : 'Loading live attendee list…';
  }

  get errorTitle(): string {
    return this.isSearchMode ? 'Search unavailable' : 'Live attendee list unavailable';
  }

  get emptyCopy(): string {
    return this.isSearchMode
      ? 'No attendee matched that email or ticket ID.'
      : 'No attendees are available for this event yet.';
  }

  isCheckedIn(attendee: AttendanceAttendeeItem): boolean {
    return !!attendee.checked_in_at;
  }

  checkInStateLabel(attendee: AttendanceAttendeeItem): string {
    if (this.isCheckedIn(attendee)) {
      return 'Checked in';
    }

    return this.canCheckIn(attendee) ? 'Ready to check in' : 'Unavailable';
  }

  checkInStateClass(attendee: AttendanceAttendeeItem): string {
    if (this.isCheckedIn(attendee)) {
      return 'checked-in';
    }

    return this.canCheckIn(attendee) ? 'ready' : 'unavailable';
  }

  canCheckIn(attendee: AttendanceAttendeeItem): boolean {
    return (
      attendee.status === 'confirmed' &&
      (attendee.payment_status === 'paid' || attendee.payment_status === 'included') &&
      !this.isCheckedIn(attendee)
    );
  }

  isRowLoading(attendeeId: string): boolean {
    return !!this.rowLoading[attendeeId];
  }

  isActionDisabled(attendee: AttendanceAttendeeItem): boolean {
    if (this.isRowLoading(attendee.id)) {
      return true;
    }

    if (this.isCheckedIn(attendee)) {
      return false;
    }

    return !this.canCheckIn(attendee);
  }

  rowActionLabel(attendee: AttendanceAttendeeItem): string {
    if (this.isRowLoading(attendee.id)) {
      return this.isCheckedIn(attendee) ? 'Undoing…' : 'Checking in…';
    }

    if (this.isCheckedIn(attendee)) {
      return 'Undo';
    }

    return this.canCheckIn(attendee) ? 'Check in' : 'Unavailable';
  }

  loadPage(page: number): void {
    if (page < 1) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request$ = this.isSearchMode
      ? this.attendanceService.searchTickets({
          q: this.activeQuery,
          page,
          page_size: this.pageSize,
        })
      : this.attendanceService.getEventAttendees(this.eventId, {
          page,
          page_size: this.pageSize,
        });

    request$.subscribe({
      next: (response) => this.applyResponse(response, page),
      error: () => {
        this.attendees = [];
        this.totalCount = 0;
        this.totalPages = 1;
        this.isLoading = false;
        this.errorMessage = this.isSearchMode
          ? 'Search failed. Clear the query or try again.'
          : 'Could not refresh the live attendee list. Try again.';
      },
    });
  }

  toggleCheckIn(attendee: AttendanceAttendeeItem): void {
    if (this.isActionDisabled(attendee)) {
      return;
    }

    this.rowLoading[attendee.id] = true;

    const request$ = this.isCheckedIn(attendee)
      ? this.attendanceService.revertTicketCheckIn(attendee.id)
      : this.attendanceService.checkInTicket(attendee.id);

    request$.subscribe({
      next: () => {
        this.toast.success(this.isCheckedIn(attendee) ? 'Ticket check-in reverted.' : 'Ticket checked in.');
        this.refreshCurrentView();
      },
      error: (error: HttpErrorResponse) => {
        this.rowLoading[attendee.id] = false;
        this.toast.error(this.getErrorMessage(error, 'Unable to update ticket attendance.'));
      },
    });
  }

  refreshCurrentView(): void {
    this.loadPage(this.currentPage);
  }

  trackById(_: number, attendee: AttendanceAttendeeItem): string {
    return attendee.id;
  }

  private applyResponse(
    response: AttendancePaginatedResponse<AttendanceAttendeeItem>,
    page: number
  ): void {
    this.attendees = response.results;
    this.totalCount = response.count;
    this.currentPage = page;
    this.totalPages = Math.max(1, Math.ceil(response.count / this.pageSize));
    this.rowLoading = {};
    this.isLoading = false;
  }

  private getErrorMessage(error: HttpErrorResponse, fallback: string): string {
    return error.error?.detail || fallback;
  }
}
