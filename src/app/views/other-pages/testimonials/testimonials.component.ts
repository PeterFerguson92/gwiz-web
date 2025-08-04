import { Component } from '@angular/core';
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import type { TestimonialType } from '@/types';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "@app/components/pagination/pagination.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-testimonials',
    imports: [BreadcrumbComponent, CommonModule, PaginationComponent,RouterModule],
    templateUrl: './testimonials.component.html',
    styles: ``
})
export class TestimonialsComponent {
    testimonials:TestimonialType[] = [
        {
            image: 'assets/img/all-images/testimonial-img11.png',
            name: 'Dhruv Jerel',
            role: 'Scheduler',
            description: 'From homeowners to businesses, our customers have benefited from our commitment to providing top-notch service and support. Explore their stories to learn',
        },
        {
            image: 'assets/img/all-images/testimonial-img12.png',
            name: 'Issuant Sharma',
            role: 'Logistics Officer',
            description: 'Discover why our customers love our electricity services! Read testimonials from satisfied clients who have experienced the reliability, efficiency, and excellence',
        },
        {
            image: 'assets/img/all-images/testimonial-img13.png',
            name: 'Richardson',
            role: 'Transport Manager',
            description: 'Their stories not only showcase the effectiveness of our services but also highlight the dedication and expertise of our team. Explore their experiences to learn',
        },
        {
            image: 'assets/img/all-images/testimonial-img15.png',
            name: 'David Miller',
            role: 'Inventory Planner',
            description: 'Our testimonials speak volumes about the quality, reliability, and excellence of our electricity services. From homeowners to businesses, our clients have benefited from',
        },
        {
            image: 'assets/img/all-images/testimonial-img16.png',
            name: 'Matthew Wade',
            role: 'Demand Planner',
            description: "Hear firsthand accounts of how we've helped individuals save on their energy bills, increase efficiency in their operations, and navigate complex electrical projects with",
        },
        {
            image: 'assets/img/all-images/testimonial-img17.png',
            name: 'Vijay Shankar',
            role: 'Expeditor',
            description: 'We take pride in delivering exceptional results and exceeding expectations Explore our testimonials to see why our customers trust us as their preferred electricity provider',
        },
        {
            image: 'assets/img/all-images/testimonial-img18.png',
            name: 'Vicky Ostwald',
            role: 'Expeditor',
            description: 'Experience the satisfaction and success shared by our valued customers in their own words. Our testimonials are a testament to the trust & confidence our clients place',
        },
        {
            image: 'assets/img/all-images/testimonial-img19.png',
            name: 'Amrich Nortje',
            role: 'Inventory Planner',
            description: 'From homeowners seeking reliable energy solutions to businesses striving for efficiency and sustainability, our customers have found their answers with us',
        },
        {
            image: 'assets/img/all-images/testimonial-img20.png',
            name: 'Praveen Dubey',
            role: 'Scheduler',
            description: "Their stories highlight not only the quality and reliability of our electricity services but also the dedication and expertise of our team. Whether it's overcoming challenges",
        }
    ]
}
