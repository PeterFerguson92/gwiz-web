// src/app/core/services/toast.service.ts
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
	message: string;
	type: ToastType;
}

@Injectable({ providedIn: "root" })
export class ToastService {
	private toastSubject = new Subject<ToastMessage>();
	toast$ = this.toastSubject.asObservable();

	show(message: string, type: ToastType = "info") {
		this.toastSubject.next({ message, type });
	}

	success(message: string) {
		console.log("[ToastService] success:", message);
		this.show(message, "success");
	}

	error(message: string) {
		this.show(message, "error");
	}

	info(message: string) {
		this.show(message, "info");
	}
}
