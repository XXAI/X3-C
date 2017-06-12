import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { IndexFarmaciaModule } from '../index-farmacia/index-farmacia.module';
import { BuscarInsumosModule } from '../buscar-insumos/buscar-insumos.module';

import { ClavesBasicasRoutingModule } from './claves-basicas-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClavesBasicasRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule, 
    IndexFarmaciaModule,
    BuscarInsumosModule
  ],
  declarations: [ListaComponent, FormularioComponent]
})
export class ClavesBasicasModule { }
