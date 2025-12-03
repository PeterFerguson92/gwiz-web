import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';

import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss'],
})
export class PageHeroComponent implements OnInit {
  @Input() title = '';
  @Input() breadcrumbTitle?: string;

  /** Optional background image (e.g. class image) */
  @Input() backgroundImage?: string;

  /** Fallback if no image passed */
  readonly fallbackImage = 'assets/img/placeholder.jpg';

  /** Whether page has been scrolled a bit (for subtle animation) */
  scrolled = false;

  get heroImage(): string {
    return this.backgroundImage || this.fallbackImage;
  }

  ngOnInit(): void {
    this.updateScrollState();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    this.scrolled = window.scrollY > 10;
  }
}
