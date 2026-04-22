import { TestBed } from '@angular/core/testing';

import { DeliverAddressServiceService } from './deliver-address-service.service';

describe('DeliverAddressServiceService', () => {
  let service: DeliverAddressServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverAddressServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
