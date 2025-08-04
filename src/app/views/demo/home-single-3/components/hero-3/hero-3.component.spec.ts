import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero3Component } from './hero-3.component';

describe('Hero3Component', () => {
  let component: Hero3Component;
  let fixture: ComponentFixture<Hero3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hero3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
