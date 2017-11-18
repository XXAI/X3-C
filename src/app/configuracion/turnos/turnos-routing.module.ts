import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';

import { PermisosGuard } from '../../permisos.guard';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'configuracion/turnos',
    redirectTo: 'configuracion/turnos',
    pathMatch: 'full',
    canActivate: [PermisosGuard],
    data: { key: 'BnB3LhrDbKNBrbQaeB2BPXKGrLEYrEw7'}
  },
  {
    path: 'configuracion/turnos',
    children: [
      {
        path: '',
        component: FormularioComponent,
        canActivate: [PermisosGuard],
        data: { key: 'BnB3LhrDbKNBrbQaeB2BPXKGrLEYrEw7'}
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TurnosRoutingModule { }

