import { TestBed } from '@angular/core/testing';

import { ClienteAngTService } from './cliente-ang-t.service';

describe('ClienteAngTService', () => {
  let service: ClienteAngTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteAngTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
