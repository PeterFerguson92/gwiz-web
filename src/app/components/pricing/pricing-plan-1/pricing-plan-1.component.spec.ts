import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlan1Component } from './pricing-plan-1.component';

describe('PricingPlan1Component', () => {
  let component: PricingPlan1Component;
  let fixture: ComponentFixture<PricingPlan1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPlan1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingPlan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
