import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
interface MenuItem {
	title: string;
	link?: string;
	isOpen?: boolean;
	subMenu?: MenuItem[];
}

@Component({
	selector: "app-mobile-nav-item",
	imports: [CommonModule, RouterLink],
	templateUrl: "./mobile-nav-item.component.html",
	styles: ``,
})
export class MobileNavItemComponent {
	@Input() item!: MenuItem;
	@Output() itemClicked = new EventEmitter<void>(); // notify parent to close menu

	toggleSubMenu(item: MenuItem, event?: Event) {
		if (event) event.stopPropagation();
		item.isOpen = !item.isOpen;
	}
	onItemClick(event?: any): any {
		if (event) event.stopPropagation();
		this.itemClicked.emit();
	}
}
