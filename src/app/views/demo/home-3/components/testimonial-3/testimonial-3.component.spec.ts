import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial3Component } from './testimonial-3.component';

describe('Testimonial3Component', () => {
  let component: Testimonial3Component;
  let fixture: ComponentFixture<Testimonial3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testimonial3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
