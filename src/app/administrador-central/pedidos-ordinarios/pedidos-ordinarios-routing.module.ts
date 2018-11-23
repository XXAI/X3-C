import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from "./nuevo/nuevo.component";

const routes: Routes =  [
  {
    path: 'administrador-central/pedidos-ordinarios',
    children: [       
       { path: '', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'nkzKZXncGYTJVhn0V6aej6UiZGK42dgH'} },        
       { path: 'nuevo', component: NuevoComponent, canActivate: [PermisosGuard], data: { key: 'P72UWtjEjdNx8CEnTsjW8TjL5NCjy3JX'} },
       //{ path: 'ajustes/:id', component: AjustesComponent, canActivate: [PermisosGuard], data: { key: '7nH8WNC9Cf43T4baS1hyS5H3iywGoTxN'}},    
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosOrdinariosRoutingModule { }
