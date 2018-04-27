import { TestBed, inject } from '@angular/core/testing';

import { ReleveurService } from './releveur.service';

describe('ReleveurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleveurService]
    });
  });

  it('should be created', inject([ReleveurService], (service: ReleveurService) => {
    expect(service).toBeTruthy();
  }));
});
