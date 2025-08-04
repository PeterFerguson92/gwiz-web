import { Component } from '@angular/core';
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import { caseStudies } from '../data';
import { CommonModule } from '@angular/common';
import { CaseStudyCardComponent } from "../../../components/cards/case-study-card/case-study-card.component";
import { PaginationComponent } from "../../../components/pagination/pagination.component";

@Component({
    selector: 'app-case-1',
    imports: [BreadcrumbComponent, CommonModule, CaseStudyCardComponent, PaginationComponent],
    templateUrl: './case-1.component.html',
    styles: ``
})
export class Case1Component {
    caseStudies = caseStudies
}
