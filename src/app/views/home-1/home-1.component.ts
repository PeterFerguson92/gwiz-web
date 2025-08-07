import { Component } from "@angular/core";
import { AboutComponent } from "./components/about/about.component";
import { BlogsComponent } from "./components/blogs/blogs.component";
import { BrandsComponent } from "./components/brands/brands.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FaqsComponent } from "./components/faqs/faqs.component";
import { HeroComponent } from "./components/hero/hero.component";
import { PricingPlansComponent } from "./components/pricing-plans/pricing-plans.component";
import { ServicesComponent } from "./components/services/services.component";
import { TeamComponent } from "./components/team/team.component";
import { TestimonialComponent } from "./components/testimonial/testimonial.component";
import { WorkComponent } from "./components/work/work.component";
import { ApiService } from "@core/services/api.service";
import { CommonModule, SHARED_IMPORTS } from "../../shared/shared-imports";

@Component({
	selector: "app-home-1",
	imports: [HeroComponent, AboutComponent, ServicesComponent, FaqsComponent, ContactComponent, CommonModule, ...SHARED_IMPORTS],
	templateUrl: "./home-1.component.html",
	styles: ``,
})
export class Home1Component {
	result: any;
	banner: any;
	aboutUs: any;
	services: any;
	serviceTitle = "";
	serviceDescription = "";
	faqs: any;
	faqTitle = "";
	faqDescription = "";
	contact: any;
	message: string | null = "";
	showLoader = false;
	showNotification = false;
	constructor(private service: ApiService) {}

	ngOnInit() {
		this.showLoader = true;
		this.service.getResource("homepage").subscribe(
			(data) => {
				if (data && data.status === "success") {
					const result = data.result[0];
					this.banner = result.banner;
					this.aboutUs = result.about_us;
					this.services = result.services;
					this.serviceTitle = result.service_title;
					this.serviceDescription = result.service_description;
					this.faqs = result.faqs;
					this.faqTitle = result.faq_title;
					this.faqDescription = result.faq_description;
					this.contact = result.contact;
					this.showLoader = false;
				} else {
					const error = "Homepage information not found";
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
		console.log(error);
		this.message = "Homepage information not found";
		this.showNotification = true;
	}
}
