import { TestBed, inject } from '@angular/core/testing';

import { PlanificationService } from './planification.service';

describe('PlanificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanificationService]
    });
  });

  it('should be created', inject([PlanificationService], (service: PlanificationService) => {
    expect(service).toBeTruthy();
  }));
});
