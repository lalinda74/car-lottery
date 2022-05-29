import { TestBed } from '@angular/core/testing';

import { ImageRouterGuardService } from './image-router-guard.service';

describe('ImageRouterGuardService', () => {
  let service: ImageRouterGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageRouterGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
