import { TestBed, inject } from '@angular/core/testing';

import { ResponsableService } from './responsable.service';

describe('ResponsableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponsableService]
    });
  });

  it('should be created', inject([ResponsableService], (service: ResponsableService) => {
    expect(service).toBeTruthy();
  }));
});
