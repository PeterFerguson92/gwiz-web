import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blogs3Component } from './blogs-3.component';

describe('Blogs3Component', () => {
  let component: Blogs3Component;
  let fixture: ComponentFixture<Blogs3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blogs3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blogs3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
