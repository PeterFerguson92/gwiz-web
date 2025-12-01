import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { caseStudies } from '../data';

@Component({
  selector: 'app-case-study',
  imports: [CommonModule, RouterLink],
  templateUrl: './case-study.component.html',
  styles: ``,
})
export class CaseStudyComponent {
  caseStudies = caseStudies;
}
