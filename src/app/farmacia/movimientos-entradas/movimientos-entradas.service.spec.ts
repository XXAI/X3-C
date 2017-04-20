import { TestBed, inject } from '@angular/core/testing';

import { MovimientosEntradasService } from './movimientos-entradas.service';

describe('MovimientosEntradasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimientosEntradasService]
    });
  });

  it('should ...', inject([MovimientosEntradasService], (service: MovimientosEntradasService) => {
    expect(service).toBeTruthy();
  }));
});
