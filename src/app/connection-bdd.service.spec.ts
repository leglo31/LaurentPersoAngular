import { TestBed } from '@angular/core/testing';

import { ConnectionBddService } from './connection-bdd.service';

describe('ConnectionBddService', () => {
  let service: ConnectionBddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionBddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
