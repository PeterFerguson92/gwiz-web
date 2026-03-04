import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss'],
})
export class PageHeroComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() breadcrumbTitle?: string;

  /** Optional background image (e.g. class image) */
  @Input() backgroundImage?: string;

  /** Fallback if no image passed */
  readonly fallbackImage = 'assets/img/placeholder.jpg';

  /** Whether page has been scrolled a bit (for subtle animation) */
  scrolled = false;
  private cacheNonce = '';
  private resolvedHeroImage = this.fallbackImage;

  get heroImage(): string {
    return this.resolvedHeroImage;
  }

  ngOnInit(): void {
    this.refreshHeroImage();
    this.updateScrollState();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.refreshHeroImage();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    this.scrolled = window.scrollY > 10;
  }

  private refreshHeroImage(): void {
    const image = this.backgroundImage || this.fallbackImage;
    this.cacheNonce = `${Date.now()}`;
    this.resolvedHeroImage = this.shouldBypassCache(image)
      ? this.appendCacheNonce(image, this.cacheNonce)
      : image;
  }

  private shouldBypassCache(imageUrl: string): boolean {
    if (!imageUrl) return false;
    if (imageUrl.startsWith('assets/') || imageUrl.startsWith('/assets/')) return false;
    return imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/');
  }

  private appendCacheNonce(imageUrl: string, nonce: string): string {
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}v=${nonce}`;
  }
}
