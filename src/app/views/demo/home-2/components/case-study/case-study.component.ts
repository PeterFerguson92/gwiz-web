import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { caseStudies } from '../data';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-case-study',
    imports: [CommonModule,RouterLink],
    templateUrl: './case-study.component.html',
    styles: ``
})
export class CaseStudyComponent {
    caseStudies = caseStudies
}
