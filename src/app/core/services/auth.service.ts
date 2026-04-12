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

  private accessToken: string | null = null;

  private rememberMe = false;
  private readonly ACCESS_KEY = 'access';
  private readonly REFRESH_KEY = 'refresh';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject.next(null);
  }

  login(payload: LoginPayload, rememberMe: boolean): Observable<AuthResponse> {
    const url = `${environment.apiUrl}/auth/token/`;
    this.rememberMe = rememberMe;

    return this.http.post<AuthResponse>(url, payload).pipe(tap((res) => this.handleAuth(res)));
  }

  register(payload: SignupPayload): Observable<AuthResponse | any> {
    const url = `${environment.apiUrl}/auth/register/`;

    const backendPayload = {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      phone_number: payload.phone_number,
      password: payload.password,
    };

    return this.http.post<AuthResponse>(url, backendPayload).pipe(
      tap((res) => {
        this.handleAuth(res);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token stored');
    }

    const url = `${environment.apiUrl}/auth/token/refresh/`;
    return this.http.post<AuthResponse>(url, { refresh }).pipe(tap((res) => this.handleAuth(res)));
  }

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

  loginWithGoogle(idToken: string, rememberMe = true): Observable<AuthResponse> {
    const url = `${environment.apiUrl}/auth/google/`;
    this.rememberMe = rememberMe;
    return this.http.post<AuthResponse>(url, { id_token: idToken }).pipe(
      tap((res) => this.handleAuth(res))
    );
  }

  requestPasswordReset(payload: ForgotPasswordPayload) {
    const url = `${environment.apiUrl}/auth/password/reset/`;
    return this.http.post<{ detail: string }>(url, payload);
  }

  confirmPasswordReset(payload: ResetPasswordPayload) {
    const url = `${environment.apiUrl}/auth/password/reset/confirm/`;
    return this.http.post<{ detail: string }>(url, payload);
  }

  private handleAuth(res: AuthResponse): void {
    if (res.access) {
      this.setAccessToken(res.access);
    }
    if (res.refresh) {
      this.setRefreshToken(res.refresh);
    }
    if (res.user) {
      this.currentUserSubject.next(res.user);
    }
  }

  private storeCurrentUser(profile: UserProfile): User {
    const user: User = {
      id: this.currentUserSubject.value?.id ?? 0,
      ...profile,
    };
    this.currentUserSubject.next(user);
    return user;
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  ensureCurrentUser(): Observable<User | null> {
    const current = this.currentUserSubject.value;
    if (current) {
      return of(current);
    }

    if (!this.isLoggedIn()) {
      return of(null);
    }

    return this.getProfile().pipe(
      map((profile) => this.storeCurrentUser(profile)),
      catchError((err) => {
        console.error('[Auth] Failed to load current user:', err);
        this.clearTokens();
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setRefreshToken(token: string | null): void {
    if (token === null) {
      localStorage.removeItem(this.REFRESH_KEY);
      sessionStorage.removeItem(this.REFRESH_KEY);
      return;
    }

    if (this.rememberMe) {
      localStorage.setItem(this.REFRESH_KEY, token);
      sessionStorage.removeItem(this.REFRESH_KEY);
    } else {
      sessionStorage.setItem(this.REFRESH_KEY, token);
      localStorage.removeItem(this.REFRESH_KEY);
    }
  }

  getRefreshToken(): string | null {
    const sessionToken = sessionStorage.getItem(this.REFRESH_KEY);
    if (sessionToken) {
      this.rememberMe = false;
      return sessionToken;
    }

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
    localStorage.removeItem(this.ACCESS_KEY);
  }

  initAuthOnStartup() {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      console.log('[Auth] No refresh token found, user is logged out');
      return of(void 0);
    }

    console.log('[Auth] Refresh token found, attempting to restore session...');
    return this.refreshToken().pipe(
      mergeMap(() => {
        console.log('[Auth] Access token refreshed, fetching profile...');
        return this.getProfile();
      }),
      tap((profile: UserProfile) => {
        if (profile) {
          console.log('[Auth] Profile fetched, updating currentUserSubject:', profile);
          this.storeCurrentUser(profile);
        }
      }),
      map(() => void 0),
      catchError((err) => {
        console.error('[Auth] Session restore failed:', err);
        this.clearTokens();
        this.currentUserSubject.next(null);
        return of(void 0);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!(this.getAccessToken() || this.getRefreshToken());
  }

  isStaff(): boolean {
    return !!this.currentUserSubject.value?.is_staff;
  }
}
