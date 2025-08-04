import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, type OwlOptions } from 'ngx-owl-carousel-o';
import { testimonials } from '../data';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-testimonial-4',
    imports: [CarouselModule, CommonModule,RouterLink],
    templateUrl: './testimonial-4.component.html',
    styles: ``
})
export class Testimonial4Component {
    testimonials = testimonials

    carouselOptions:OwlOptions={
        loop:true,
  margin:30,
  nav:false,
  dots:true,
  mouseDrag:true,
  items:10,
  autoplay:true,
  smartSpeed:2000,
  autoplayTimeout:3000,
  responsive:{
      0:{
          items:1,
          nav:false,
      },
      600:{
          items:2,
      },
      1000:{
          items:3,
      }
  }
    }
}
