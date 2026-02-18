import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NAME_PATTERN } from '@core/constants/auth.constants';
import { AssetService } from '@core/services/asset.service';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import {
  calculatePasswordStrength,
  PasswordStrength,
  strongPasswordValidator,
} from '@core/utils/password.utils';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isSubmitting = false;
  googleKey: string | null = null;
  private googleInitialized = false;
  private pendingGoogleMode: 'login' | 'signup' = 'login';

  heroImage =
    'https://images.pexels.com/photos/8032978/pexels-photo-8032978.jpeg?auto=compress&cs=tinysrgb&w=1200';

  loginForm: FormGroup;
  signupForm: FormGroup;

  showLoginPassword = false;
  showSignupPassword = false;
  showSignupConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private assetService: AssetService,
    private ngZone: NgZone
  ) {
    // LOGIN FORM
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [false],
      },
      { updateOn: 'blur' }
    );

    // SIGNUP FORM
    this.signupForm = this.fb.group(
      {
        name: [
          '',
          [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)],
        ],
        surname: [
          '',
          [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone_number: ['', [Validators.required, this.phoneValidator.bind(this)]],
        password: ['', [Validators.required, Validators.minLength(8), strongPasswordValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }

  // ---------- GETTERS ----------

  get passwordControl(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  get passwordStrengthLevel(): PasswordStrength {
    const value = this.passwordControl?.value as string;
    return calculatePasswordStrength(value);
  }

  get canLogin(): boolean {
    return this.loginForm.valid && !this.isSubmitting;
  }

  get canCreateAccount(): boolean {
    const formValid = this.signupForm.valid;
    const passwordsMatch = this.passwordsMatch();
    const isStrong = this.passwordStrengthLevel === 'strong';

    return formValid && passwordsMatch && isStrong && !this.isSubmitting;
  }

  get passwordStrengthLabel(): string {
    switch (this.passwordStrengthLevel) {
      case 'weak':
        return 'Needs more gains 💪';
      case 'medium':
        return 'Ok we getting there 🔥';
      case 'strong':
        return 'Beast mode unlocked 🏋️';
      default:
        return '';
    }
  }

  // ---------- LIFECYCLE ----------

  ngOnInit(): void {
    // Set initial mode based on route URL (/login or /signup)
    this.syncModeWithUrl(this.router.url);

    this.assetService
      .getCover('login_cover')
      .subscribe((img) => (this.heroImage = img || this.heroImage));

    // Fetch Google key for authentication
    this.assetService.getGoogleKey().subscribe((key) => {
      this.googleKey = key;
    });

    // Listen to route changes to keep UI synced with URL
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.syncModeWithUrl(e.urlAfterRedirects));
  }

  // ---------- MODE SWITCH ----------

  switchMode(mode: 'login' | 'signup'): void {
    if (mode === 'login') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/signup']);
    }
  }

  // ---------- LOGIN ----------

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService
      .login(
        {
          email: email as string,
          password: password as string,
        },
        !!rememberMe // remember-me controls where refresh token is stored
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.redirectAfterAuth();
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
          this.toast.error('Login failed. Please check your credentials.');
        },
      });
  }

  // ---------- SIGNUP ----------

  onSignupSubmit(): void {
    if (this.signupForm.invalid || !this.passwordsMatch()) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { name, surname, email, phone_number, password } = this.signupForm.value;

    // 1) Create the account
    this.authService
      .register({
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone_number: phone_number as string,
        password: password as string,
      })
      .subscribe({
        next: () => {
          // 2) On successful signup, automatically log the user in
          this.authService
            .login(
              {
                email: email as string,
                password: password as string,
              },
              true // auto-login with "remember me" enabled
            )
            .subscribe({
              next: () => {
                this.isSubmitting = false;
                this.redirectAfterAuth();
              },
              error: (err) => {
                console.error(err);
                this.isSubmitting = false;
                this.toast.error(
                  'Account created, but automatic sign in failed. Please sign in manually.'
                );
                this.router.navigate(['/login']);
              },
            });
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
          this.toast.error('Signup failed. Please try again.');
        },
      });
  }

  // ---------- VALIDATORS & HELPERS ----------

  private syncModeWithUrl(url: string): void {
    if (url.includes('/signup')) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '').trim();
    if (!value) return null;

    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    return phoneRegex.test(value) ? null : { invalidPhone: true };
  }

  passwordsMatch(): boolean {
    const pass = this.signupForm.get('password')?.value;
    const confirm = this.signupForm.get('confirmPassword')?.value;

    if (!pass || !confirm) {
      return true;
    }

    return pass === confirm;
  }

  hasError(form: 'login' | 'signup', controlName: string, error: string): boolean {
    const group = (form === 'login' ? this.loginForm : this.signupForm) as FormGroup;

    const control = group.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }

  onGoogleSignIn(): void {
    this.triggerGoogleSignIn('login');
  }

  onGoogleSignUp(): void {
    this.triggerGoogleSignIn('signup');
  }

  private triggerGoogleSignIn(mode: 'login' | 'signup'): void {
    this.isSubmitting = true;
    this.pendingGoogleMode = mode;
    const google = (window as any).google;

    if (!google || !google.accounts || !google.accounts.id) {
      this.isSubmitting = false;
      this.toast.error('Google SDK not loaded. Please refresh and try again.');
      return;
    }

    if (!this.googleKey) {
      this.isSubmitting = false;
      this.toast.error('Google configuration not available. Please refresh and try again.');
      return;
    }

    this.ensureGoogleInitialized();

    // Trigger One Tap prompt for custom button usage
    google.accounts.id.prompt((notification: any) => {
      if (
        notification.isNotDisplayed?.() ||
        notification.isSkippedMoment?.() ||
        notification.isDismissedMoment?.()
      ) {
        this.isSubmitting = false;
      }
    });
  }

  private handleGoogleAuth(idToken: string, mode: 'login' | 'signup'): void {
    this.ngZone.run(() => {
      this.authService.loginWithGoogle(idToken, true).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.toast.success(
            mode === 'login' ? 'Logged in with Google!' : 'Account created with Google!'
          );
          this.redirectAfterAuth();
        },
        error: (err) => {
          console.error('Google auth error:', err);
          this.isSubmitting = false;
          this.toast.error('Google authentication failed. Please try again.');
        },
      });
    });
  }

  private ensureGoogleInitialized(): void {
    if (this.googleInitialized) {
      return;
    }

    const google = (window as any).google;
    if (!google || !google.accounts || !google.accounts.id || !this.googleKey) {
      return;
    }

    google.accounts.id.initialize({
      client_id: this.googleKey,
      callback: (response: any) => {
        if (response?.credential) {
          this.handleGoogleAuth(response.credential, this.pendingGoogleMode);
        } else {
          this.isSubmitting = false;
          this.toast.error('Google authentication failed');
        }
      },
    });

    const buttonTarget = document.getElementById('google-signin-button');
    if (buttonTarget) {
      google.accounts.id.renderButton(buttonTarget, { theme: 'outline', size: 'large' });
    }

    this.googleInitialized = true;
  }

  get heroBackground(): string {
    return `linear-gradient(135deg, rgba(248, 113, 113, 0.5), rgba(79, 70, 229, 0.7)), url('${this.heroImage}')`;
  }

  private redirectAfterAuth(): void {
    const rawReturnUrl = this.route.snapshot.queryParams['returnUrl'];
    const safeReturnUrl = this.getSafeReturnUrl(rawReturnUrl);
    this.router.navigateByUrl(safeReturnUrl);
  }

  private getSafeReturnUrl(rawReturnUrl: unknown): string {
    if (typeof rawReturnUrl !== 'string' || !rawReturnUrl.trim()) {
      return '/profile';
    }

    // Only allow internal app routes to prevent open redirects.
    if (!rawReturnUrl.startsWith('/')) {
      return '/profile';
    }

    if (rawReturnUrl.startsWith('//')) {
      return '/profile';
    }

    return rawReturnUrl;
  }
}
