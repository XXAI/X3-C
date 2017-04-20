/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntradasService } from './entradas.service';

describe('EntradasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntradasService]
    });
  });

  it('should ...', inject([EntradasService], (service: EntradasService) => {
    expect(service).toBeTruthy();
  }));
});
