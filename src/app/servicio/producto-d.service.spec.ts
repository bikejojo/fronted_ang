import { TestBed } from '@angular/core/testing';

import { ProductoDService } from './producto-d.service';

describe('ProductoDService', () => {
  let service: ProductoDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
