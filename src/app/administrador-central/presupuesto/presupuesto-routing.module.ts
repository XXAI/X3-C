import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenComponent } from './resumen/resumen.component';
import { NuevoComponent } from "./nuevo/nuevo.component";
import { AjustesComponent } from "./ajustes/ajustes.component";

import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  {
    path: 'administrador-central/presupuesto',
    children: [       
       { path: '', component: ResumenComponent, canActivate: [PermisosGuard], data: { key: 'nkzKZXncGYTJVhn0V6aej6UiZGK42dgH'} },        
       { path: 'nuevo', component: NuevoComponent, canActivate: [PermisosGuard], data: { key: 'P72UWtjEjdNx8CEnTsjW8TjL5NCjy3JX'} },
       { path: 'ajustes/:id', component: AjustesComponent, canActivate: [PermisosGuard], data: { key: '7nH8WNC9Cf43T4baS1hyS5H3iywGoTxN'}},    
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestoRoutingModule { }
