import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstatusComponent } from './estatus/estatus.component';
import { LocalComponent } from './local/local.component';
import { CentralComponent } from './central/central.component';
import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  { path: 'panel-control', redirectTo: '/panel-control/sync/estatus', pathMatch: 'full' },
  {
    path: 'panel-control/sync',
    children: [
       { path: '',  redirectTo: '/panel-control/sync/estatus', pathMatch: 'full' },
       { path: 'estatus', component: EstatusComponent },
       { path: 'local', component: LocalComponent , canActivate: [PermisosGuard], data: { key: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f'} },
       { path: 'central', component: CentralComponent, canActivate: [PermisosGuard], data: { key: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f'}  },
       
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyncRoutingModule { }
