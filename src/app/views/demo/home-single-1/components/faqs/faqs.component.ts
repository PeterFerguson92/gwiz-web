import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { faqData } from '../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faqs',
  imports: [NgbAccordionModule,CommonModule,RouterLink],
  templateUrl: './faqs.component.html',
  styles: ``
})
export class FaqsComponent {
    faqData=faqData
}
