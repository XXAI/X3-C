import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministradorCentralModule } from '../administrador-central.module';
import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { PedidosOrdinariosRoutingModule } from './pedidos-ordinarios-routing.module';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,  
    AdministradorCentralModule,
    PedidosOrdinariosRoutingModule
  ],
  declarations: [ListaComponent]
})
export class PedidosOrdinariosModule { }
