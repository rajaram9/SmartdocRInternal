import { TestBed, inject } from '@angular/core/testing';

import { BatchMoveService } from './batch-move.service';

describe('BatchMoveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchMoveService]
    });
  });

  it('should ...', inject([BatchMoveService], (service: BatchMoveService) => {
    expect(service).toBeTruthy();
  }));
});
