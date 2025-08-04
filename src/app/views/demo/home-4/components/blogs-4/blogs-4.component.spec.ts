import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blogs4Component } from './blogs-4.component';

describe('Blogs4Component', () => {
  let component: Blogs4Component;
  let fixture: ComponentFixture<Blogs4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blogs4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blogs4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
