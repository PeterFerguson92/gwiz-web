import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { StickyScrollDirective } from "@core/directives/sticky-scroll.directive";
import { MobileMenuComponent } from "../mobile-menu/mobile-menu.component";
import { RouterLink } from "@angular/router";
import { ApiService } from "@core/services/api.service";
import { SHARED_IMPORTS } from "@/app/shared/shared-imports";
import { AuthService } from "@core/services/auth.service";

@Component({
	selector: "app-topbar",
	imports: [MobileMenuComponent, CommonModule, StickyScrollDirective, RouterLink, CommonModule, ...SHARED_IMPORTS],
	templateUrl: "./topbar.component.html",
	styles: ``,
})
export class TopbarComponent implements OnInit {
	isActive = false;

	@Input() headerClass!: string;
	@Input() mobileHeaderClass!: string;
	@Input() mobileLogo!: string;
	@Input() mobileSidebarClass!: string;
	@Input() btnClass!: string;
	@Input() logo!: string;
	@Input() isAlert?: boolean;

	logoImg: any;
	mobileLogoImg: any;
	message: string | null = "";
	showLoader = false;
	showNotification = false;

	constructor(private service: ApiService, private authService: AuthService) {}
	ngOnInit(): void {
		this.service.getResource("homepage/banners").subscribe(
			(data) => {
				if (data && data.status === "success") {
					const result = data.result[0];
					this.logoImg = result.logo;
					this.mobileLogoImg = result.logo;
				} else {
					this.logoImg = "assets/img/logo/nobglogo/small_image_transparent.png";
					this.mobileLogoImg = "assets/img/logo/nobglogo/small_image_transparent.png";
				}
			},
			(error) => {
				console.log(error);
				// this.displayError(error);
			}
		);
	}

	get isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	logout(): void {
		this.authService.logout(true);
	}
}
