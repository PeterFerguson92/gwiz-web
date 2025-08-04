import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team2Component } from './team-2.component';

describe('Team2Component', () => {
  let component: Team2Component;
  let fixture: ComponentFixture<Team2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Team2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
