import { Component } from "@angular/core";
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { ApiService } from "@core/services/api.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-contact-us",
	imports: [BreadcrumbComponent, CommonModule],
	templateUrl: "./contact-us.component.html",
	styles: ``,
})
export class ContactUsComponent {
	contact: any;
	message: string | null = "";
	showLoader = false;
	showNotification = false;

	constructor(private service: ApiService) {}
	ngOnInit(): void {
		this.service.getResource("homepage/contact").subscribe(
			(data) => {
        if (data && data.status === "success")
        {
          console.log(data)
					this.contact = data.result[0];
				}
			},
			(error) => {
				console.log(error);
				// this.displayError(error);
			}
		);
	}
}
