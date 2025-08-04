import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSingle2Component } from './home-single-2.component';

describe('HomeSingle2Component', () => {
  let component: HomeSingle2Component;
  let fixture: ComponentFixture<HomeSingle2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSingle2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSingle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
