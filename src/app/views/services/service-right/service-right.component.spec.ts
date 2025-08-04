import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRightComponent } from './service-right.component';

describe('ServiceRightComponent', () => {
  let component: ServiceRightComponent;
  let fixture: ComponentFixture<ServiceRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
