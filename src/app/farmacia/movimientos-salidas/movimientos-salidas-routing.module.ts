import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent  }  from  './lista/lista.component';
import { NuevoComponent  }  from './nuevo/nuevo.component';

import {  AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {path: 'almacen/movimientos', redirectTo: 'almacen/movimientos/salidas', pathMatch: 'full'},
  {
    path:'almacen/movimientos',
    children:[
      {path: 'salidas', component: ListaComponent},
       { path: 'estandar', component: ListaComponent},
       { path: 'receta', component: ListaComponent},
       { path: 'salidas/nuevo', component: NuevoComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosSalidasRoutingModule { }
