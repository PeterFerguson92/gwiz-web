import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-hero-3',
  imports: [SlickCarouselModule,CountUpModule,RouterLink],
  templateUrl: './hero-3.component.html',
  styles: ``
})
export class Hero3Component {
sliderConfig={
    loop:true,
    vertical:true,
    verticalSwiping:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed:9000,
    cssEase: 'linear',
    infinite: true,
    arrows:false,
    touchMove:true,
    swipeToSlide:true,
    swipe:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
        autoplay:false,
        }
        },
        
        {
          breakpoint: 600,
          settings: {
            autoplay:false,
        }
        },
  
        {
          breakpoint: 480,
          settings: {
            autoplay:false,
            touchMove:false,
        }
        },
  
        {
          breakpoint: 375,
          settings: {
            autoplay:false,
            touchMove:false,
        }
        },
  
        {
          breakpoint: 320,
          settings: {
            autoplay:false,
            touchMove:false,
        }
        },
      ]
}

sliderConfig2={
    loop:true,
  vertical:true,
  verticalSwiping:true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed:8000,
  cssEase: 'linear',
  infinite: true,
  arrows:false,
  touchMove:true,
  swipeToSlide:true,
  swipe:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
      autoplay:false,
      }
      },
      
      {
        breakpoint: 600,
        settings: {
          autoplay:false,
      }
      },

      {
        breakpoint: 480,
        settings: {
          autoplay:false,
      }
      },

      {
        breakpoint: 375,
        settings: {
          autoplay:false,
      }
      },

      {
        breakpoint: 320,
        settings: {
          autoplay:false,
      }
      },
    ]
}
}
