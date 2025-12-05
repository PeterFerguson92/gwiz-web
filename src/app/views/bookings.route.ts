import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';

import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassesComponent } from './classes/classes.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

export const BOOKINGS_ROUTES: Routes = [
  {
    path: 'classes',
    component: ClassesComponent,
    data: { title: 'Classes' },
  },
  {
    path: 'classes/:id',
    component: ClassDetailsComponent,
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [authGuard],
    data: { title: 'My Bookings' },
  },
];
