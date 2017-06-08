import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { BuscarInsumosMovimientosModule } from '../buscar-insumos-movimientos/buscar-insumos-movimientos.module';
import { IndexFarmaciaModule } from '../index-farmacia/index-farmacia.module';
import { MovimientosEntradasRoutingModule } from './movimientos-entradas-routing.module';

import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditarComponent} from'./editar/editar.component';
import { FormComponent  } from './form/form.component';
import { FormDatosComponent   }  from  './form/form-datos.component';
import { FormInsumosComponent }  from  './form/form-insumos.component';
import { MenuLateralComponent } from  './menu-lateral/menu-lateral.component';

@NgModule({
  imports: [
    CommonModule,
    MovimientosEntradasRoutingModule,
    IndexFarmaciaModule,
    PaginacionModule,
    FormsModule,
    NguiDatetimePickerModule,
    ReactiveFormsModule,
    BuscarInsumosMovimientosModule
  ],
  declarations: [
    ListaComponent,
    NuevoComponent,
    EditarComponent,
    FormComponent,
    FormDatosComponent,
    FormInsumosComponent,
    MenuLateralComponent
  ]
})
export class MovimientosEntradasModule { }
