import { Component } from '@angular/core';
import { caseStudyData } from '../data';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-case-study-3',
    imports: [CarouselModule,CommonModule,RouterLink],
    templateUrl: './case-study-3.component.html',
    styles: ``
})
export class CaseStudy3Component {
    caseStudies = caseStudyData

    carouselOptions = {
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        mouseDrag: true,
        items: 10,
        autoplay: true,
        navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
        smartSpeed: 2000,
        autoplayTimeout: 2500,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    }
}
