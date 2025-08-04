import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Service1Component } from './service-1.component';

describe('Service1Component', () => {
  let component: Service1Component;
  let fixture: ComponentFixture<Service1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Service1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Service1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
