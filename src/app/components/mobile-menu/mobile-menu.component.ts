import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { menuItems } from "./data";
import { MobileNavItemComponent } from "./mobile-nav-item/mobile-nav-item.component";
import { RouterLink } from "@angular/router";
import { ApiService } from "@core/services/api.service";
import { AuthService } from "@core/services/auth.service";
interface MenuItem {
	title: string;
	link?: string;
	subMenu?: MenuItem[];
	isOpen?: boolean;
}

@Component({
	selector: "app-mobile-menu",
	imports: [CommonModule, MobileNavItemComponent, RouterLink],
	templateUrl: "./mobile-menu.component.html",
	styles: ``,
})
export class MobileMenuComponent {
	isMenuOpen = false;

	@Input() mobileHeaderClass!: string;
	@Input() mobileSidebarClass!: string;
	@Input() mobileLogo!: string;
	@Input() btnClass!: string;
	menuItems: MenuItem[] = [];
	menu = [
		{ title: "Home", link: "/", isOpen: false },
		{ title: "About", link: "/about" },
		{ title: "Services", isOpen: false, link: "/services" },
		{ title: "Privacy Policy", link: "/privacy" },
		{ title: "Terms & Condition", link: "/terms" },
		{ title: "Contact us", link: "/contact-us" },
	];

	footer: any;
	showLoader = false;
	showNotification = false;
	message = "";

	constructor(
		private service: ApiService,
		private authService: AuthService // 👈 inject auth
	) {}

	ngOnInit() {
		this.menuItems = this.menu;
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

	get isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	logout(): void {
		this.authService.logout(true);
		this.closeMenu();
	}

	displayError(error: string) {
		this.showLoader = false;
		this.message = "information not found";
		this.showNotification = true;
	}

	getBackgroundImage(img: String) {
		return img ? img : "assets/img/all-images/default-footer-logo.png";
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	closeMenu() {
		this.isMenuOpen = false;
	}

	toggleSubMenu(item: MenuItem, event?: Event): void {
		if (event) {
			event.stopPropagation();
		}

		if (item.subMenu) {
			item.isOpen = !item.isOpen;
		}
	}
}
