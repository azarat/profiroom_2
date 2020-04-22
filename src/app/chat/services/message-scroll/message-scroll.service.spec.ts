import { TestBed } from '@angular/core/testing';
import { MessageScrollService } from './message-scroll.service';



describe('MessageScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageScrollService = TestBed.get(MessageScrollService);
    expect(service).toBeTruthy();
  });
});
