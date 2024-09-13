import { TestBed } from '@angular/core/testing';

import { ServiceClienteService } from './service-cliente.service';

describe('ServiceClienteService', () => {
  let service: ServiceClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
