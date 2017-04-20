import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { BuscarInsumosMovimientosModule } from '../buscar-insumos-movimientos/buscar-insumos-movimientos.module';
import { IndexFarmaciaModule } from '../index-farmacia/index-farmacia.module';
import { MovimientosSalidasRoutingModule } from './movimientos-salidas-routing.module';

import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { FormComponent  } from './form/form.component';
import { FormDatosComponent   }  from  './form/form-datos.component';
import { FormInsumosComponent }  from  './form/form-insumos.component';

@NgModule({
  imports: [
    CommonModule,
    MovimientosSalidasRoutingModule,
    IndexFarmaciaModule,
    PaginacionModule,
    FormsModule,
    ReactiveFormsModule,
    BuscarInsumosMovimientosModule
  ],
  declarations: [
    ListaComponent,
    NuevoComponent,
    FormComponent,
    FormDatosComponent,
    FormInsumosComponent
  ]
})
export class MovimientosSalidasModule { }
