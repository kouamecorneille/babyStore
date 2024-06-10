import { TestBed } from '@angular/core/testing';

import { InterceptorResponseService } from './interceptor-response.service';

describe('InterceptorResponseService', () => {
  let service: InterceptorResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
