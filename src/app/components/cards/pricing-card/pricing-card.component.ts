import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { PricingPlanType } from '@/types';

@Component({
  selector: 'app-pricing-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing-card.component.html',
  styles: ``,
})
export class PricingCardComponent {
  @Input() plan!: PricingPlanType;
  @Input() isMonthly!: boolean;
}
