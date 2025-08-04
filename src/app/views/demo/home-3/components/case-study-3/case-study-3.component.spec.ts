import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudy3Component } from './case-study-3.component';

describe('CaseStudy3Component', () => {
  let component: CaseStudy3Component;
  let fixture: ComponentFixture<CaseStudy3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudy3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudy3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
