import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClassSession } from '@core/models/fitness.models';

import { FormattersService } from '../../service/formatters.service';

@Component({
  selector: 'app-class-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss',
})
export class ClassCardComponent {
  @Input() cls: any; // full class object
  @Input() placeholderImage!: string; // fallback image
  @Output() openDetails = new EventEmitter<any>();

  constructor(private formattersService: FormattersService) {}

  get instructorNames(): string {
    return this.formattersService.formatInstructorNames(this.cls?.instructors);
  }

  onCardClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // ignore clicks on buttons (already handled)
    if (target.closest('button')) return;

    this.openDetails.emit(this.cls);
  }

  onViewDetails(event: MouseEvent) {
    event.stopPropagation();
    this.openDetails.emit(this.cls);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.placeholderImage;
  }

  sessionDateLabel(session: ClassSession): string {
    return this.formattersService.formatSessionDate(session);
  }

  sessionTimeLabel(session: ClassSession): string {
    return this.formattersService.formatSessionTime(session);
  }
}
