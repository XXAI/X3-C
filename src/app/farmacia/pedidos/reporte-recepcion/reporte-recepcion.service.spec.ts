import { TestBed, inject } from '@angular/core/testing';

import { ReporteRecepcionService } from './reporte-recepcion.service';

describe('ReporteRecepcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReporteRecepcionService]
    });
  });

  it('should be created', inject([ReporteRecepcionService], (service: ReporteRecepcionService) => {
    expect(service).toBeTruthy();
  }));
});
