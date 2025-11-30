import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthResponse, ChangePasswordPayload, LoginPayload, SignupPayload, UpdateProfilePayload, User, UserProfile } from "../models/auth.models";
import { Router } from "@angular/router";
import { catchError, map, of } from "rxjs"; // make sure these are imported

@Injectable({ providedIn: "root" })
export class AuthService {
	private currentUserSubject = new BehaviorSubject<User | null>(null);
	currentUser$ = this.currentUserSubject.asObservable();

	// 🔑 access token lives *only in memory*
	private accessToken: string | null = null;

	private readonly ACCESS_KEY = "access"; // legacy key (we no longer set it, only clear it)
	private readonly REFRESH_KEY = "refresh";

	constructor(private http: HttpClient, private router: Router) {
		// On startup we don't yet have an access token in memory.
		// If you later add an "initAuthOnStartup" that uses refresh, call it from AppComponent.
		this.currentUserSubject.next(null);
	}

	// ---------- AUTH CALLS ----------

	/** Login with email + password */
	login(payload: LoginPayload): Observable<AuthResponse> {
		const url = `${environment.apiUrl}/auth/token/`;

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
			throw new Error("No refresh token stored");
		}

		const url = `${environment.apiUrl}/auth/token/refresh/`;
		return this.http.post<AuthResponse>(url, { refresh }).pipe(tap((res) => this.handleAuth(res)));
	}

	/** Clear tokens and user from memory + storage */
	logout(redirectToLogin = true, returnUrl?: string) {
		this.clearTokens();
		this.currentUserSubject.next(null);

		if (redirectToLogin) {
			this.router.navigate(["/login"], {
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
		if (token) {
			localStorage.setItem(this.REFRESH_KEY, token);
		} else {
			localStorage.removeItem(this.REFRESH_KEY);
		}
	}

	getRefreshToken(): string | null {
		return localStorage.getItem(this.REFRESH_KEY);
	}

	clearTokens(): void {
		this.accessToken = null;
		localStorage.removeItem(this.REFRESH_KEY);
		localStorage.removeItem(this.ACCESS_KEY); // clean up any old stored access tokens
	}

	initAuthOnStartup() {
		const refresh = this.getRefreshToken();
		if (!refresh) {
			// nothing to do, user is logged out
			return of(void 0);
		}

		// Try to get a new access token silently
		return this.refreshToken().pipe(
			map(() => void 0),
			catchError(() => {
				// if refresh fails, clear everything but don't blow up the app
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
