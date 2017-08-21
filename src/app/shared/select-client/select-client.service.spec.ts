import { TestBed, inject } from '@angular/core/testing';

import { SelectClientService } from './select-client.service';

describe('SelectClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectClientService]
    });
  });

  it('should ...', inject([SelectClientService], (service: SelectClientService) => {
    expect(service).toBeTruthy();
  }));
});
