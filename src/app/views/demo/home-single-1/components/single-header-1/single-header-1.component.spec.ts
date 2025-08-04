import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHeader1Component } from './single-header-1.component';

describe('SingleHeader1Component', () => {
  let component: SingleHeader1Component;
  let fixture: ComponentFixture<SingleHeader1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleHeader1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleHeader1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
