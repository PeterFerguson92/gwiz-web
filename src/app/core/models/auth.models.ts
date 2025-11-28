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
}

export interface AuthResponse {
  access: string;          // JWT access token
  refresh?: string;        // optional refresh token
  user: User;
}
