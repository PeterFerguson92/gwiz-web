import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoadingApiComponent } from './components/loading-api/loading-api.component';
import { NotificationMessageComponent } from './components/notification-message/notification-message.component';

export const SHARED_IMPORTS = [
  FormsModule,
  NotificationMessageComponent,
  LoadingApiComponent,
  // Add other shared modules/components here
];
export { CommonModule, LoadingApiComponent, NotificationMessageComponent };
