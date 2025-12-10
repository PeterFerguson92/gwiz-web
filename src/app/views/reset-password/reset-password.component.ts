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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import {
  calculatePasswordStrength,
  PasswordStrength,
  strongPasswordValidator,
} from '@core/utils/password.utils';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  private uid: string | null = null;
  private token: string | null = null;

  fieldErrors: Record<string, string[]> = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        new_password: ['', [Validators.required, Validators.minLength(8), strongPasswordValidator]],
        confirm_password: ['', [Validators.required]],
      },
      { validators: [this.passwordsMatchValidator] }
    );
  }

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap;
    this.uid = query.get('uid');
    this.token = query.get('token');

    if (!this.uid || !this.token) {
      this.toast.error('This reset link is invalid. Please request a new one.');
      this.router.navigate(['/forgot-password']);
    }
  }

  get newPassword(): AbstractControl | null {
    return this.form.get('new_password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.form.get('confirm_password');
  }

  hasError(controlName: 'new_password' | 'confirm_password', error: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }

  getFieldErrors(field: string): string[] {
    return this.fieldErrors[field] || [];
  }

  get passwordStrengthLevel(): PasswordStrength {
    const value = (this.newPassword?.value as string) || '';
    return calculatePasswordStrength(value);
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

  private passwordsMatchValidator(group: FormGroup): ValidationErrors | null {
    const pass = group.get('new_password')?.value;
    const confirm = group.get('confirm_password')?.value;

    if (!pass || !confirm) return null;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  get passwordsMismatch(): boolean {
    return this.form.hasError('passwordsMismatch') && this.confirmPassword?.touched === true;
  }

  onSubmit(): void {
    if (!this.uid || !this.token) return;

    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.fieldErrors = {};

    const payload = {
      uid: this.uid,
      token: this.token,
      new_password: this.newPassword?.value,
      confirm_password: this.confirmPassword?.value,
    };

    this.auth.confirmPasswordReset(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        this.toast.success(res?.detail || 'Password has been reset successfully.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.submitting = false;
        const data = err?.error || {};

        if (typeof data === 'object' && data !== null) {
          this.fieldErrors = data;

          if (data.confirm_password && Array.isArray(data.confirm_password)) {
            this.confirmPassword?.setErrors({ server: true });
          }
          if (data.new_password && Array.isArray(data.new_password)) {
            this.newPassword?.setErrors({ server: true });
          }

          if (data.uid || data.token) {
            const firstMsg =
              (Array.isArray(data.uid) && data.uid[0]) ||
              (Array.isArray(data.token) && data.token[0]) ||
              'This reset link is invalid or expired.';
            this.toast.error(firstMsg);
          }
        } else {
          this.toast.error('Unable to reset your password. Please try again.');
        }
      },
    });
  }
}
