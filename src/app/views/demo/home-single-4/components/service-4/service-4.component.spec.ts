import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Service4Component } from './service-4.component';

describe('Service4Component', () => {
  let component: Service4Component;
  let fixture: ComponentFixture<Service4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Service4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Service4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
