import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss'],
})
export class StaffLoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  errorState: 'invalid_credentials' | 'no_staff' | null = null;
  heroImage =
    'https://images.pexels.com/photos/8032978/pexels-photo-8032978.jpeg?auto=compress&cs=tinysrgb&w=1200';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [false],
      },
      { updateOn: 'blur' }
    );
  }

  ngOnInit(): void {
    const reason = this.route.snapshot.queryParamMap.get('reason');
    if (reason === 'no_staff') {
      this.errorState = 'no_staff';
    }

    this.authService.ensureCurrentUser().subscribe((user) => {
      if (user?.is_staff) {
        this.router.navigateByUrl(this.getSafeReturnUrl());
      }
    });
  }

  get heroBackground(): string {
    return `linear-gradient(135deg, rgba(201, 15, 22, 0.38), rgba(15, 23, 42, 0.85)), url('${this.heroImage}')`;
  }

  get canSubmit(): boolean {
    return this.loginForm.valid && !this.isSubmitting;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorState = null;
    this.isSubmitting = true;

    const { email, password, rememberMe } = this.loginForm.getRawValue();

    this.authService
      .login(
        {
          email: email as string,
          password: password as string,
        },
        !!rememberMe
      )
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;

          if (response.user.is_staff) {
            this.router.navigateByUrl(this.getSafeReturnUrl());
            return;
          }

          this.authService.logout(false);
          this.errorState = 'no_staff';
        },
        error: () => {
          this.isSubmitting = false;
          this.errorState = 'invalid_credentials';
        },
      });
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }

  private getSafeReturnUrl(): string {
    const rawReturnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (!rawReturnUrl || !rawReturnUrl.startsWith('/')) {
      return '/staff';
    }

    if (rawReturnUrl.startsWith('//')) {
      return '/staff';
    }

    return rawReturnUrl;
  }
}
