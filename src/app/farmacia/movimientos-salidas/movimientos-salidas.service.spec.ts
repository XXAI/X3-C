import { TestBed, inject } from '@angular/core/testing';

import { MovimientosSalidasService } from './movimientos-salidas.service';

describe('MovimientosEntradasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimientosSalidasService]
    });
  });

  it('should ...', inject([MovimientosSalidasService], (service: MovimientosSalidasService) => {
    expect(service).toBeTruthy();
  }));
});
