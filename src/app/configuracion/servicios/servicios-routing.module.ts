import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const usuario = JSON.parse(localStorage.getItem("usuario"));
const routes: Routes = [
  // {path: 'configuracion', redirectTo: 'configuracion/almacen-configuracion', pathMatch: 'full'},
  { path: 'configuracion', redirectTo: 'configuracion/servicios', pathMatch: 'full'},
  {
    path: 'configuracion/servicios',
    children: [
      { path: '', component: FormularioComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ServiciosRoutingModule { }

