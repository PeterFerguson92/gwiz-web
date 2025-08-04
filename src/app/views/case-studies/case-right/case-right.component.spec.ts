import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRightComponent } from './case-right.component';

describe('CaseRightComponent', () => {
  let component: CaseRightComponent;
  let fixture: ComponentFixture<CaseRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
