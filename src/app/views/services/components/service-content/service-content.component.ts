import type { FAQType } from '@/types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-content',
  imports: [NgbAccordionModule,CommonModule],
  templateUrl: './service-content.component.html',
  styles: ``
})
export class ServiceContentComponent {
    faqs: FAQType[] = [
        {
            question: "How can I contact customer support if I have further questions?",
            answer: "We're your trusted partner in all things electrical. From initial consultation to ongoing support, we're committed to providing you with the highest level"
        },
        {
            question: "Do you offer any discounts or promotions for new customers?",
            answer: "We're your trusted partner in all things electrical. From initial consultation to ongoing support, we're committed to providing you with the highest level"
        },
        {
            question: "How long does it take to set up electricity services with your company?",
            answer: "We're your trusted partner in all things electrical. From initial consultation to ongoing support, we're committed to providing you with the highest level"
        },
        {
            question: "Can I switch to your services if I'm already with another provider?",
            answer: "We're your trusted partner in all things electrical. From initial consultation to ongoing support, we're committed to providing you with the highest level"
        },
        {
            question: "What happens if there's a power outage?",
            answer: "We're your trusted partner in all things electrical. From initial consultation to ongoing support, we're committed to providing you with the highest level"
        },
        {
            question: "What types of electricity plans do you offer?",
            answer: "We're your trusted partner in all things electrical. From initial consultation to ongoing support, we're committed to providing you with the highest level"
        }
    ];
}
