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
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { ToastService } from '@core/services/toast.service';

import { UserProfile } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth.service';

const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  loadingProfile = true;
  savingProfile = false;
  changingPassword = false;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadProfile();
  }

  private initForms(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)]],
      surname: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern(NAME_PATTERN)],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, this.phoneValidator]],
    });

    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordStrengthValidator],
      ],
      confirm_password: ['', [Validators.required]],
    });
  }

  private loadProfile(): void {
    this.loadingProfile = true;

    this.authService.getProfile().subscribe({
      next: (profile: UserProfile) => {
        this.loadingProfile = false;
        this.profileForm.patchValue(profile);
        this.profileForm.markAsPristine();
        Object.values(this.profileForm.controls).forEach((c) => c.markAsPristine());
      },
      error: (err) => {
        this.loadingProfile = false;

        // If unauthorized → redirect (OPTIONAL)
        if (err.status === 401) {
          // global interceptor already shows toast
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: '/profile' },
          });
        }
      },
    });
  }

  // ---- Validators ----
  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '').trim();
    if (!value) return null;

    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    return phoneRegex.test(value) ? null : { invalidPhone: true };
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    const hasMinLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[^A-Za-z0-9]/.test(value);

    const isStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSymbol;
    return isStrong ? null : { passwordStrength: true };
  }

  get newPasswordControl(): AbstractControl | null {
    return this.passwordForm.get('new_password');
  }

  passwordsMatch(): boolean {
    const newPass = this.passwordForm.get('new_password')?.value;
    const confirm = this.passwordForm.get('confirm_password')?.value;
    if (!newPass || !confirm) return true;
    return newPass === confirm;
  }

  get passwordStrengthLevel(): 'weak' | 'medium' | 'strong' | 'empty' {
    const value = this.newPasswordControl?.value as string;
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

  get canChangePassword(): boolean {
    const formValid = this.passwordForm.valid;
    const passwordsMatch = this.passwordsMatch();
    const isStrong = this.passwordStrengthLevel === 'strong';

    return formValid && passwordsMatch && isStrong && !this.changingPassword;
  }

  get passwordStrengthLabel(): string {
    switch (this.passwordStrengthLevel) {
      case 'weak':
        return 'Weak – needs more gains 💪';
      case 'medium':
        return 'Medium – almost there 🔥';
      case 'strong':
        return 'Strong – beast mode unlocked 🏋️';
      default:
        return '';
    }
  }

  // ---- Helpers ----
  hasError(form: 'profile' | 'password', controlName: string, error: string): boolean {
    const group = (form === 'profile' ? this.profileForm : this.passwordForm) as FormGroup;
    const control = group.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }

  get hasChanges(): boolean {
    return this.profileForm.dirty;
  }

  // ---- Submit handlers ----
  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    // Build payload only from dirty controls
    const changes: any = {};
    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      if (control && control.dirty) {
        changes[key] = control.value;
      }
    });

    this.savingProfile = true;

    this.authService.updateProfile(changes).subscribe({
      next: () => {
        this.savingProfile = false;
        this.toast.success('Profile updated successfully!');

        // mark form as pristine again
        this.profileForm.markAsPristine();
        Object.values(this.profileForm.controls).forEach((c) => c.markAsPristine());
      },
      error: () => {
        this.savingProfile = false;
      },
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid || !this.passwordsMatch()) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.changingPassword = true;

    const { old_password, new_password, confirm_password } = this.passwordForm.value;

    this.authService
      .changePassword({
        old_password: old_password as string,
        new_password: new_password as string,
        confirm_password: confirm_password as string,
      })
      .subscribe({
        next: () => {
          this.changingPassword = false;
          this.passwordForm.reset();
          this.toast.success('Password changed successfully.');
        },
        error: (err) => {
          this.changingPassword = false;
          const msg =
            err?.error?.detail ||
            err?.error?.message ||
            'Failed to change password. Please try again.';
          this.toast.error(msg);
        },
      });
  }
}
