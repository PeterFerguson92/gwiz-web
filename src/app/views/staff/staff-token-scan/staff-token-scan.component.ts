import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, NgZone, OnDestroy } from '@angular/core';

import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

import { AttendanceCheckInByTokenResponse } from '@core/models/attendance.models';
import { AttendanceService } from '@core/services/attendance.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-staff-token-scan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-token-scan.component.html',
  styleUrls: ['./staff-token-scan.component.scss'],
})
export class StaffTokenScanComponent implements AfterViewInit, OnDestroy {
  readonly scannerRegionId = 'staff-token-scanner';
  private readonly duplicateGuardMs = 3000;
  private attendanceService = inject(AttendanceService);
  private toast = inject(ToastService);
  private ngZone = inject(NgZone);

  private qrScanner: Html5Qrcode | null = null;
  private pausedUntil = 0;
  private resumeTimeoutId: number | null = null;

  isScannerReady = false;
  isSubmitting = false;
  errorMessage = '';
  lastResult: AttendanceCheckInByTokenResponse | null = null;

  async ngAfterViewInit(): Promise<void> {
    await this.startScanner();
  }

  async ngOnDestroy(): Promise<void> {
    if (this.resumeTimeoutId !== null) {
      window.clearTimeout(this.resumeTimeoutId);
    }

    if (this.qrScanner?.isScanning) {
      await this.qrScanner.stop();
    }
    await this.qrScanner?.clear();
  }

  async restartScanner(): Promise<void> {
    this.errorMessage = '';
    this.lastResult = null;

    if (this.qrScanner?.isScanning) {
      await this.qrScanner.stop();
      await this.qrScanner.clear();
    }

    await this.startScanner();
  }

  private async startScanner(): Promise<void> {
    this.isScannerReady = false;
    this.errorMessage = '';

    try {
      this.qrScanner = new Html5Qrcode(this.scannerRegionId, {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false,
      });

      await this.qrScanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText) => {
          void this.handleScan(decodedText);
        },
        () => {}
      );

      this.isScannerReady = true;
    } catch {
      this.errorMessage = 'Camera scanner could not start. Check camera permissions and try again.';
      this.toast.error(this.errorMessage);
    }
  }

  private async handleScan(decodedText: string): Promise<void> {
    const now = Date.now();
    if (this.isSubmitting || now < this.pausedUntil) {
      return;
    }

    const token = this.extractToken(decodedText);
    if (!token) {
      this.pausedUntil = now + this.duplicateGuardMs;
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.lastResult = null;
    this.pausedUntil = now + this.duplicateGuardMs;
    this.qrScanner?.pause(true);

    this.attendanceService.checkInByToken({ token, source: 'qr' }).subscribe({
      next: (result) => {
        this.ngZone.run(() => {
          this.lastResult = result;
          this.isSubmitting = false;
          this.toast.success(`${this.labelForKind(result.kind)} checked in.`);
          this.scheduleScannerResume();
        });
      },
      error: (error: HttpErrorResponse) => {
        this.ngZone.run(() => {
          this.errorMessage = error.error?.detail || 'Unable to check in by token.';
          this.lastResult = null;
          this.isSubmitting = false;
          this.toast.error(this.errorMessage);
          this.scheduleScannerResume();
        });
      },
    });
  }

  private scheduleScannerResume(): void {
    if (this.resumeTimeoutId !== null) {
      window.clearTimeout(this.resumeTimeoutId);
    }

    this.resumeTimeoutId = window.setTimeout(() => {
      this.qrScanner?.resume();
    }, this.duplicateGuardMs);
  }

  private extractToken(rawValue: string): string | null {
    const trimmed = rawValue.trim();
    if (!trimmed) {
      return null;
    }

    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (uuidPattern.test(trimmed)) {
      return trimmed;
    }

    try {
      const url = new URL(trimmed);
      const token = url.searchParams.get('token')?.trim() || '';
      return uuidPattern.test(token) ? token : null;
    } catch {
      return null;
    }
  }

  private labelForKind(kind: AttendanceCheckInByTokenResponse['kind']): string {
    return kind === 'booking' ? 'Booking' : 'Ticket';
  }
}
