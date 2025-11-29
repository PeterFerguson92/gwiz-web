import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ToastMessage, ToastService } from "@core/services/toast.service";
import { Subscription, timer } from "rxjs";

@Component({
	selector: "app-toast",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./toast.component.html",
	styleUrls: ["./toast.component.scss"], 
})
export class ToastComponent {
	visible = false;
	current: ToastMessage | null = null;
	private sub?: Subscription;

	constructor(private toast: ToastService) {}

	ngOnInit(): void {
		this.sub = this.toast.toast$.subscribe((msg) => {
			console.log("[ToastComponent] received:", msg);
			this.current = msg;
			this.visible = true;
			timer(3000).subscribe(() => (this.visible = false));
		});
	}

	ngOnDestroy(): void {
		this.sub?.unsubscribe();
	}
}
