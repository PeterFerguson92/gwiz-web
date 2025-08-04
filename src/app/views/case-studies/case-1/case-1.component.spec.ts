import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Case1Component } from './case-1.component';

describe('Case1Component', () => {
  let component: Case1Component;
  let fixture: ComponentFixture<Case1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Case1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Case1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
