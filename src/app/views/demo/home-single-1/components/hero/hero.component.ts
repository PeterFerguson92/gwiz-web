import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, type OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-hero',
    imports: [NgFor, CarouselModule],
    templateUrl: './hero.component.html',
    styles: ``
})
export class HeroComponent {

    slides = [
        { img: 'assets/img/bg/header-img4.png' },
        { img: 'assets/img/bg/header-img2.png' },
        { img: 'assets/img/bg/header-img3.png' }
    ];

    carouselOptions: OwlOptions = {
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        mouseDrag: false,
        items: 1,
        autoplay: true,
        navText: ["<i class='fa-solid fa-angle-up'></i>", "<i class='fa-solid fa-angle-down'></i>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 2000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    };

}
