import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth-guard.service';

import { ListaComponent } from './lista/lista.component';
//import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  { path: 'farmacia/entregas', redirectTo: '/farmacia/entregas/nuevas', pathMatch: 'full' },
  {
    path: 'farmacia/entregas',
    children: [
       { path: 'nuevas', component: ListaComponent},
       { path: 'pendientes', component: ListaComponent},
       { path: 'finalizadas', component: ListaComponent},
       { path: 'finalizadas/completas', component: ListaComponent},
       { path: 'finalizadas/incompletas', component: ListaComponent},
       { path: 'realizadas', component: ListaComponent},
       //{ path: 'nuevo', component: NuevoComponent},
    ],
    canActivate: [AuthGuard]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregasRoutingModule { }
