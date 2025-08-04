import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseContentComponent } from './case-content.component';

describe('CaseContentComponent', () => {
  let component: CaseContentComponent;
  let fixture: ComponentFixture<CaseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
