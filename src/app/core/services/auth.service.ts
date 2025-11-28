// src/app/auth/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  User,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly ACCESS_KEY = 'access';
  private readonly REFRESH_KEY = 'refresh';

  constructor(private http: HttpClient) {
    // Try to restore user on reload if you have a /me endpoint later
    const access = this.getAccessToken();
    if (!access) {
      this.currentUserSubject.next(null);
    }
  }

  // ---------- AUTH CALLS ----------

  /** Login with email + password */
  login(payload: LoginPayload): Observable<AuthResponse> {
    const url = `${environment.apiUrl}/auth/token/`;

    return this.http.post<AuthResponse>(url, payload).pipe(
      tap((res) => this.handleAuth(res))
    );
  }

  /** Register a new user with Django's expected payload */
  register(payload: SignupPayload): Observable<AuthResponse | any> {
    const url = `${environment.apiUrl}/auth/register/`;

    // Backend expects these exact keys:
    const backendPayload = {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      phone_number: payload.phone_number,
      password: payload.password,
    };

    // If your backend auto-logs in and returns tokens, keep tap(handleAuth).
    // If it just returns a message, remove the tap.
    return this.http.post<AuthResponse>(url, backendPayload).pipe(
      tap((res) => {
        // If signup does NOT auto-login / return tokens, comment this out
        this.handleAuth(res);
      })
    );
  }

  /** Optional: refresh token if your backend exposes /token/refresh/ */
  refreshToken(): Observable<AuthResponse> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token stored');
    }

    const url = `${environment.apiUrl}/auth/token/refresh/`;
    return this.http.post<AuthResponse>(url, { refresh }).pipe(
      tap((res) => this.handleAuth(res))
    );
  }

  /** Clear tokens and user from memory */
  logout(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this.currentUserSubject.next(null);
  }

  // ---------- HELPERS ----------

  private handleAuth(res: AuthResponse): void {
    if (res.access) {
      localStorage.setItem(this.ACCESS_KEY, res.access);
    }
    if (res.refresh) {
      localStorage.setItem(this.REFRESH_KEY, res.refresh);
    }
    if (res.user) {
      this.currentUserSubject.next(res.user);
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  /** Synchronous snapshot of the current user */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** Quick boolean for guards / templates */
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
