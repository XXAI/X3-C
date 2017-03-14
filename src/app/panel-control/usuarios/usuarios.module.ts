import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { MenuComponent } from '../menu/menu.component';
import { MenuAsideComponent } from '../menu-aside/menu-aside.component';

import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditarComponent } from './editar/editar.component';


import { AuthService } from '../../auth.service';
import { UsuariosService  } from './usuarios.service';
import { RolesService  } from '../roles/roles.service';

import { FormComponent } from './form/form.component';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule
  ],
  declarations: [ MenuComponent, MenuAsideComponent, ListaComponent, NuevoComponent, EditarComponent, FormComponent],
  providers: [ AuthService, UsuariosService, RolesService ],
})
export class UsuariosModule { }
