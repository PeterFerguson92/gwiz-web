import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  SignupPayload,
  UpdateProfilePayload,
  User,
  UserProfile,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // 🔑 access token lives *only in memory*
  private accessToken: string | null = null;

  private rememberMe = false;
  private readonly ACCESS_KEY = 'access'; // legacy key (we no longer set it, only clear it)
  private readonly REFRESH_KEY = 'refresh';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // On startup we don't yet have an access token in memory.
    // If you later add an "initAuthOnStartup" that uses refresh, call it from AppComponent.
    this.currentUserSubject.next(null);
  }

  // ---------- AUTH CALLS ----------

  /** Login with email + password */
  login(payload: LoginPayload, rememberMe: boolean): Observable<AuthResponse> {
    const url = `${environment.apiUrl}/auth/token/`;

    // remember the user's choice for this session
    this.rememberMe = rememberMe;

    return this.http.post<AuthResponse>(url, payload).pipe(tap((res) => this.handleAuth(res)));
  }

  /** Register a new user with Django's expected payload */
  register(payload: SignupPayload): Observable<AuthResponse | any> {
    const url = `${environment.apiUrl}/auth/register/`;

    const backendPayload = {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      phone_number: payload.phone_number,
      password: payload.password,
    };

    // If your backend returns { access, refresh, user } here, this will also log in.
    return this.http.post<AuthResponse>(url, backendPayload).pipe(
      tap((res) => {
        this.handleAuth(res);
      })
    );
  }

  /** Refresh token if your backend exposes /auth/token/refresh/ */
  refreshToken(): Observable<AuthResponse> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token stored');
    }

    const url = `${environment.apiUrl}/auth/token/refresh/`;
    return this.http.post<AuthResponse>(url, { refresh }).pipe(tap((res) => this.handleAuth(res)));
  }

  /** Clear tokens and user from memory + storage */
  logout(redirectToLogin = true, returnUrl?: string) {
    this.clearTokens();
    this.currentUserSubject.next(null);

    if (redirectToLogin) {
      this.router.navigate(['/login'], {
        queryParams: returnUrl ? { returnUrl } : undefined,
      });
    }
  }

  getProfile() {
    return this.http.get<UserProfile>(`${environment.apiUrl}/auth/me/`);
  }

  updateProfile(payload: Partial<UpdateProfilePayload>) {
    const url = `${environment.apiUrl}/auth/me/`;

    return this.http.patch<UserProfile>(url, payload).pipe(
      tap((updated) => {
        const current = this.currentUserSubject.value;
        if (current) {
          this.currentUserSubject.next({
            ...current,
            ...updated,
          });
        }
      })
    );
  }

  changePassword(payload: ChangePasswordPayload) {
    return this.http.post(`${environment.apiUrl}/auth/password/change/`, payload);
  }

  /** Start "forgot password" flow – backend always returns generic success */
  requestPasswordReset(payload: ForgotPasswordPayload) {
    const url = `${environment.apiUrl}/auth/password/reset/`;
    return this.http.post<{ detail: string }>(url, payload);
  }

  /** Complete password reset with uid + token from email link */
  confirmPasswordReset(payload: ResetPasswordPayload) {
    const url = `${environment.apiUrl}/auth/password/reset/confirm/`;
    return this.http.post<{ detail: string }>(url, payload);
  }

  // ---------- HELPERS ----------

  /** Central place to handle tokens + user coming back from backend */
  private handleAuth(res: AuthResponse): void {
    if (res.access) {
      // 🔑 store access token in memory only
      this.setAccessToken(res.access);
    }
    if (res.refresh) {
      // 🔑 persist refresh token so we can survive reloads
      this.setRefreshToken(res.refresh);
    }
    if (res.user) {
      this.currentUserSubject.next(res.user);
    }
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setRefreshToken(token: string | null): void {
    // If null → clear both storages and stop
    if (token === null) {
      localStorage.removeItem(this.REFRESH_KEY);
      sessionStorage.removeItem(this.REFRESH_KEY);
      return;
    }

    // From here on, token is guaranteed to be a string
    if (this.rememberMe) {
      localStorage.setItem(this.REFRESH_KEY, token);
      sessionStorage.removeItem(this.REFRESH_KEY);
    } else {
      sessionStorage.setItem(this.REFRESH_KEY, token);
      localStorage.removeItem(this.REFRESH_KEY);
    }
  }

  getRefreshToken(): string | null {
    // Prefer sessionStorage if present (session-only login)
    const sessionToken = sessionStorage.getItem(this.REFRESH_KEY);
    if (sessionToken) {
      this.rememberMe = false;
      return sessionToken;
    }

    // Fallback to localStorage (remember-me login)
    const localToken = localStorage.getItem(this.REFRESH_KEY);
    if (localToken) {
      this.rememberMe = true;
      return localToken;
    }

    return null;
  }

  clearTokens(): void {
    this.accessToken = null;
    this.rememberMe = false;
    localStorage.removeItem(this.REFRESH_KEY);
    sessionStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.ACCESS_KEY); // old access key cleanup
  }

  initAuthOnStartup() {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      // nothing to do, user is logged out
      console.log('[Auth] No refresh token found, user is logged out');
      return of(void 0);
    }

    console.log('[Auth] Refresh token found, attempting to restore session...');
    // Try to get a new access token silently
    return this.refreshToken().pipe(
      // After getting a new access token, fetch the user profile
      mergeMap(() => {
        console.log('[Auth] Access token refreshed, fetching profile...');
        return this.getProfile();
      }),
      tap((profile: UserProfile) => {
        // Update the current user subject with the fetched profile
        // Convert UserProfile to User for storage (add a dummy id if needed)
        if (profile) {
          console.log('[Auth] Profile fetched, updating currentUserSubject:', profile);
          const user: User = {
            id: 0, // Profile endpoint doesn't return ID, but we need it for the User type
            ...profile,
          };
          this.currentUserSubject.next(user);
        }
      }),
      map(() => void 0),
      catchError((err) => {
        // if refresh fails, clear everything but don't blow up the app
        console.error('[Auth] Session restore failed:', err);
        this.clearTokens();
        this.currentUserSubject.next(null);
        return of(void 0);
      })
    );
  }

  /** Synchronous snapshot of the current user */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** Quick boolean for guards / templates */
  isLoggedIn(): boolean {
    // logged in if we have an in-memory access token OR at least a refresh token
    return !!(this.getAccessToken() || this.getRefreshToken());
  }
}
