import { TestBed } from '@angular/core/testing';

import { FitnessClassService } from './fitness-class.service';

describe('FitnessClassService', () => {
  let service: FitnessClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
