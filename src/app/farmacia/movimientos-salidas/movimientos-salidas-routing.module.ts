import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent  }  from  './lista/lista.component';
import { NuevoComponent  }  from  './nuevo/nuevo.component';
import { EditarComponent }  from  './editar/editar.component';

import {  AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {path: 'almacen/movimientos', redirectTo: 'almacen/movimientos/estandar', pathMatch: 'full'},
  {path: 'almacen/movimientos/salidas', redirectTo: 'almacen/movimientos/estandar', pathMatch: 'full'},
  {
    path:'almacen/movimientos',
    children:[
       { path: 'estandar', component: ListaComponent},
       { path: 'receta', component: ListaComponent},
       { path: 'salidas/nuevo/:tipo_salida', component: NuevoComponent},
       { path: 'salidas/editar/:id', component: EditarComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosSalidasRoutingModule { }
