import { TestBed, inject } from '@angular/core/testing';

import { PedidosOrdinariosService } from './pedidos-ordinarios.service';

describe('PedidosOrdinariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PedidosOrdinariosService]
    });
  });

  it('should be created', inject([PedidosOrdinariosService], (service: PedidosOrdinariosService) => {
    expect(service).toBeTruthy();
  }));
});
