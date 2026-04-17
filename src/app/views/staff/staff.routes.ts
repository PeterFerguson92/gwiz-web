import { Routes } from '@angular/router';

import { staffGuard } from '@core/guards/staff.guard';
import { staffLoginGuard } from '@core/guards/staff-login.guard';

import { StaffEventCheckInComponent } from './staff-event-check-in/staff-event-check-in.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffLayoutComponent } from './staff-layout/staff-layout.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { StaffSessionAttendanceComponent } from './staff-session-attendance/staff-session-attendance.component';
import { StaffTokenScanComponent } from './staff-token-scan/staff-token-scan.component';
import { StaffTokenCheckInComponent } from './staff-token-check-in/staff-token-check-in.component';

export const STAFF_ROUTES: Routes = [
  {
    path: 'login',
    component: StaffLoginComponent,
    canActivate: [staffLoginGuard],
    data: { title: 'Staff login' },
  },
  {
    path: '',
    canActivate: [staffGuard],
    component: StaffLayoutComponent,
    children: [
      {
        path: '',
        component: StaffHomeComponent,
        data: { title: 'Staff' },
      },
      {
        path: 'events/:eventId/check-in',
        component: StaffEventCheckInComponent,
        data: { title: 'Event check-in' },
      },
      {
        path: 'classes/:sessionId/attendance',
        component: StaffSessionAttendanceComponent,
        data: { title: 'Class attendance' },
      },
      {
        path: 'check-in/token',
        component: StaffTokenCheckInComponent,
        data: { title: 'Token check-in' },
      },
      {
        path: 'check-in/scan',
        component: StaffTokenScanComponent,
        data: { title: 'QR check-in' },
      },
    ],
  },
];
