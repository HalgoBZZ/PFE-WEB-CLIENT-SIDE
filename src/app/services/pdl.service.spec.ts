import { TestBed, inject } from '@angular/core/testing';

import { PdlService } from './pdl.service';

describe('PdlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdlService]
    });
  });

  it('should be created', inject([PdlService], (service: PdlService) => {
    expect(service).toBeTruthy();
  }));
});
