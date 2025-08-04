import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsSidebarComponent } from './blogs-sidebar.component';

describe('BlogsSidebarComponent', () => {
  let component: BlogsSidebarComponent;
  let fixture: ComponentFixture<BlogsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
