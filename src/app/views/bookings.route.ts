import { Routes } from '@angular/router';

import { ClassesComponent } from './classes/classes.component';

export const BOOKINGS_ROUTES: Routes = [
  {
    path: 'classes',
    component: ClassesComponent,
    data: { title: 'Classes' },
  },
];
