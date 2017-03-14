import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { PedidosComponent } from './pedidos.component';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';

import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'farmacia/pedidos', redirectTo: '/farmacia/pedidos/pendientes', pathMatch: 'full' },
  {
    path: 'farmacia/pedidos',
    children: [
       { path: 'pendientes', component: ListaComponent},
       { path: 'nuevo', component: NuevoComponent},
    ],
    canActivate: [AuthGuard]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PedidosRoutingModule { }
