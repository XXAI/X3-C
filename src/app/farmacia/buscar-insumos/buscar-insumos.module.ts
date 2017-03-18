import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscarInsumosComponent } from './buscar-insumos.component';

import { BuscarInsumosService } from './buscar-insumos.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BuscarInsumosComponent
  ],
  declarations: [BuscarInsumosComponent],
  providers: [BuscarInsumosService]
})
export class BuscarInsumosModule { }
