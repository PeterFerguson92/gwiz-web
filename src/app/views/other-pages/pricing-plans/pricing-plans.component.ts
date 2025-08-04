import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { PricingPlan1Component } from "../../../components/pricing/pricing-plan-1/pricing-plan-1.component";
import { PricingPlan2Component } from "../../../components/pricing/pricing-plan-2/pricing-plan-2.component";

@Component({
  selector: 'app-pricing-plans',
  imports: [BreadcrumbComponent, PricingPlan1Component, PricingPlan2Component],
  templateUrl: './pricing-plans.component.html',
  styles: ``
})
export class PricingPlansComponent {

}
