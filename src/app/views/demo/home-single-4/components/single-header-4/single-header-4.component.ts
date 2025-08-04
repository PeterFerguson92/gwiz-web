import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StickyScrollDirective } from '@core/directives/sticky-scroll.directive';
import { ScrollService } from '@core/services/scroll.service';
import { MobileNavItem2Component } from "@app/components/mobile-nav-item-2/mobile-nav-item-2.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-header-4',
  imports: [CommonModule, StickyScrollDirective, MobileNavItem2Component,RouterLink],
  templateUrl: './single-header-4.component.html',
  styles: ``
})
export class SingleHeader4Component {
    isMenuOpen = false;
    menuItems = ["about", "services", "case study", "testimonials", "team", "blogs"]

    public scroll = inject(ScrollService)

    ngOnInit() {
        this.scroll.setSections(this.menuItems);
    }

    toSentenceCase(text: string): string {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }


    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }
    navItems = [
        {
            "title": "Home",
            "link": "#",
            "isOpen": false,
            "subMenu": [
                {
                    title: "Multiple page",
                    subMenu: [
                        { "title": "Home One", "link": "/home-1" },
                        { "title": "Home Two", "link": "/home-2" },
                        { "title": "Home Three", "link": "/home-3" },
                        { "title": "Home Four", "link": "/home-4" },
                        { "title": "Home Five", "link": "/home-5" }
                    ]
                },
                {
                    title: "Landing page",
                    subMenu: [
                        { "title": "Home One", "link": "/home-single-1" },
                        { "title": "Home Two", "link": "/home-single-2" },
                        { "title": "Home Three", "link": "/home-single-3" },
                        { "title": "Home Four", "link": "/home-single-4" },
                        { "title": "Home Five", "link": "/home-single-5" }
                    ]
                }

            ]
        },
        {
            "title": "About",
            "link": "/about"
        },
        {
            "title": "Services",
            "link": "/services"
        },
        {
            "title": "case-study",
            "link": "/case-study"
        },
        {
            "title": "Testimonials",
            "link": "/testimonials"
        },
        {
            "title": "Team",
            "link": "/team"
        },
        {
            "title": "Blogs",
            "link": "/blogs"
        },
    ]
}
