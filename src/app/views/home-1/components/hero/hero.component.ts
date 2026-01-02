import { NgFor } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, type OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero',
  imports: [NgFor, CarouselModule, RouterLink],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent implements OnChanges {
  @Input() banner: any;
  slides: { title: any; subtitle: any; image: any }[] = [];

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
      },
    },
  };

  ngOnChanges(): void {
    if (this.banner) {
      this.slides = [1, 2, 3].map((i) => ({
        title: this.banner[`title_slide_${i}`],
        subtitle: this.banner[`subtitle_slide_${i}`],
        image: this.banner[`img_slide_${i}`],
      }));
    }
  }
}
