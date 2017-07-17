import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';

import { MenuModule } from '../menu/menu.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';

import { SyncRoutingModule } from './sync-routing.module';
import { EstatusComponent } from './estatus/estatus.component';
import { LocalComponent } from './local/local.component';

import { SyncService } from './sync.service';
import { CentralComponent } from './central/central.component';

@NgModule({
  imports: [
    CommonModule,
    SyncRoutingModule,   
    MenuModule,
    PaginacionModule
  ],
  declarations: [ EstatusComponent, LocalComponent, CentralComponent],
  providers:[SyncService]
})
export class SyncModule { }
