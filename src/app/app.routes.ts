import { Routes } from '@angular/router';

import { LayoutComponent } from '@layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: 'staff',
    loadChildren: () => import('./views/staff/staff.routes').then((m) => m.STAFF_ROUTES),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/views.route').then((m) => m.VIEWS_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
