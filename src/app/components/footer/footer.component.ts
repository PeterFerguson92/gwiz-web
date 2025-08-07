import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ApiService } from "@core/services/api.service";

@Component({
	selector: "app-footer",
	imports: [RouterLink, CommonModule],
	templateUrl: "./footer.component.html",
	styles: ``,
})
export class FooterComponent {
	currentYear = new Date().getFullYear();
	@Input() logo!: string;
	@Input() containerClass!: string;
	footer: any;
	showLoader = false;
	showNotification = false;
	message = "";

	constructor(private service: ApiService) {}

	ngOnInit() {
		this.showLoader = true;
		this.service.getResource("homepage/footer").subscribe(
			(data) => {
				if (data && data.status === "success") {
					this.footer = data.result[0];
					this.showLoader = false;
				} else {
					const error = "Footer information not found";
					this.displayError(error);
				}
			},
			(error) => {
				console.log(error);
				this.displayError(error);
			}
		);
	}

	displayError(error: string) {
		this.showLoader = false;
		this.message = "information not found";
		this.showNotification = true;
	}

	getBackgroundImage(img: String) {
		return img ? img : "assets/img/all-images/default-footer-logo.png";
	}

	// getBackgroundStyles() {
	// 	return {
	// 		"background-image": `url(${this.getBackgroundImage(this.footer.logo)})`,
	// 		"background-position": "center",
	// 		"background-repeat": "no-repeat",
	// 		"background-size": "cover",
	// 	};
	// }
}
