import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSingle4Component } from './home-single-4.component';

describe('HomeSingle4Component', () => {
  let component: HomeSingle4Component;
  let fixture: ComponentFixture<HomeSingle4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSingle4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSingle4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
