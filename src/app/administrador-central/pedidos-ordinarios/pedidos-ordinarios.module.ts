import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministradorCentralModule } from '../administrador-central.module';
import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';
import { BuscarUnidadesMedicasModule  } from "../buscar-unidades-medicas/buscar-unidades-medicas.module";

import { PedidosOrdinariosRoutingModule } from './pedidos-ordinarios-routing.module';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { VerComponent } from './ver/ver.component';
import { UIModule } from 'app/ui/ui.module';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';

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
    PedidosOrdinariosRoutingModule,
    BuscarUnidadesMedicasModule,
    UIModule,
  ],
  declarations: [ListaComponent, NuevoComponent, VerComponent, SolicitudesComponent]
})
export class PedidosOrdinariosModule { }
