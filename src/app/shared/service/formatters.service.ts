import { Injectable } from '@angular/core';

import { ClassSession, FitnessClass, Instructor } from '@core/models/fitness.models';

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

  private buildDateTime(date: string, time: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute, second] = time.split(':').map(Number);

    // month is 0-based in JS Date
    return new Date(year, month - 1, day, hour, minute, second || 0);
  }

  formatSessionDate(session: ClassSession): string {
    const dt = this.buildDateTime(session.date, session.start_time);
    if (isNaN(dt.getTime())) {
      return session.date; // fallback
    }

    return dt.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  formatSessionTime(session: ClassSession): string {
    const start = this.buildDateTime(session.date, session.start_time);
    const end = this.buildDateTime(session.date, session.end_time);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      // fallback to raw strings
      return `${session.start_time} – ${session.end_time}`;
    }

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

  getSessionCapacity(session: ClassSession, fitnessClass?: FitnessClass | null): number | null {
    if (session.capacity_effective !== undefined && session.capacity_effective !== null) {
      return session.capacity_effective;
    }
    if (fitnessClass) {
      return fitnessClass.capacity;
    }
    return null;
  }

  getSessionPrice(session: ClassSession, fitnessClass?: FitnessClass | null): number | null {
    if (session.price_effective !== undefined && session.price_effective !== null) {
      // price_effective is a string like "12.00"
      return Number(session.price_effective);
    }
    if (fitnessClass) {
      return Number(fitnessClass.base_price);
    }
    return null;
  }
}
