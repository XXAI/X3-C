import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministradorCentralModule } from '../administrador-central.module';
import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { BuscarUnidadesMedicasModule  } from "../buscar-unidades-medicas/buscar-unidades-medicas.module";

import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { ResumenComponent } from './resumen/resumen.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { AjustesComponent } from './ajustes/ajustes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,   
    BuscarUnidadesMedicasModule,
    AdministradorCentralModule,
    PresupuestoRoutingModule
  ],
  declarations: [ResumenComponent, NuevoComponent, AjustesComponent]
})
export class PresupuestoModule { }
