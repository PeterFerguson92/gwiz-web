import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-message',
  imports: [CommonModule],
  templateUrl: './notification-message.component.html',
  styleUrl: './notification-message.component.scss',
})
export class NotificationMessageComponent {
  @Input() showNotification = false;
  @Input() message: string | null = null;
  title = 'Unable to Load Content';
}
