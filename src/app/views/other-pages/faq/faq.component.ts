import { Component } from '@angular/core';
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import type { FAQType } from '@/types';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-faq',
    imports: [BreadcrumbComponent, NgbAccordionModule, CommonModule],
    templateUrl: './faq.component.html',
    styles: ``
})
export class FaqComponent {
    faqData1: FAQType[] = [
        {
            question: 'How do I sign up for your electricity services?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'What types of electricity plans do you offer?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'What are your billing and payment options?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'How can I track my energy usage with your services?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'What are your billing and payment options?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        }
    ]

    faqData2: FAQType[] = [
        {
            question: 'How do I sign up for your electricity services?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'What types of electricity plans do you offer?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'What are your billing and payment options?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'How can I track my energy usage with your services?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        },
        {
            question: 'What are your billing and payment options?',
            answer: "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives."
        }
    ]
}
