import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSidebarComponent } from './case-sidebar.component';

describe('CaseSidebarComponent', () => {
  let component: CaseSidebarComponent;
  let fixture: ComponentFixture<CaseSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
