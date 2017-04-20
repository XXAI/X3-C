import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { PedidosComponent } from './pedidos.component';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';

import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'farmacia/entradas', redirectTo: '/farmacia/entradas/lista', pathMatch: 'full' },
  {
    path: 'farmacia/entradas',
    children: [
       { path: 'lista', component: ListaComponent},
       { path: 'abiertos', component: ListaComponent},
       { path: 'lista/en-proceso', component: ListaComponent},
       { path: 'lista/liberados', component: ListaComponent},
       { path: 'recibidos', component: ListaComponent},
       { path: 'recibidos/completos', component: ListaComponent},
       { path: 'recibidos/incompletos', component: ListaComponent},
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
export class EntradasRoutingModule { }
