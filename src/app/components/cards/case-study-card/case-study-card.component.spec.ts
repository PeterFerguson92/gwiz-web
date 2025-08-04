import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyCardComponent } from './case-study-card.component';

describe('CaseStudyCardComponent', () => {
  let component: CaseStudyCardComponent;
  let fixture: ComponentFixture<CaseStudyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
