import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StickyScrollDirective } from '@core/directives/sticky-scroll.directive';
import { MobileMenuComponent } from "../mobile-menu/mobile-menu.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-topbar',
    imports: [MobileMenuComponent, CommonModule, StickyScrollDirective, RouterLink, CommonModule],
    templateUrl: './topbar.component.html',
    styles: ``
})
export class TopbarComponent {
    isActive = false;

    @Input() headerClass!: string
    @Input() mobileHeaderClass!: string
    @Input() mobileLogo!: string
    @Input() mobileSidebarClass!: string
    @Input() btnClass!: string
    @Input() logo!: string
    @Input() isAlert?: boolean


    homeMenuItems = [
        { title: 'Home 01', image: 'assets/img/demo/demo-img1.png', multiPageLink: '/home-1', onePageLink: '/home-single-1' },
        { title: 'Home 02', image: 'assets/img/demo/demo-img2.png', multiPageLink: '/home-2', onePageLink: '/home-single-2' },
        { title: 'Home 03', image: 'assets/img/demo/demo-img3.png', multiPageLink: '/home-3', onePageLink: '/home-single-3' },
        { title: 'Home 04', image: 'assets/img/demo/demo-img4.png', multiPageLink: '/home-4', onePageLink: '/home-single-4' },
    ];

    serviceMenuItems = [
        { title: 'Service One', link: '/services/one' },
        { title: 'Service Left', link: '/services/left' },
        { title: 'Service Right', link: '/services/right' },
        { title: 'Service Single', link: '/services/single' }
    ]

    blogMenuItems = [
        { title: 'Blog One', link: '/blogs/one' },
        { title: 'Blog Sidebar', link: '/blogs/sidebar' },
        { title: 'Blog Left', link: '/blogs/left' },
        { title: 'Blog Right', link: '/blogs/right' },
        { title: 'Blog Single', link: '/blogs/single' }
    ];

    pageMenuItems = [
        { title: 'Case Study One', link: '/case-study-1' },
        { title: 'Case Study Left', link: '/case-study-left' },
        { title: 'Case Study Right', link: '/case-study-right' },
        { title: 'Case Study Single', link: '/case-study-single' },
        { title: 'Our Team', link: '/our-team' },
        { title: 'Pricing Plan', link: '/pricing-plan' },
        { title: 'Testimonials', link: '/testimonials' },
        { title: 'FAQ', link: '/faq' },
        { title: '404', link: '/404' }
    ];



}
