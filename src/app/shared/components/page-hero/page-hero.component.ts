import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss'],
})
export class PageHeroComponent {
  @Input() title = '';
  @Input() breadcrumbTitle?: string;

  /** Background hero image */
  @Input() backgroundImage?: string;

  /** Used when no class image provided */
  readonly fallbackImage = 'assets/img/placeholder.jpg';

  /** Computed final image */
  get heroImage(): string {
    console.log('heroImage', this.backgroundImage, this.fallbackImage);
    return this.backgroundImage || this.fallbackImage;
  }
}
