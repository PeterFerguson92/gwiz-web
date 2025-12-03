import { Routes } from '@angular/router';

import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassesComponent } from './classes/classes.component';

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
];
