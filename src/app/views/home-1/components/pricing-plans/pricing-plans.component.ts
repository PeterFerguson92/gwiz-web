import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PricingCardComponent } from '@app/components/cards/pricing-card/pricing-card.component';

import { pricingPlans } from '@/assets/data';

@Component({
  selector: 'app-pricing-plans',
  imports: [CommonModule, PricingCardComponent],
  templateUrl: './pricing-plans.component.html',
  styles: ``,
})
export class PricingPlansComponent {
  isMonthly = true;
  pricingPlans = pricingPlans;

  togglePlan(): void {
    this.isMonthly = !this.isMonthly;
  }
}
