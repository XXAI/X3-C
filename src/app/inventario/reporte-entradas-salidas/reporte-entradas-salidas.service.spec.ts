import { TestBed, inject } from '@angular/core/testing';

import { ReporteEntradasSalidasService } from './reporte-entradas-salidas.service';

describe('ReporteEntradasSalidasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReporteEntradasSalidasService]
    });
  });

  it('should be created', inject([ReporteEntradasSalidasService], (service: ReporteEntradasSalidasService) => {
    expect(service).toBeTruthy();
  }));
});
