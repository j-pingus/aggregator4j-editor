import { TestBed } from '@angular/core/testing';

import { JarServiceService } from './jar-service.service';

describe('JarServiceService', () => {
  let service: JarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
