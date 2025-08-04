import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavItemComponent } from './mobile-nav-item.component';

describe('MobileNavItemComponent', () => {
  let component: MobileNavItemComponent;
  let fixture: ComponentFixture<MobileNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
