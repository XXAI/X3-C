import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacionModule } from '../../paginacion/paginacion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuscarInsumosComponent } from './buscar-insumos-movimientos.component';

import { BuscarInsumosService } from './buscar-insumos-movimientos.service';

@NgModule({
  imports: [
    CommonModule,
    PaginacionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BuscarInsumosComponent
  ],
  declarations: [BuscarInsumosComponent],
  providers: [BuscarInsumosService]
})
export class BuscarInsumosMovimientosModule { }
