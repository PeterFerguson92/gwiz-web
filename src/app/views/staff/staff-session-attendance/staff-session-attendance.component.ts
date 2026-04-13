import { CommonModule } from '@angular/common';
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
  private destroyRef = inject(DestroyRef);

  sessionId = '';
  searchControl = new FormControl('', { nonNullable: true });
  attendees: AttendanceAttendeeItem[] = [];
  isLoading = true;
  errorMessage = '';
  currentPage = 1;
  pageSize = 25;
  totalCount = 0;
  totalPages = 1;
  activeQuery = '';

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
    return this.attendees.length > 0;
  }

  get isSearchMode(): boolean {
    return this.activeQuery.length > 0;
  }

  isCheckedIn(attendee: AttendanceAttendeeItem): boolean {
    return !!attendee.checked_in_at;
  }

  loadPage(page: number): void {
    if (page < 1) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request$ = this.isSearchMode
      ? this.attendanceService.searchBookings({
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
          ? 'Could not run attendee search. Please try again.'
          : 'Please try again in a moment.';
      },
    });
  }

  trackById(_: number, attendee: AttendanceAttendeeItem): string {
    return attendee.id;
  }

  private applyResponse(response: AttendancePaginatedResponse<AttendanceAttendeeItem>, page: number): void {
    this.attendees = response.results;
    this.totalCount = response.count;
    this.currentPage = page;
    this.totalPages = Math.max(1, Math.ceil(response.count / this.pageSize));
    this.isLoading = false;
  }
}
