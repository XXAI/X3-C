import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { NuevaComponent } from './nueva/nueva.component';
import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  { path: 'medicos', redirectTo: '/medicos/recetas', pathMatch: 'full' },
  {
    path: 'medicos/recetas',
    children: [
       { path: '', component: ListaComponent},
       { path: 'nuevo', component: NuevaComponent },
       { path: 'ver/:id', component: NuevaComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetasRoutingModule { }
