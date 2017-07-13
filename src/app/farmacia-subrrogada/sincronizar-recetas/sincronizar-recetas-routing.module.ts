import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CargarComponent } from './formulario/cargar.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'farmacia-subrrogada/sincronizar-recetas',
    children: [
       { path: '', component: ListaComponent},
       { path: 'nuevo', component: CargarComponent },
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
export class SincronizarRecetasRoutingModule { }

