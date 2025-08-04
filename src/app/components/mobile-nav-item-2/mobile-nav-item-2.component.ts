import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollService } from '@core/services/scroll.service';
interface MenuItem {
    title: string;
    link?: string;
    isOpen?: boolean;
    subMenu?: MenuItem[];
}
@Component({
    selector: 'app-mobile-nav-item-2',
    imports: [CommonModule,RouterLink],
    templateUrl: './mobile-nav-item-2.component.html',
    styles: ``
})
export class MobileNavItem2Component {
    @Input() item!: MenuItem;

    public scroll = inject(ScrollService)


    toggleSubMenu(item: MenuItem, event?: Event) {
        if (event) event.stopPropagation();
        item.isOpen = !item.isOpen;
    }
}
