import { AbstractControl, ValidationErrors } from '@angular/forms';

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'empty';

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '') as string;
  if (!value) {
    return null; // handled by required validator
  }

  const hasMinLength = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSymbol = /[^A-Za-z0-9]/.test(value);

  const isStrong = hasMinLength && hasUpper && hasLower && hasNumber && hasSymbol;

  return isStrong ? null : { passwordStrength: true };
}

export function calculatePasswordStrength(value: string | null | undefined): PasswordStrength {
  const pwd = value || '';
  if (!pwd) {
    return 'empty';
  }

  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 2) {
    return 'weak';
  }
  if (score === 3 || score === 4) {
    return 'medium';
  }
  return 'strong';
}
