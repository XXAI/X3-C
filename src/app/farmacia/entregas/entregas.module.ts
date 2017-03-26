import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';


import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { BuscarInsumosModule } from '../buscar-insumos/buscar-insumos.module';
import { IndexFarmaciaModule } from '../index-farmacia/index-farmacia.module';

import { EntregasRoutingModule } from './entregas-routing.module';
import { ListaComponent } from './lista/lista.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    BuscarInsumosModule,
    IndexFarmaciaModule,
    EntregasRoutingModule
  ],
  declarations: [ListaComponent, MenuLateralComponent]
})
export class EntregasModule { }
