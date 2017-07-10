import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'almacen/entradas-estandar',
    children: [
       { path: '', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent },
       { path: 'ver/:id', component: FormularioComponent},
    ],
    canActivate: [AuthGuard]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EntradasEstandarRoutingModule { }

