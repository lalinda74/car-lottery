import { TestBed } from '@angular/core/testing';

import { PersonalDataGuardService } from './personal-data-guard.service';

describe('PersonalDataGuardService', () => {
  let service: PersonalDataGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalDataGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
