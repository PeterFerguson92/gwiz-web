import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 🔑 access token now lives ONLY in memory:
    const access = this.auth.getAccessToken();

    let authReq = req;
    if (access) {
      authReq = this.addAuthHeader(req, access);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Only handle 401 (expired/invalid access token)
        if (
          error.status === 401 &&
          !this.isAuthEndpoint(req.url) // avoid recursion
        ) {
          return this.handle401(authReq, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  private isAuthEndpoint(url: string): boolean {
    return (
      url.includes('/auth/token/') ||
      url.includes('/auth/register/') ||
      url.includes('/auth/token/refresh/')
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null); // reset

      // 🔁 call refresh endpoint using refresh token in localStorage
      return this.auth.refreshToken().pipe(
        switchMap((res) => {
          this.isRefreshing = false;

          // get the new access token from AuthService memory
          const newAccess = this.auth.getAccessToken();
          this.refreshTokenSubject.next(newAccess);

          // retry the failed request with new access token
          return next.handle(this.addAuthHeader(req, newAccess!));
        }),

        catchError((err) => {
          this.isRefreshing = false;

          // Refresh failed → user fully logged out
          this.auth.logout();

          return throwError(() => err);
        })
      );
    } else {
      // Refresh already happening: wait until it completes
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addAuthHeader(req, token!)))
      );
    }
  }
}
