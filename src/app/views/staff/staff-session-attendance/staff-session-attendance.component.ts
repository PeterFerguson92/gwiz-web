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
  selector: 'app-staff-session-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './staff-session-attendance.component.html',
  styleUrls: ['./staff-session-attendance.component.scss'],
})
export class StaffSessionAttendanceComponent {
  private route = inject(ActivatedRoute);
  private attendanceService = inject(AttendanceService);
  private toast = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  sessionId = '';
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
  readonly filters = ['eligible', 'all', 'checked_in'] as const;
  activeFilter: (typeof this.filters)[number] = 'eligible';

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.sessionId = params.get('sessionId') ?? '';
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
    return this.filteredAttendees.length > 0;
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
    if (this.isSearchMode) {
      return 'No attendee matched that email or booking ID.';
    }

    if (this.activeFilter === 'checked_in') {
      return 'No one is checked in yet for this session.';
    }

    if (this.activeFilter === 'eligible') {
      return 'No check-in-ready attendees are available for this session.';
    }

    return 'No attendees are available for this session yet.';
  }

  get filteredAttendees(): AttendanceAttendeeItem[] {
    return this.attendees.filter((attendee) => this.matchesFilter(attendee));
  }

  get resultCount(): number {
    return this.filteredAttendees.length;
  }

  get visibleTotalCount(): number {
    return this.resultCount;
  }

  get checkedInCount(): number {
    return this.filteredAttendees.filter((attendee) => this.isCheckedIn(attendee)).length;
  }

  get remainingCount(): number {
    return Math.max(0, this.visibleTotalCount - this.checkedInCount);
  }

  get filterSummary(): string {
    if (this.activeFilter === 'checked_in') {
      return 'Checked in';
    }

    if (this.activeFilter === 'eligible') {
      return 'Eligible';
    }

    return this.isSearchMode ? 'Search results' : 'All attendees';
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
      attendee.status === 'booked' &&
      (attendee.payment_status === 'paid' || attendee.payment_status === 'included') &&
      !this.isCheckedIn(attendee)
    );
  }

  setFilter(filter: (typeof this.filters)[number]): void {
    this.activeFilter = filter;
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
      ? this.attendanceService.searchBookings(this.sessionId, {
          q: this.activeQuery,
          page,
          page_size: this.pageSize,
        })
      : this.attendanceService.getSessionAttendees(this.sessionId, {
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
      ? this.attendanceService.revertBookingCheckIn(attendee.id)
      : this.attendanceService.checkInBooking(attendee.id);

    request$.subscribe({
      next: () => {
        this.toast.success(this.isCheckedIn(attendee) ? 'Booking check-in reverted.' : 'Booking checked in.');
        this.refreshCurrentView();
      },
      error: (error: HttpErrorResponse) => {
        this.rowLoading[attendee.id] = false;
        this.toast.error(this.getErrorMessage(error, 'Unable to update booking attendance.'));
      },
    });
  }

  refreshCurrentView(): void {
    this.loadPage(this.currentPage);
  }

  trackById(_: number, attendee: AttendanceAttendeeItem): string {
    return attendee.id;
  }

  private matchesFilter(attendee: AttendanceAttendeeItem): boolean {
    if (this.activeFilter === 'all') {
      return true;
    }

    if (this.activeFilter === 'checked_in') {
      return this.isCheckedIn(attendee);
    }

    return this.canCheckIn(attendee) || this.isCheckedIn(attendee);
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
