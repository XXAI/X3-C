import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {path: 'panel-control/claves', redirectTo: 'panel-control/claves/editar/:clues', pathMatch: 'full'},
  {
    path:'panel-control/claves',
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
export class ClavesRoutingModule { }

