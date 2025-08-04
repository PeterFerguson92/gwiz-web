import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavItem2Component } from './mobile-nav-item-2.component';

describe('MobileNavItem2Component', () => {
  let component: MobileNavItem2Component;
  let fixture: ComponentFixture<MobileNavItem2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavItem2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNavItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
