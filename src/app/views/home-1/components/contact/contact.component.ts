import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-contact",
	imports: [CommonModule],
	templateUrl: "./contact.component.html",
	styles: ``,
})
export class ContactComponent {
	@Input() contact: any;

	getBackgroundImage(img: String) {
		return img ? img : "assets/img/all-images/default-contact.png";
	}

	getBackgroundStyles() {
		return {
			"background-image": `url(${this.getBackgroundImage(this.contact.background_image)})`,
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-size": "cover",
		};
	}
}
