import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const usuario = JSON.parse(localStorage.getItem("usuario"));
const routes: Routes = [ 
  {path: 'configuracion/configuracion-general', redirectTo: 'configuracion/configuracion-general/editar/1', pathMatch: 'full'}, 
  {
    path: 'configuracion/configuracion-general',
    children: [
       { path: 'editar/:id', component: FormularioComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ConfiguracionGeneralRoutingModule { }

