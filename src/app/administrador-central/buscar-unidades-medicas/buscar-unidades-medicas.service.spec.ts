import { TestBed, inject } from '@angular/core/testing';

import { BuscarUnidadesMedicasService } from './buscar-unidades-medicas.service';

describe('BuscarUnidadesMedicasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscarUnidadesMedicasService]
    });
  });

  it('should be created', inject([BuscarUnidadesMedicasService], (service: BuscarUnidadesMedicasService) => {
    expect(service).toBeTruthy();
  }));
});
