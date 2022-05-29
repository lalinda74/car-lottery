import { TestBed } from '@angular/core/testing';

import { SuccessRouterGuardService } from './success-router-guard.service';

describe('SuccessRouterGuardService', () => {
  let service: SuccessRouterGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessRouterGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
