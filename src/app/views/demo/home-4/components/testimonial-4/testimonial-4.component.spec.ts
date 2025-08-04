import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial4Component } from './testimonial-4.component';

describe('Testimonial4Component', () => {
  let component: Testimonial4Component;
  let fixture: ComponentFixture<Testimonial4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testimonial4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
