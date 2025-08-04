import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { testimonialData } from '../data';

@Component({
    selector: 'app-testimonial',
    imports: [SlickCarouselModule, CommonModule, RouterLink],
    templateUrl: './testimonial.component.html',
    styles: ``
})
export class TestimonialComponent {

    testimonials = testimonialData
    sliderForConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        asNavFor: '.slider-galeria-thumbs',
        prevArrow: ('.testimonial-next-arrow'),
        nextArrow: ('.testimonial-prev-arrow'),
    }

    sliderThumbConfig = {
        slidesToShow: 5,
        slidesToScroll: 1,
        items: 15,
        arrows: true,
        asNavFor: '.slider-galeria',
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: true,
        infinite: false,
        prevArrow: ('.testimonial-next-arrow'),
        nextArrow: ('.testimonial-prev-arrow'),
    }

    thumbnails = [{ image: 'assets/img/all-images/testimonial-img1.png', aosDuration: 600 },
    { image: 'assets/img/all-images/testimonial-img5.png', aosDuration: 800 },
    { image: 'assets/img/all-images/testimonial-img3.png', aosDuration: 1000 },
    { image: 'assets/img/all-images/testimonial-img4.png', aosDuration: 1200 },
    { image: 'assets/img/all-images/testimonial-img1.png', aosDuration: 1400 },
    { image: 'assets/img/all-images/testimonial-img5.png' },
    { image: 'assets/img/all-images/testimonial-img5.png' },
    { image: 'assets/img/all-images/testimonial-img3.png' },
    { image: 'assets/img/all-images/testimonial-img4.png' },
    { image: 'assets/img/all-images/testimonial-img3.png' },
    { image: 'assets/img/all-images/testimonial-img4.png' },
    { image: 'assets/img/all-images/testimonial-img1.png' },
    { image: 'assets/img/all-images/testimonial-img5.png' },
    { image: 'assets/img/all-images/testimonial-img3.png' },
    { image: 'assets/img/all-images/testimonial-img4.png' },]
}
