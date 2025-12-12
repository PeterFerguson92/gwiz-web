import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    google?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private scriptPromise: Promise<void> | null = null;
  private clientInitialized = false;
  private pendingResolve: ((token: string) => void) | null = null;
  private pendingReject: ((reason?: any) => void) | null = null;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private loadScript(): Promise<void> {
    if (this.scriptPromise) {
      return this.scriptPromise;
    }

    this.scriptPromise = new Promise((resolve, reject) => {
      if (this.document.getElementById('google-identity-services')) {
        resolve();
        return;
      }

      const script = this.document.createElement('script');
      script.id = 'google-identity-services';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Identity Services.'));

      this.document.head.appendChild(script);
    });

    return this.scriptPromise;
  }

  private async initClient(): Promise<void> {
    if (this.clientInitialized) {
      return;
    }

    if (!environment.googleClientId) {
      throw new Error('Google Client ID is not configured. Please set environment.googleClientId.');
    }

    await this.loadScript();

    const client = window.google?.accounts?.id;
    if (!client) {
      throw new Error('Google Identity Services not available.');
    }

    client.initialize({
      client_id: environment.googleClientId,
      ux_mode: 'popup',
      auto_select: false,
      callback: (response: any) => {
        if (response?.credential && this.pendingResolve) {
          this.pendingResolve(response.credential);
        } else if (this.pendingReject) {
          this.pendingReject(new Error('Google sign-in did not return a credential.'));
        }

        this.pendingResolve = null;
        this.pendingReject = null;
      },
    });

    this.clientInitialized = true;
  }

  requestIdToken(): Observable<string> {
    return from(this.createPromptPromise());
  }

  private async createPromptPromise(): Promise<string> {
    await this.initClient();

    return new Promise<string>((resolve, reject) => {
      const client = window.google?.accounts?.id;
      if (!client) {
        reject(new Error('Google Identity Services not available.'));
        return;
      }

      this.pendingResolve = resolve;
      this.pendingReject = reject;

      client.prompt((notification: any) => {
        const wasDismissed =
          notification.isNotDisplayed?.() ||
          notification.isSkippedMoment?.() ||
          notification.isDismissedMoment?.();

        if (wasDismissed) {
          const reason =
            notification.getNotDisplayedReason?.() ||
            notification.getSkippedReason?.() ||
            notification.getDismissedReason?.();

          this.pendingResolve = null;
          this.pendingReject = null;

          reject(new Error(reason || 'Google sign-in was cancelled.'));
        }
      });
    });
  }
}
