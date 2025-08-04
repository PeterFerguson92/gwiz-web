import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHeader4Component } from './single-header-4.component';

describe('SingleHeader4Component', () => {
  let component: SingleHeader4Component;
  let fixture: ComponentFixture<SingleHeader4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleHeader4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleHeader4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
