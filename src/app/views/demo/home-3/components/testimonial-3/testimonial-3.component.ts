import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
    selector: 'app-testimonial-3',
    imports: [SlickCarouselModule,CommonModule,RouterLink],
    templateUrl: './testimonial-3.component.html',
    styles: ``
})
export class Testimonial3Component {
    sliderForConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        nav: true,
        prevArrow: ('.testimonial-next-arrow'),
        nextArrow: ('.testimonial-prev-arrow'),
        fade: true,
        loop: true,
        asNavFor: '.slider-nav1',
    }
    sliderNavConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.foter-carousel',
        dots: false,
        arrows:true,
        nav:true,
        loop:true,
        centerMode: false,
        focusOnSelect: true,
        autoplay:true,
        autoplayTimeout:500,
        prevArrow: ('.testimonial-next-arrow'),
        nextArrow: ('.testimonial-prev-arrow'),
    }
}
