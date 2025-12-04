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

  @Output() openDetails = new EventEmitter<FitnessClassWithNextSession>();

  constructor(private formatter: FormattersService) {}

  get nextSession(): ClassSession | null {
    return this.cls?.next_session ?? null;
  }

  get hasNextSession(): boolean {
    return !!this.nextSession;
  }

  get instructorNames(): string {
    return this.formatter.formatInstructorNames(this.cls?.instructors);
  }

  nextSessionDateLabel(): string {
    return this.nextSession ? this.formatter.formatSessionDate(this.nextSession) : '';
  }

  nextSessionTimeLabel(): string {
    return this.nextSession ? this.formatter.formatSessionTime(this.nextSession) : '';
  }

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

  onCardClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // If click came from a button, ignore (button handles its own click)
    if (target.closest('button')) {
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
