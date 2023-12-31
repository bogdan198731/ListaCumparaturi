import { TestBed } from '@angular/core/testing';

import { LucruCuJsonService } from './operatiuniLista';

describe('LucruCuJsonService', () => {
  let service: LucruCuJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LucruCuJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
