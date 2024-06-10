import { TestBed } from '@angular/core/testing';

import { CrytodataService } from './crytodata.service';

describe('CrytodataService', () => {
  let service: CrytodataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrytodataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
