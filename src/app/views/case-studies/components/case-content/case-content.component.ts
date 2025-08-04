import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { caseFaqs } from '@views/case-studies/data';

@Component({
    selector: 'app-case-content',
    imports: [NgbAccordionModule,CommonModule],
    templateUrl: './case-content.component.html',
    styles: ``
})
export class CaseContentComponent {
    faqs = caseFaqs
}
