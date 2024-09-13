import { TestBed } from '@angular/core/testing';

import { ClienteAngService } from './cliente-ang.service';

describe('ClienteAngService', () => {
  let service: ClienteAngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteAngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
