import { TestBed, inject } from '@angular/core/testing';

import { TourneeService } from './tournee.service';

describe('TourneeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourneeService]
    });
  });

  it('should be created', inject([TourneeService], (service: TourneeService) => {
    expect(service).toBeTruthy();
  }));
});
