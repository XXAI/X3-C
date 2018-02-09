import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { EntradasAlmacenEstandarRoutingModule } from './entradas-almacen-estandar-routing.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { PipesModule             } from '../../pipes/pipes.module';
import { ListaComponent          } from './lista/lista.component';
import { FormularioComponent     } from './formulario/formulario.component';
import { ModalProgramasComponent } from './formulario/modal-programas.component';

import { AuthService } from '../../auth.service';

import { IndexAlmacenEstandarModule } from '../index-almacen-estandar/index-almacen-estandar.module';
//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule } from '../../crud/crud.module';
//fin crud
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';
import { TextMaskModule } from 'angular2-text-mask';
import { MomentModule   } from 'angular2-moment';
import { from } from 'rxjs/observable/from';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntradasAlmacenEstandarRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    IndexAlmacenEstandarModule,
    CrudModule,
    NguiAutoCompleteModule,
    NguiDatetimePickerModule,
    TextMaskModule,
    MomentModule
  ],
  declarations: [
    ListaComponent,
    FormularioComponent,
    ModalProgramasComponent
  ],
  providers: [ AuthService, CrudService ]
})
export class EntradasAlmacenEstandarModule { }
