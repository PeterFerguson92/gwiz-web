import { Component, Input } from '@angular/core';
import { pricingPlans } from '@/assets/data';
import { PricingCardComponent } from '@app/components/cards/pricing-card/pricing-card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pricing-plan-1',
    imports: [PricingCardComponent, CommonModule],
    templateUrl: './pricing-plan-1.component.html',
    styles: ``
})
export class PricingPlan1Component {
    isMonthly = true;
    pricingPlans = pricingPlans
    @Input() class?: string;

    togglePlan(): void {
        this.isMonthly = !this.isMonthly;
    }
}
