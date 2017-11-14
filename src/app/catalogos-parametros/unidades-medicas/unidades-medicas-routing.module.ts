import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  {
    path: 'catalogos-parametros/unidades-medicas',
    children: [
      {
        path: '',
        component: ListaComponent,
        canActivate: [PermisosGuard],
        data: { key: '56R2ES2GDbpovdiLAwFEjj75Rl975MsR'}
      },
      {
        path: 'nuevo',
        component: FormularioComponent,
        canActivate: [PermisosGuard],
        data: { key: '56R2ES2GDbpovdiLAwFEjj75Rl975MsR'}
      },
      {
        path: 'editar/:id',
        component: FormularioComponent,
        canActivate: [PermisosGuard],
        data: { key: '56R2ES2GDbpovdiLAwFEjj75Rl975MsR'}
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
export class UnidadesMedicasRoutingModule { }

