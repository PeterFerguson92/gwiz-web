import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHeader2Component } from './single-header-2.component';

describe('SingleHeader2Component', () => {
  let component: SingleHeader2Component;
  let fixture: ComponentFixture<SingleHeader2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleHeader2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleHeader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
