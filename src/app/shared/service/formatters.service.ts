import { Injectable } from '@angular/core';

import { ClassSession, Instructor } from '@core/models/fitness.models';

@Injectable({ providedIn: 'root' })
export class FormattersService {
  /**
   * Safely join instructor names into a comma-separated string.
   */
  formatInstructorNames(instructors?: Instructor[] | null): string {
    if (!instructors || !instructors.length) {
      return '';
    }
    return instructors
      .filter((i) => !!i?.name)
      .map((i) => i.name)
      .join(', ');
  }

  /**
   * Optional helpers if you want to centralise date/time formatting too.
   */
  formatSessionDate(session: ClassSession): string {
    const dateTime = new Date(`${session.date}T${session.start_time}`);
    return dateTime.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  formatSessionTime(session: ClassSession): string {
    const start = new Date(`${session.date}T${session.start_time}`);
    const end = new Date(`${session.date}T${session.end_time}`);

    const startStr = start.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const endStr = end.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${startStr} – ${endStr}`;
  }
}
