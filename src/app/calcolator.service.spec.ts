import { TestBed } from '@angular/core/testing';

import { CalcolatorService } from './calcolator.service';

describe('CalcolatorService', () => {
  let service: CalcolatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcolatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
