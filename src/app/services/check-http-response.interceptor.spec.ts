import { TestBed } from '@angular/core/testing';

import { CheckHttpResponseInterceptor } from './check-http-response.interceptor';

describe('CheckHttpResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CheckHttpResponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CheckHttpResponseInterceptor = TestBed.inject(CheckHttpResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
