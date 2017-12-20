import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { BuscarInsumoStockComponent } from './buscar-insumo-stock.component';
import { BuscarInsumoStockService } from './buscar-insumo-stock.service';

@NgModule({
  imports: [
    CommonModule,
    PaginacionModule
  ],
  exports:[
    BuscarInsumoStockComponent
  ],
  declarations: [BuscarInsumoStockComponent],
  providers: [BuscarInsumoStockService]
})
export class BuscarInsumoStockModule { }