import { TestBed, inject } from '@angular/core/testing';

import { MesureService } from './mesure.service';

describe('MesureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MesureService]
    });
  });

  it('should be created', inject([MesureService], (service: MesureService) => {
    expect(service).toBeTruthy();
  }));
});
