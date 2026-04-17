import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, NgZone, OnDestroy } from '@angular/core';

import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

import { AttendanceCheckInByTokenResponse } from '@core/models/attendance.models';
import { AttendanceService } from '@core/services/attendance.service';
import { ToastService } from '@core/services/toast.service';

type ScanResultState = 'success' | 'already_checked_in' | 'invalid_code' | 'failed';

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
  private readonly transientStateMs = 2500;
  private attendanceService = inject(AttendanceService);
  private toast = inject(ToastService);
  private ngZone = inject(NgZone);

  private qrScanner: Html5Qrcode | null = null;
  private inFlightTokens = new Set<string>();
  private tokenCooldowns = new Map<string, number>();
  private clearStateTimeoutId: number | null = null;
  private audioContext: AudioContext | null = null;
  private lastInvalidScanAt = 0;

  isScannerReady = false;
  inFlightCount = 0;
  errorMessage = '';
  warningMessage = '';
  lastResult: AttendanceCheckInByTokenResponse | null = null;
  resultState: ScanResultState | null = null;

  get isSubmitting(): boolean {
    return this.inFlightCount > 0;
  }

  async ngAfterViewInit(): Promise<void> {
    await this.startScanner();
  }

  async ngOnDestroy(): Promise<void> {
    if (this.clearStateTimeoutId !== null) {
      window.clearTimeout(this.clearStateTimeoutId);
    }

    if (this.qrScanner?.isScanning) {
      await this.qrScanner.stop();
    }
    await this.qrScanner?.clear();

    this.audioContext?.close().catch(() => {});
  }

  async restartScanner(): Promise<void> {
    this.clearTransientState();

    if (this.qrScanner?.isScanning) {
      await this.qrScanner.stop();
      await this.qrScanner.clear();
    }

    await this.startScanner();
  }

  private async startScanner(): Promise<void> {
    this.isScannerReady = false;
    this.errorMessage = '';
    this.warningMessage = '';

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
    const token = this.extractToken(decodedText);
    if (!token) {
      this.handleWarningState('QR code did not contain a valid check-in token.');
      return;
    }

    if (this.shouldIgnoreToken(token)) {
      return;
    }

    this.clearTransientState();
    this.inFlightTokens.add(token);
    this.inFlightCount += 1;

    this.attendanceService.checkInByToken({ token, source: 'qr' }).subscribe({
      next: (result) => {
        this.ngZone.run(() => {
          this.lastResult = result;
          this.resultState = 'success';
          this.handleFeedback('success');
          this.toast.success(`${this.labelForKind(result.kind)} checked in.`);
          this.scheduleStateClear();
          this.finishTokenRequest(token);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.ngZone.run(() => {
          this.errorMessage = error.error?.detail || 'Unable to check in by token.';
          this.lastResult = null;
          this.warningMessage = '';
          this.resultState = error.status === 409 ? 'already_checked_in' : 'failed';
          this.handleFeedback('error');
          this.toast.error(this.errorMessage);
          this.scheduleStateClear();
          this.finishTokenRequest(token);
        });
      },
    });
  }

  private shouldIgnoreToken(token: string): boolean {
    if (this.inFlightTokens.has(token)) {
      return true;
    }

    const now = Date.now();
    const cooldownUntil = this.tokenCooldowns.get(token) ?? 0;
    if (cooldownUntil > now) {
      return true;
    }

    if (cooldownUntil) {
      this.tokenCooldowns.delete(token);
    }

    return false;
  }

  private finishTokenRequest(token: string): void {
    this.inFlightTokens.delete(token);
    this.inFlightCount = Math.max(0, this.inFlightCount - 1);

    const cooldownUntil = Date.now() + this.duplicateGuardMs;
    this.tokenCooldowns.set(token, cooldownUntil);

    window.setTimeout(() => {
      const currentCooldown = this.tokenCooldowns.get(token);
      if (currentCooldown === cooldownUntil) {
        this.tokenCooldowns.delete(token);
      }
    }, this.duplicateGuardMs);
  }

  private handleWarningState(message: string): void {
    const now = Date.now();
    if (now - this.lastInvalidScanAt < 1500) {
      return;
    }

    this.lastInvalidScanAt = now;
    this.clearTransientState();
    this.warningMessage = message;
    this.resultState = 'invalid_code';
    this.handleFeedback('warning');
    this.scheduleStateClear();
  }

  private clearTransientState(): void {
    if (this.clearStateTimeoutId !== null) {
      window.clearTimeout(this.clearStateTimeoutId);
      this.clearStateTimeoutId = null;
    }

    this.errorMessage = '';
    this.warningMessage = '';
    this.lastResult = null;
    this.resultState = null;
  }

  private scheduleStateClear(): void {
    if (this.clearStateTimeoutId !== null) {
      window.clearTimeout(this.clearStateTimeoutId);
    }

    this.clearStateTimeoutId = window.setTimeout(() => {
      this.clearTransientState();
    }, this.transientStateMs);
  }

  private handleFeedback(type: 'success' | 'warning' | 'error'): void {
    this.vibrate(type);
    this.beep(type);
  }

  private vibrate(type: 'success' | 'warning' | 'error'): void {
    if (!('vibrate' in navigator)) {
      return;
    }

    if (type === 'success') {
      navigator.vibrate?.([90]);
      return;
    }

    if (type === 'warning') {
      navigator.vibrate?.([40, 40, 40]);
      return;
    }

    navigator.vibrate?.([120, 60, 120]);
  }

  private beep(type: 'success' | 'warning' | 'error'): void {
    const AudioContextCtor =
      window.AudioContext ||
      // @ts-expect-error WebKit fallback for older mobile browsers.
      window.webkitAudioContext;

    if (!AudioContextCtor) {
      return;
    }

    try {
      this.audioContext ??= new AudioContextCtor();
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value =
        type === 'success' ? 880 : type === 'warning' ? 640 : 320;

      gainNode.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.03, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.12);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.12);
    } catch {
      // Audio feedback is optional; ignore browser support or autoplay failures.
    }
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

  get resultTitle(): string {
    switch (this.resultState) {
      case 'success':
        return 'CHECKED IN';
      case 'already_checked_in':
        return 'ALREADY CHECKED IN';
      case 'invalid_code':
        return 'INVALID CODE';
      case 'failed':
        return 'CHECK-IN FAILED';
      default:
        return '';
    }
  }

  get resultCardClass(): string {
    switch (this.resultState) {
      case 'success':
        return 'success';
      case 'already_checked_in':
        return 'already';
      case 'invalid_code':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return '';
    }
  }
}
