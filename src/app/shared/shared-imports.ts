import { CommonModule } from "@angular/common";
import { NotificationMessageComponent } from "./components/notification-message/notification-message.component";
import { LoadingApiComponent } from "./components/loading-api/loading-api.component";

export const SHARED_IMPORTS = [
	CommonModule,
	NotificationMessageComponent,
	LoadingApiComponent,
	// Add other shared modules/components here
];
export { CommonModule };
export { NotificationMessageComponent }; // ✅ Add this to make it importable
export { LoadingApiComponent }; // ✅ Add this to make it importable
