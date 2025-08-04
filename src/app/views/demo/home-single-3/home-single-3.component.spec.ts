import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSingle3Component } from './home-single-3.component';

describe('HomeSingle3Component', () => {
  let component: HomeSingle3Component;
  let fixture: ComponentFixture<HomeSingle3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSingle3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSingle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
