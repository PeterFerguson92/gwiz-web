import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { caseStudies } from '@views/case-studies/data';
import { CaseStudyCardComponent } from "../../../../components/cards/case-study-card/case-study-card.component";

@Component({
    selector: 'app-more-cases',
    imports: [CommonModule, CaseStudyCardComponent],
    templateUrl: './more-cases.component.html',
    styles: ``
})
export class MoreCasesComponent {
    caseStudies = caseStudies
}
