import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styles: ``
})
export class ScrollToTopComponent {
    progress = 0;
    scrollY = 0;
  
    @HostListener('window:scroll', [])
    onWindowScroll() {
      this.scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.progress = (window.scrollY / docHeight) * 100;
    }
  
    goToTop(): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    get strokeDashoffset(): number {
      const dashArray = 307;
      return dashArray - (this.progress / 100) * dashArray;
    }
}
