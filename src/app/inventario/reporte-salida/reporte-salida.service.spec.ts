import { TestBed, inject } from '@angular/core/testing';

import { ReporteSalidaService } from './reporte-salida.service';

describe('ReporteSalidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReporteSalidaService]
    });
  });

  it('should be created', inject([ReporteSalidaService], (service: ReporteSalidaService) => {
    expect(service).toBeTruthy();
  }));
});
