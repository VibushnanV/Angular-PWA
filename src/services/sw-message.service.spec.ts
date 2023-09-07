import { TestBed } from '@angular/core/testing';

import { SwMessageService } from './sw-message.service';

describe('SwMessageService', () => {
  let service: SwMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
