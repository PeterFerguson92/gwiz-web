import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ToastMessage, ToastService } from "@core/services/toast.service";
import { Subscription, timer } from 'rxjs';
@Component({
	selector: "app-toast",
	imports: [CommonModule],
	templateUrl: "./toast.component.html",
	styleUrl: "./toast.component.scss",
})
export class ToastComponent {
	visible = false;
	current: ToastMessage | null = null;

	private sub?: Subscription;

	constructor(private toastService: ToastService) {}

	ngOnInit(): void {
		this.sub = this.toastService.toast$.subscribe((msg) => {
			this.current = msg;
			this.visible = true;

			// auto-hide after 3s
			timer(3000).subscribe(() => {
				this.visible = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.sub?.unsubscribe();
	}
}
