import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCasesComponent } from './more-cases.component';

describe('MoreCasesComponent', () => {
  let component: MoreCasesComponent;
  let fixture: ComponentFixture<MoreCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
