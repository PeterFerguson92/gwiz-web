import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Service3Component } from './service-3.component';

describe('Service3Component', () => {
  let component: Service3Component;
  let fixture: ComponentFixture<Service3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Service3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Service3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
