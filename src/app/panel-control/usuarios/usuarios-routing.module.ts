import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditarComponent } from './editar/editar.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'panel-control', redirectTo: '/panel-control/usuarios', pathMatch: 'full' },
  {
    path: 'panel-control/usuarios',
    children: [
       { path: '', component: ListaComponent},
       { path: 'nuevo', component: NuevoComponent },
       { path: 'editar/:id', component: EditarComponent},
    ],
    canActivate: [AuthGuard]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsuariosRoutingModule { }

