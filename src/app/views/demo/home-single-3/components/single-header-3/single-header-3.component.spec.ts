import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHeader3Component } from './single-header-3.component';

describe('SingleHeader3Component', () => {
  let component: SingleHeader3Component;
  let fixture: ComponentFixture<SingleHeader3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleHeader3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleHeader3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
