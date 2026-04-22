import { TestBed } from '@angular/core/testing';

import { AddressLoockupService } from './address-loockup.service';

describe('AddressLoockupService', () => {
  let service: AddressLoockupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressLoockupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
