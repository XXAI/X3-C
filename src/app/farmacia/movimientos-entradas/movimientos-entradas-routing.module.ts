import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent  }  from  './lista/lista.component';
import { NuevoComponent  }  from './nuevo/nuevo.component';
import { EditarComponent }  from  './editar/editar.component';

import {  AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {path: 'almacen/movimientos', redirectTo: 'almacen/movimientos/entradas', pathMatch: 'full'},
  {
    path:'almacen/movimientos',
    children:[
      {path: 'entradas', component: ListaComponent},
      {path: 'entradas/nuevo', component: NuevoComponent},
      { path: 'entradas/editar/:id', component: EditarComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosEntradasRoutingModule { }
