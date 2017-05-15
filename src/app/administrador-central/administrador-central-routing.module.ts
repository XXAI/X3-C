import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbastoComponent } from './abasto/abasto.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { TransferenciasRecursosComponent } from './transferencias-recursos/transferencias-recursos.component';

import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';

const routes: Routes = [
  { path: 'administrador-central', redirectTo: '/administrador-central/pedidos', pathMatch: 'full' },
  {
    path: 'administrador-central', 
    children: [
       { path: 'pedidos', component: PedidosComponent, canActivate: [PermisosGuard], data: { key: 'bsIbPL3qv6XevcAyrRm1GxJufDbzLOax'} },
       { path: 'abasto', component: AbastoComponent, canActivate: [PermisosGuard], data: { key: 'bwWWUufmEBRFpw9HbUJQUP8EFnagynQv'} },
       { path: 'transferencias-recursos', component: TransferenciasRecursosComponent, canActivate: [PermisosGuard], data: { key: 's8kSv2Gj9DZwRvClVRmZohp92Rtvi26i'}},
    ],
    canActivate: [AuthGuard]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorCentralRoutingModule { }
