import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseLeftComponent } from './case-left.component';

describe('CaseLeftComponent', () => {
  let component: CaseLeftComponent;
  let fixture: ComponentFixture<CaseLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
