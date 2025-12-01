import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';

import { CaseStudyCardComponent } from '../../../components/cards/case-study-card/case-study-card.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { caseStudies } from '../data';

@Component({
  selector: 'app-case-1',
  imports: [BreadcrumbComponent, CommonModule, CaseStudyCardComponent, PaginationComponent],
  templateUrl: './case-1.component.html',
  styles: ``,
})
export class Case1Component {
  caseStudies = caseStudies;
}
