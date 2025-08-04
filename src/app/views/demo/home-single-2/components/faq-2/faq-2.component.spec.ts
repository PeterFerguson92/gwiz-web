import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faq2Component } from './faq-2.component';

describe('Faq2Component', () => {
  let component: Faq2Component;
  let fixture: ComponentFixture<Faq2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faq2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Faq2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
