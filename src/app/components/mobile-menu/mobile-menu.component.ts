import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { menuItems } from './data';
import { MobileNavItemComponent } from "./mobile-nav-item/mobile-nav-item.component";
import { RouterLink } from '@angular/router';

interface MenuItem {
    title: string;
    link?: string;
    subMenu?: MenuItem[];
    isOpen?: boolean
}

@Component({
    selector: 'app-mobile-menu',
    imports: [CommonModule, MobileNavItemComponent,RouterLink],
    templateUrl: './mobile-menu.component.html',
    styles: ``
})
export class MobileMenuComponent {
    isMenuOpen = false;

    @Input() mobileHeaderClass!: string;
    @Input() mobileSidebarClass!: string;
    @Input() mobileLogo!: string;
    @Input() btnClass!: string;
    menuItems: MenuItem[] = [];


    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    ngOnInit() {
        this.menuItems = menuItems;
    }

    toggleSubMenu(item: MenuItem, event?: Event): void {
        if (event) {
          event.stopPropagation();  // Prevents click from propagating to the parent <a>
        }
      
        if (item.subMenu) {
          item.isOpen = !item.isOpen;
        }
      }

}
