import { TestBed, inject } from '@angular/core/testing';

import { ReleveService } from './releve.service';

describe('ReleveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleveService]
    });
  });

  it('should be created', inject([ReleveService], (service: ReleveService) => {
    expect(service).toBeTruthy();
  }));
});
