import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferenciaAlmacenRoutingModule } from './transferencia-almacen-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  imports: [
    CommonModule,
    TransferenciaAlmacenRoutingModule
  ],
  declarations: [ListaComponent, FormularioComponent]
})
export class TransferenciaAlmacenModule { }
