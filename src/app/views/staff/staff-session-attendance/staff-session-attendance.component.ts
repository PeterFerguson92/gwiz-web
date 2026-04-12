import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  AttendanceAttendeeItem,
  AttendancePaginatedResponse,
} from '@core/models/attendance.models';
import { AttendanceService } from '@core/services/attendance.service';

@Component({
  selector: 'app-staff-session-attendance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-session-attendance.component.html',
  styleUrls: ['./staff-session-attendance.component.scss'],
})
export class StaffSessionAttendanceComponent {
  private route = inject(ActivatedRoute);
  private attendanceService = inject(AttendanceService);

  sessionId = '';
  attendees: AttendanceAttendeeItem[] = [];
  isLoading = true;
  errorMessage = '';
  currentPage = 1;
  pageSize = 25;
  totalCount = 0;
  totalPages = 1;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.sessionId = params.get('sessionId') ?? '';
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

  isCheckedIn(attendee: AttendanceAttendeeItem): boolean {
    return !!attendee.checked_in_at;
  }

  loadPage(page: number): void {
    if (page < 1) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.attendanceService
      .getSessionAttendees(this.sessionId, {
        page,
        page_size: this.pageSize,
      })
      .subscribe({
        next: (response) => this.applyResponse(response, page),
        error: () => {
          this.attendees = [];
          this.totalCount = 0;
          this.totalPages = 1;
          this.isLoading = false;
          this.errorMessage = 'Please try again in a moment.';
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
