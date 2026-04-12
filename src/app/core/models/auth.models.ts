// src/app/auth/models/auth.models.ts

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  is_staff: boolean;
}

export interface AuthResponse {
  access: string; // JWT access token
  refresh?: string; // optional refresh token
  user: User;
}

export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  is_staff: boolean;
}

export interface UpdateProfilePayload extends UserProfile {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  is_staff: boolean;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  uid: string;
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface SimpleDetailResponse {
  detail: string;
}
