import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, type OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-brands',
    imports: [CarouselModule, CommonModule],
    templateUrl: './brands.component.html',
    styles: ``
})
export class BrandsComponent {

    brands = ["assets/img/elements/brand1.png", "assets/img/elements/brand2.png", "assets/img/elements/brand3.png", "assets/img/elements/brand4.png", "assets/img/elements/brand5.png"]
    carouselOptions: OwlOptions = {
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        mouseDrag: true,
        items: 10,
        autoplay: true,
        smartSpeed: 2000,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 2,
                nav: false,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            }
        }
    };

}
