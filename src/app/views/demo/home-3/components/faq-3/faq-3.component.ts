import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { faqs } from '../data';

@Component({
  selector: 'app-faq-3',
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './faq-3.component.html',
  styles: ``,
})
export class Faq3Component {
  faqs = faqs;
}
