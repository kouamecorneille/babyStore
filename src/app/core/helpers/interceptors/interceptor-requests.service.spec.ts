import { TestBed } from '@angular/core/testing';

import { InterceptorRequestsService } from './interceptor-requests.service';

describe('InterceptorRequestsService', () => {
  let service: InterceptorRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
