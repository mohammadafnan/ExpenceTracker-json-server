import { TestBed } from '@angular/core/testing';

import { ExtrackerService } from './extracker.service';

describe('ExtrackerService', () => {
  let service: ExtrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
