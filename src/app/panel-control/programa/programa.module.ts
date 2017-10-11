import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { ProgramaPanelRoutingModule } from './programa-routing.module';
import { PaginacionModule } from '../../almacen-articulos/parcial/paginacion/paginacion.module';

import { PipesModule         } from '../../pipes/pipes.module';
import { ListaComponent      } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthService } from '../../auth.service';

// import { MenuPanelModule } from '../menu/menu';
import { MenuModule } from '../menu/menu.module';
import { MenuAsideComponent } from '../menu/menu-aside/menu-aside.component';

//crud
import { CrudService } from '../../crud/crud.service';
import { CrudModule } from '../../crud/crud.module';
import { ParcialModule } from '../../almacen-articulos/parcial/parcial.module';
//fin crud


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgramaPanelRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    PipesModule,
    MenuModule,
    CrudModule,
    ParcialModule,
    ParcialModule
  ],
  declarations: [
    ListaComponent,
    FormularioComponent
  ],
  providers: [ AuthService, CrudService ]
})
export class ProgramaPanelModule { }
