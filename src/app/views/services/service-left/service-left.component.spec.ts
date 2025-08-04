import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLeftComponent } from './service-left.component';

describe('ServiceLeftComponent', () => {
  let component: ServiceLeftComponent;
  let fixture: ComponentFixture<ServiceLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
