import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { EntradasRoutingModule }  from './entradas-routing.module';
import { PaginacionModule    }  from '../../paginacion/paginacion.module';
import { IndexFarmaciaModule }  from '../index-farmacia/index-farmacia.module';

//import { MenuComponent } from '../menu/menu.component';
//import { MenuAsideComponent } from '../menu-aside/menu-aside.component';

import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditarComponent } from './editar/editar.component';


import { AuthService } from '../../auth.service';
import { EntradasService  } from './entradas.service';
//import { RolesService  } from '../roles/roles.service';

import { FormComponent } from './form/form.component';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntradasRoutingModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    IndexFarmaciaModule
  ],
  declarations: [ ListaComponent, NuevoComponent, EditarComponent, FormComponent],
  providers: [ AuthService, EntradasService ],
})
export class EntradasV2Module { }
