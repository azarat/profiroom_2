import { TestBed } from '@angular/core/testing';

import { UserFinanceService } from './user-finance.service';

describe('UserFinanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFinanceService = TestBed.get(UserFinanceService);
    expect(service).toBeTruthy();
  });
});
