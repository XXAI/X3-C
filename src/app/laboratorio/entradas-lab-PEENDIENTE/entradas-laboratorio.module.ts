import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { EntradaslaboratorioRoutingModule } from './entradas-laboratorio-routing.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { PipesModule }             from '../../pipes/pipes.module';
import { ListaEntradasComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthService } from '../../auth.service';

import { IndexLaboratorioModule } from '../index-laboratorio/index-laboratorio.module';
//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule } from '../../crud/crud.module';
//fin crud
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';
import { TextMaskModule } from 'angular2-text-mask';
import { MomentModule   } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntradaslaboratorioRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    IndexLaboratorioModule,
    CrudModule,
    NguiAutoCompleteModule,
    NguiDatetimePickerModule,
    TextMaskModule,
    MomentModule
  ],
  declarations: [
    ListaEntradasComponent,
    FormularioComponent
  ],
  providers: [ AuthService, CrudService ]
})
export class EntradasLaboratorioModule { }
