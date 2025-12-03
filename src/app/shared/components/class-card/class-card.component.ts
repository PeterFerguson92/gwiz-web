import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  sessionDateLabel(session: any) {
    return new Date(session.start).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  sessionTimeLabel(session: any) {
    return new Date(session.start).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
