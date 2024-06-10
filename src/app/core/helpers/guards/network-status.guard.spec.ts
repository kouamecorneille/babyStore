import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { networkStatusGuard } from './network-status.guard';

describe('networkStatusGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => networkStatusGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
