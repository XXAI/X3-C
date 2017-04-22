import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent  }  from  './lista/lista.component';
import { NuevoComponent  }  from './nuevo/nuevo.component';

import {  AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {path: 'farmacia/movimientos', redirectTo: 'farmacia/movimientos/entradas', pathMatch: 'full'},
  {
    path:'farmacia/movimientos',
    children:[
      {path: 'entradas', component: ListaComponent},
      {path: 'entradas/nuevo', component: NuevoComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosEntradasRoutingModule { }
