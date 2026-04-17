import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

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
export class StaffHomeComponent implements OnInit {
  private eventService = inject(EventService);
  private fitnessClassService = inject(FitnessClassService);
  readonly sessionWindows = [7, 14, 30, 0] as const;

  events: Event[] = [];
  sessions: ClassSession[] = [];
  eventsLoading = true;
  eventsErrorMessage = '';
  sessionsErrorMessage = '';
  sessionsLoading = true;
  selectedSessionWindow: (typeof this.sessionWindows)[number] = 14;

  constructor() {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadSessions();
  }

  get hasEvents(): boolean {
    return this.events.length > 0;
  }

  get hasSessions(): boolean {
    return this.sessions.length > 0;
  }

  get sessionWindowLabel(): string {
    if (this.selectedSessionWindow === 0) {
      return 'All upcoming';
    }

    return `Next ${this.selectedSessionWindow} days`;
  }

  get groupedSessions(): Array<{ label: string; sessions: ClassSession[] }> {
    const groups = new Map<string, { label: string; sessions: ClassSession[] }>();

    for (const session of this.sessions) {
      const label = this.getSessionDateLabel(session.date);
      const key = `${session.date}:${label}`;
      if (!groups.has(key)) {
        groups.set(key, { label, sessions: [] });
      }
      groups.get(key)?.sessions.push(session);
    }

    return Array.from(groups.values());
  }

  setSessionWindow(windowDays: (typeof this.sessionWindows)[number]): void {
    if (this.selectedSessionWindow === windowDays || this.sessionsLoading) {
      return;
    }

    this.selectedSessionWindow = windowDays;
    this.loadSessions();
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

  private loadEvents(): void {
    this.eventsLoading = true;
    this.eventsErrorMessage = '';

    this.eventService
      .listEvents()
      .pipe(finalize(() => (this.eventsLoading = false)))
      .subscribe({
      next: (events) => {
        this.events = events;
      },
      error: () => {
        this.events = [];
        this.eventsErrorMessage = 'Could not load events.';
      },
    });
  }

  private loadSessions(): void {
    this.sessionsLoading = true;
    this.sessionsErrorMessage = '';

    this.fitnessClassService
      .getAllUpcomingSessions(this.buildSessionWindowQuery())
      .pipe(finalize(() => (this.sessionsLoading = false)))
      .subscribe({
      next: (sessions) => {
        this.sessions = Array.isArray(sessions) ? sessions : [];
      },
      error: () => {
        this.sessions = [];
        this.sessionsErrorMessage = 'Could not load class sessions for that date range.';
      },
    });
  }

  private buildSessionWindowQuery(): { from_date: string; to_date?: string } {
    const today = new Date();
    const from_date = this.toDateString(today);

    if (this.selectedSessionWindow === 0) {
      return { from_date };
    }

    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + this.selectedSessionWindow);

    return {
      from_date,
      to_date: this.toDateString(endDate),
    };
  }

  private getSessionDateLabel(rawDate: string): string {
    const sessionDate = new Date(`${rawDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (sessionDate.getTime() === today.getTime()) {
      return 'Today';
    }

    if (sessionDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }

    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(sessionDate);
  }

  private toDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
