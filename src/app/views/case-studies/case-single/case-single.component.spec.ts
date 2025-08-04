import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSingleComponent } from './case-single.component';

describe('CaseSingleComponent', () => {
  let component: CaseSingleComponent;
  let fixture: ComponentFixture<CaseSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
