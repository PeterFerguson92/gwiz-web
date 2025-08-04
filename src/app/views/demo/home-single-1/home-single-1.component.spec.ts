import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSingle1Component } from './home-single-1.component';

describe('HomeSingle1Component', () => {
  let component: HomeSingle1Component;
  let fixture: ComponentFixture<HomeSingle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSingle1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSingle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
