import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { BuscarInsumosModule } from '../buscar-insumos/buscar-insumos.module';
import { IndexFarmaciaModule } from '../index-farmacia/index-farmacia.module';

import { EntradasRoutingModule } from './entradas-routing.module';

//import { PedidosComponent } from './pedidos.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    BuscarInsumosModule,
    EntradasRoutingModule,
    IndexFarmaciaModule
  ],
  declarations: [MenuLateralComponent, NuevoComponent, ListaComponent]
})
export class EntradasModule { }
