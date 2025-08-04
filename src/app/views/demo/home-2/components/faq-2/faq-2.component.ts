import { Component } from '@angular/core';
import { faqs } from '../data';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-faq-2',
    imports: [NgbAccordionModule,CommonModule],
    templateUrl: './faq-2.component.html',
    styles: ``
})
export class Faq2Component {
    faqs = faqs
}
