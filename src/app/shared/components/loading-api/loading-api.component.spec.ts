import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingApiComponent } from './loading-api.component';

describe('LoadingApiComponent', () => {
  let component: LoadingApiComponent;
  let fixture: ComponentFixture<LoadingApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
