import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { PipesModule }             from '../../pipes/pipes.module';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthService } from '../../auth.service';

import { MenuModule  } from './../menu/menu.module';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule } from '../../crud/crud.module';
//fin crud

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServiciosRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    MenuModule,
    CrudModule,
    NguiAutoCompleteModule
  ],
  declarations: [   
    FormularioComponent 
  ],
  providers: [ AuthService, CrudService ]
})
export class MisServiciosModule { }
