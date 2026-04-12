import { Routes } from '@angular/router';

import { staffGuard } from '@core/guards/staff.guard';
import { staffLoginGuard } from '@core/guards/staff-login.guard';

import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';

export const STAFF_ROUTES: Routes = [
  {
    path: 'login',
    component: StaffLoginComponent,
    canActivate: [staffLoginGuard],
    data: { title: 'Staff login' },
  },
  {
    path: '',
    component: StaffHomeComponent,
    canActivate: [staffGuard],
    data: { title: 'Staff' },
  },
];
