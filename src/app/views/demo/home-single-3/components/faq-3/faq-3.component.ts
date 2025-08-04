import { Component } from '@angular/core';
import { faqs } from '../data';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-faq-3',
    imports: [NgbAccordionModule,CommonModule],
    templateUrl: './faq-3.component.html',
    styles: ``
})
export class Faq3Component {
    faqs = faqs
}
