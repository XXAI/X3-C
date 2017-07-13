import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  //{ path: 'configuracion', redirectTo: '/configuracion/almacenes', pathMatch: 'full' },
  {path: 'configuracion', redirectTo: 'configuracion/servicios', pathMatch: 'full'},
  {
    path:'configuracion/servicios',
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
export class ServiciosRoutingModule { }

