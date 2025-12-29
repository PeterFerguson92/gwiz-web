import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Event as GymEvent } from '@core/models/event.models';

import { FormattersService } from '../../service/formatters.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  @Input() event!: GymEvent;
  @Input() placeholderImage = 'assets/img/placeholder.jpg';

  @Output() viewDetails = new EventEmitter<GymEvent>();

  constructor(private formatter: FormattersService) {}

  get isFree(): boolean {
    const price = Number(this.event?.ticket_price);
    return !isNaN(price) && price <= 0;
  }

  get isSoldOut(): boolean {
    return this.event?.is_sold_out || this.event?.remaining_tickets <= 0;
  }

  get eventDateLabel(): string {
    return this.formatter.formatEventDate(this.event?.start_datetime);
  }

  get eventTimeRange(): string {
    return this.formatter.formatEventTimeRange(
      this.event?.start_datetime,
      this.event?.end_datetime
    );
  }

  get priceLabel(): string {
    const formatted = this.formatter.formatCurrency(this.event?.ticket_price);
    return this.isFree ? 'Free' : formatted || 'Free';
  }

  get availabilityLabel(): string {
    if (this.isSoldOut) return 'Sold out';
    if (this.event?.remaining_tickets === 1) return '1 ticket left';
    return `${this.event?.remaining_tickets ?? 0} tickets left`;
  }

  onView(): void {
    this.viewDetails.emit(this.event);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.includes(this.placeholderImage)) return;
    img.src = this.placeholderImage;
  }
}
