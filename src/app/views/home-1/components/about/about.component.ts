import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AboutUsComponent } from "@views/other-pages/about/components/about-us/about-us.component";

@Component({
	selector: "app-about",
	imports: [RouterLink],
	templateUrl: "./about.component.html",
	styles: ``,
})
export class AboutComponent {
	@Input() aboutUs: any;
}
