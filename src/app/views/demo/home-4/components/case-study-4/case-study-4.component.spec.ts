import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudy4Component } from './case-study-4.component';

describe('CaseStudy4Component', () => {
  let component: CaseStudy4Component;
  let fixture: ComponentFixture<CaseStudy4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudy4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudy4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
