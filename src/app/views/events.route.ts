import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';

import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsComponent } from './events/events.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

export const EVENTS_ROUTES: Routes = [
  {
    path: 'events',
    component: EventsComponent,
    data: { title: 'Events' },
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
  },
  {
    path: 'my-tickets',
    component: MyTicketsComponent,
    canActivate: [authGuard],
    data: { title: 'My tickets' },
  },
];
