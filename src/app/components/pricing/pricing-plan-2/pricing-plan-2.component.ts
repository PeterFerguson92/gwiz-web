import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-pricing-plan-2',
    imports: [CommonModule],
    templateUrl: './pricing-plan-2.component.html',
    styles: ``
})
export class PricingPlan2Component {
    isMonthly = true;
    planPrice = [{ monthlyPrice: 29, yearlyPrice: 99, },
    { monthlyPrice: 99, yearlyPrice: 299, },
    { monthlyPrice: 199, yearlyPrice: 499, },
    ]

    togglePlan(): void {
        this.isMonthly = !this.isMonthly;
    }
}
