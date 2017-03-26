import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth-guard.service';

import { ListaComponent } from './lista/lista.component';
//import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  { path: 'farmacia/entregas', redirectTo: '/farmacia/entregas/pendientes', pathMatch: 'full' },
  {
    path: 'farmacia/entregas',
    children: [
       { path: 'pendientes', component: ListaComponent},
       { path: 'realizadas', component: ListaComponent},
       { path: 'realizadas/completas', component: ListaComponent},
       { path: 'realizadas/incompletas', component: ListaComponent},
       //{ path: 'nuevo', component: NuevoComponent},
    ],
    canActivate: [AuthGuard]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregasRoutingModule { }
