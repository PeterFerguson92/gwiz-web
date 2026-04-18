import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AttendanceCheckInByTokenResponse } from '@core/models/attendance.models';
import { AttendanceService } from '@core/services/attendance.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-staff-token-check-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './staff-token-check-in.component.html',
  styleUrls: ['./staff-token-check-in.component.scss'],
})
export class StaffTokenCheckInComponent {
  private attendanceService = inject(AttendanceService);
  private toast = inject(ToastService);

  tokenControl = new FormControl('', { nonNullable: true });
  isSubmitting = false;
  lastResult: AttendanceCheckInByTokenResponse | null = null;
  errorMessage = '';

  get resultHeadline(): string {
    if (!this.lastResult) {
      return '';
    }

    return `${this.lastResult.display_name} — CHECKED IN`;
  }

  submit(): void {
    const token = this.tokenControl.value.trim();
    if (!token || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.attendanceService.checkInByToken({ token, source: 'manual' }).subscribe({
      next: (result) => {
        this.lastResult = result;
        this.isSubmitting = false;
        this.toast.success(`${this.labelForKind(result.kind)} checked in.`);
        this.tokenControl.setValue('');
      },
      error: (error: HttpErrorResponse) => {
        this.lastResult = null;
        this.isSubmitting = false;
        this.errorMessage = error.error?.detail || 'Unable to check in by token.';
        this.toast.error(this.errorMessage);
      },
    });
  }

  private labelForKind(kind: AttendanceCheckInByTokenResponse['kind']): string {
    return kind === 'booking' ? 'Booking' : 'Ticket';
  }
}
