import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { PricingPlanType } from '@/types';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pricing-card',
    imports: [CommonModule,RouterLink],
    templateUrl: './pricing-card.component.html',
    styles: ``
})
export class PricingCardComponent {
    @Input() plan!: PricingPlanType;
    @Input() isMonthly!: boolean;
}
