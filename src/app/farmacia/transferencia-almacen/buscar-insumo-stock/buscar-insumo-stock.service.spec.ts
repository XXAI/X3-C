import { TestBed, inject } from '@angular/core/testing';

import { BuscarInsumoStockService } from './buscar-insumo-stock.service';

describe('BuscarInsumoStockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscarInsumoStockService]
    });
  });

  it('should be created', inject([BuscarInsumoStockService], (service: BuscarInsumoStockService) => {
    expect(service).toBeTruthy();
  }));
});
