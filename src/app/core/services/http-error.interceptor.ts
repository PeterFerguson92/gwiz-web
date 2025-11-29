import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private isLoggingOut = false;

  constructor(
    private toast: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const url = req.url || '';

        // Don't spam toasts for auth endpoints themselves
        const isAuthEndpoint =
          url.includes('/login') ||
          url.includes('/token') ||
          url.includes('/register');

        // Handle 401: expired / invalid JWT
        if (error.status === 401 && !isAuthEndpoint) {
          // Try to detect "token not valid" from Django Simple JWT
          const code = (error.error?.code || '').toString();
          const detail = (error.error?.detail || '').toString();

          const isTokenNotValid =
            code === 'token_not_valid' ||
            detail.toLowerCase().includes('token is invalid') ||
            detail.toLowerCase().includes('token is expired') ||
            detail.toLowerCase().includes('not valid for any token type');

          // Only run logout logic once to avoid loops
          if (!this.isLoggingOut) {
            this.isLoggingOut = true;

            const currentUrl = this.router.url;
            this.authService.logout(true, currentUrl);

            const message = isTokenNotValid
              ? 'Session expired — please log in again.'
              : 'You are not authorised. Please log in again.';

            this.toast.error(message);

            // Allow future logouts again after a short delay
            setTimeout(() => {
              this.isLoggingOut = false;
            }, 500);
          }

          return throwError(() => error);
        }

        // Generic error handling (for non-401s or auth endpoints)
        if (!isAuthEndpoint) {
          let message = 'Something went wrong. Please try again.';

          if (error.status === 0) {
            message = 'Network error. Check your connection.';
          } else if (error.status >= 500) {
            message = 'Server error. Please try again later.';
          } else if (error.error?.detail) {
            message = error.error.detail;
          } else if (typeof error.error === 'string') {
            message = error.error;
          }

          this.toast.error(message);
        }

        return throwError(() => error);
      })
    );
  }
}
