import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { testimonials } from '../data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonial-2',
  imports: [CarouselModule,CommonModule,RouterLink],
  templateUrl: './testimonial-2.component.html',
  styles: ``
})
export class Testimonial2Component {
    testimonials=testimonials

    customOptions = {
        loop:true,
        margin:30,
        nav:true,
        dots:false,
        mouseDrag:true,
        items:10,
        autoplay:true,
        navText:["<i class='fa-solid fa-arrow-left'></i>" , "<i class='fa-solid fa-arrow-right'></i>"],
        smartSpeed:3000,
        autoplayTimeout:4000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true,
            },
            600:{
                items:2,
            },
            1000:{
                items:2,
            }
        }
      };
}
