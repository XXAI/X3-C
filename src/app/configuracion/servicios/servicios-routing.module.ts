import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {path: 'configuracion/servicios', redirectTo: 'configuracion/servicios/editar/:clues', pathMatch: 'full'},
  {
    path:'configuracion/servicios',
    children:[
      { path: 'nuevo', component: FormularioComponent},
      { path: 'editar/:clues', component: FormularioComponent},
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

