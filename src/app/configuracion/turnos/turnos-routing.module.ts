import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {path: 'configuracion/turnos', redirectTo: 'configuracion/turnos', pathMatch: 'full'},
  {
    path:'configuracion/turnos',
    children:[
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
export class TurnosRoutingModule { }

