import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
interface MenuItem {
    title: string;
    link?: string;
    isOpen?: boolean;
    subMenu?: MenuItem[];
  }

@Component({
  selector: 'app-mobile-nav-item',
  imports: [CommonModule,RouterLink],
  templateUrl: './mobile-nav-item.component.html',
  styles: ``
})
export class MobileNavItemComponent {
    @Input() item!: MenuItem;

    toggleSubMenu(item: MenuItem, event?: Event) {
      if (event) event.stopPropagation();
      item.isOpen = !item.isOpen;
    }
}
