// 🔐 Auth routes – same component, different URLs

import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';
import { AuthComponent } from '@views/auth/auth.component';
import { ProfileComponent } from '@views/profile/profile.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [guestGuard],
    data: { title: 'Login' },
  },
  {
    path: 'signup',
    component: AuthComponent,
    canActivate: [guestGuard],
    data: { title: 'Sign up' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { title: 'Profile' },
  },
];
