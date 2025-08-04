import type { ServiceType } from '@/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceCardComponent } from '@app/components/cards/service-card/service-card.component';
import { PaginationComponent } from "@app/components/pagination/pagination.component";
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";

@Component({
    selector: 'app-service-1',
    imports: [ CommonModule, PaginationComponent, ServiceCardComponent, BreadcrumbComponent],
    templateUrl: './service-1.component.html',
    styles: ``
})
export class Service1Component {

    services: ServiceType[] = [
        {
            id: 1,
            image: 'assets/img/all-images/service-img1.png',
            title: 'Bright Spark Services',
            description: 'Explore our range of services below & discover how you power your life'
        },
        {
            id: 2,
            image: 'assets/img/all-images/service-img2.png',
            title: 'Energy Ease Packages',
            description: 'With cutting-edge technology & industry expertise, we empower'
        },
        {
            id: 3,
            image: 'assets/img/all-images/service-img3.png',
            title: 'Electra Care Packages',
            description: 'Our team of experts is committed to delivering high-quality services'
        },
        {
            id: 4,
            image: 'assets/img/all-images/service-img7.png',
            title: 'Voltage Wave Energy',
            description: "That's why we're committed to delivering top-notch services"
        },
        {
            id: 5,
            image: 'assets/img/all-images/service-img8.png',
            title: 'Energy Savvy Solutions',
            description: 'We offer a comprehensive range of solutions designed to empower'
        },
        {
            id: 6,
            image: 'assets/img/all-images/service-img9.png',
            title: 'Circuit Works Energy',
            description: 'The lights on and the energy flowing, powering your present'
        },
        {
            id: 7,
            image: 'assets/img/all-images/service-img10.png',
            title: 'Power Sync Solutions',
            description: 'Explore our range of services below & discover how you power your life'
        },
        {
            id: 8,
            image: 'assets/img/all-images/service-img11.png',
            title: 'Voltify Energy Group',
            description: "Where we're dedicated to powering your life with reliable and efficient"
        },
        {
            id: 9,
            image: 'assets/img/all-images/service-img12.png',
            title: 'Joule Works Energy',
            description: 'As a leading provider in the industry, we understand the crucial role that'
        }
    ];

}
