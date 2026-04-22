import { TestBed } from '@angular/core/testing';

import { SrvicesService } from './srvices.service';

describe('SrvicesService', () => {
  let service: SrvicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
