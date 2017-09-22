import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { BuscarInsumosModule } from '../buscar-insumos/buscar-insumos.module';
import { IndexFarmaciaModule } from '../index-farmacia/index-farmacia.module';

import { TransferenciaAlmacenRoutingModule } from './transferencia-almacen-routing.module';
import { TransferenciaAlmacenService } from './transferencia-almacen.service';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    BuscarInsumosModule,
    IndexFarmaciaModule,
    TransferenciaAlmacenRoutingModule
  ],
  declarations: [ListaComponent, FormularioComponent, MenuLateralComponent],
  providers:[TransferenciaAlmacenService]
})
export class TransferenciaAlmacenModule { }