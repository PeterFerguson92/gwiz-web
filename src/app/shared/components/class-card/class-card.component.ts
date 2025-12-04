import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClassSession, FitnessClassWithNextSession } from '@core/models/fitness.models';

import { FormattersService } from '../../service/formatters.service';

@Component({
  selector: 'app-class-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss'],
})
export class ClassCardComponent {
  @Input() cls!: FitnessClassWithNextSession;
  @Input() placeholderImage = 'assets/img/placeholder/fitness-placeholder.jpg';

  /** Show "NEW" badge for classes created within this many days */
  @Input() newDays = 7;

  @Output() openDetails = new EventEmitter<FitnessClassWithNextSession>();

  constructor(private formatter: FormattersService) {}

  /* ----------------- DERIVED PROPERTIES ----------------- */

  get nextSession(): ClassSession | null {
    return this.cls?.next_session ?? null;
  }

  get hasNextSession(): boolean {
    return !!this.nextSession;
  }

  get instructorNames(): string {
    return this.formatter.formatInstructorNames(this.cls?.instructors);
  }

  /** Compact label like "Fri 5 Dec • 18:00" for the next session */
  get compactNextSessionLabel(): string {
    const s = this.nextSession;
    if (!s) return '';

    // Build a date object safely from date + time
    const [year, month, day] = s.date.split('-').map(Number);
    const [hour, minute] = s.start_time.split(':').map(Number);
    const dt = new Date(year, month - 1, day, hour, minute);

    if (isNaN(dt.getTime())) {
      // Fallback if something is weird
      return `${s.date} • ${s.start_time.slice(0, 5)}`;
    }

    const datePart = dt.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    const timePart = dt.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${datePart} • ${timePart}`;
  }

  /** "NEW" badge if class created within newDays */
  get isNewClass(): boolean {
    if (!this.cls?.created_at) return false;

    const created = new Date(this.cls.created_at);
    if (isNaN(created.getTime())) return false;

    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays <= this.newDays;
  }

  /* ----------------- AVAILABILITY ----------------- */

  isNextSessionFull(): boolean {
    const session = this.nextSession;
    if (!session) return false;
    return session.spaces_left <= 0 || session.status === 'cancelled';
  }

  nextSessionSpacesLabel(): string {
    const session = this.nextSession;
    if (!session) return 'No upcoming sessions';

    if (session.status === 'cancelled') {
      return 'Cancelled';
    }

    if (session.spaces_left <= 0) {
      return 'FULL';
    }

    return `${session.spaces_left} spots left`;
  }

  /* ----------------- EVENTS ----------------- */

  onCardClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('button')) {
      // Button clicks are handled separately
      return;
    }
    this.openDetails.emit(this.cls);
  }

  onViewDetails(event: MouseEvent): void {
    event.stopPropagation();
    this.openDetails.emit(this.cls);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.includes(this.placeholderImage)) {
      return; // avoid infinite loop
    }
    img.src = this.placeholderImage;
  }
}
