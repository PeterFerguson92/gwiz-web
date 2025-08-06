import { Component } from "@angular/core";
import { AboutHeroComponent } from "./components/about-hero/about-hero.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ChooseUsComponent } from "./components/choose-us/choose-us.component";
import { AboutContentComponent } from "./components/about-content/about-content.component";
import { TestimonialComponent } from "./components/testimonial/testimonial.component";
import { TeamComponent } from "./components/team/team.component";
import { BrandsComponent } from "./components/brands/brands.component";
import { BlogsComponent } from "./components/blogs/blogs.component";
import { CommonModule, SHARED_IMPORTS } from "@/app/shared/shared-imports";
import { ApiService } from "@core/services/api.service";

@Component({
	selector: "app-about",
	imports: [
		AboutHeroComponent,
		AboutUsComponent,
		ChooseUsComponent,
		AboutContentComponent,
		TestimonialComponent,
		TeamComponent,
		BrandsComponent,
		BlogsComponent,
		CommonModule,
		...SHARED_IMPORTS,
	],
	templateUrl: "./about.component.html",
	styles: ``,
})
export class AboutComponent {
	result: any;
	banner: any;
	aboutUs: any;
	message: string | null = "";
	showLoader = false;
	showNotification = false;
	constructor(private service: ApiService) {}

	ngOnInit() {
		this.showLoader = true;
		this.service.getResource("homepage/about-us").subscribe(
			(data: { status: string; result: any[] }) => {
				if (data && data.status === "success") {
					this.aboutUs = data.result[0];
					console.log(this.aboutUs);
					this.showLoader = false;
				} else {
					const error = "About us information not found";
					this.displayError(error);
				}
			},
			(error: string) => {
				console.log(error);
				this.displayError(error);
			}
		);
	}

	displayError(error: string) {
		this.showLoader = false;
		console.log(error);
		this.message = "Homepage information not found";
		this.showNotification = true;
	}
}
