import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Event } from '@core/models/event.models';
import { ClassSession } from '@core/models/fitness.models';
import { EventService } from '@core/services/event.service';
import { FitnessClassService } from '@core/services/fitness-class.service';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss'],
})
export class StaffHomeComponent {
  private eventService = inject(EventService);
  private fitnessClassService = inject(FitnessClassService);

  events: Event[] = [];
  sessions: ClassSession[] = [];
  isLoading = true;
  errorMessage = '';

  constructor() {
    forkJoin({
      events: this.eventService.listEvents(),
      sessions: this.fitnessClassService.getAllUpcomingSessions(),
    }).subscribe({
      next: ({ events, sessions }) => {
        this.events = events;
        this.sessions = sessions;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load events and sessions.';
        this.isLoading = false;
      },
    });
  }

  get hasEvents(): boolean {
    return this.events.length > 0;
  }

  get hasSessions(): boolean {
    return this.sessions.length > 0;
  }

  trackById(_: number, item: Event | ClassSession): string {
    return item.id;
  }

  sessionTitle(session: ClassSession): string {
    if (typeof session.fitness_class === 'string') {
      return 'Class session';
    }

    return session.fitness_class.name;
  }
}
