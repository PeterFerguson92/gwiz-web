import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallbackImage]',
  standalone: true,
})
export class FallbackImageDirective {
  /** The fallback image path */
  @Input('appFallbackImage') fallbackSrc: string = 'assets/img/placeholder.jpg';

  /** If the image errors, replace with fallback */
  @HostListener('error', ['$event'])
  onError(event: Event) {
    const element = event.target as HTMLImageElement;

    if (element.src !== this.fallbackSrc) {
      element.src = this.fallbackSrc;
    }
  }
}
