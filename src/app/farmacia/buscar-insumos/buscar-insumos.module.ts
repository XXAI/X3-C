import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscarInsumosComponent } from './buscar-insumos.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BuscarInsumosComponent
  ],
  declarations: [BuscarInsumosComponent]
})
export class BuscarInsumosModule { }
