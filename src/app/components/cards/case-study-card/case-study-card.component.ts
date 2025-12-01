import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { CaseStudyType } from '@/types';

@Component({
  selector: 'app-case-study-card',
  imports: [RouterLink],
  templateUrl: './case-study-card.component.html',
  styles: ``,
})
export class CaseStudyCardComponent {
  @Input() case!: CaseStudyType;
}
