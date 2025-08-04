import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonial2Component } from './testimonial-2.component';

describe('Testimonial2Component', () => {
  let component: Testimonial2Component;
  let fixture: ComponentFixture<Testimonial2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonial2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testimonial2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
