import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { faqs } from '../data';

@Component({
  selector: 'app-faq-2',
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './faq-2.component.html',
  styles: ``,
})
export class Faq2Component {
  faqs = faqs;
}
