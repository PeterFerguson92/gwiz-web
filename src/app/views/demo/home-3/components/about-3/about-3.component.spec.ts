import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About3Component } from './about-3.component';

describe('About3Component', () => {
  let component: About3Component;
  let fixture: ComponentFixture<About3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(About3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
