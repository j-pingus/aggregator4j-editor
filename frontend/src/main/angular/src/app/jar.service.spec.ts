import { TestBed } from '@angular/core/testing';

import { JarService } from './jar.service';

describe('JarService', () => {
  let service: JarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
