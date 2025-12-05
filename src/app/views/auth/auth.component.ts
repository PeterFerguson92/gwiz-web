import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NAME_PATTERN } from '@core/constants/auth.constants';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isSubmitting = false;

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
    private route: ActivatedRoute
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
        password: [
          '',
          [Validators.required, Validators.minLength(8), this.passwordStrengthValidator.bind(this)],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }

  // ---------- GETTERS ----------

  get passwordControl(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  get passwordStrengthLevel(): 'weak' | 'medium' | 'strong' | 'empty' {
    const value = this.passwordControl?.value as string;
    if (!value) return 'empty';

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) return 'weak';
    if (score === 3 || score === 4) return 'medium';
    return 'strong';
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
          this.router.navigate(['/profile']);
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
                this.router.navigate(['/profile']);
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

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) {
      return null; // handled by 'required'
    }

    const hasMinLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[^A-Za-z0-9]/.test(value);

    const isStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSymbol;

    return isStrong ? null : { passwordStrength: true };
  }

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
}
