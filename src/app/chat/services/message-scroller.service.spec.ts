import { TestBed } from '@angular/core/testing';

import { MessageScrollerService } from './message-scroller.service';

describe('MessageScrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageScrollerService = TestBed.get(MessageScrollerService);
    expect(service).toBeTruthy();
  });
});
