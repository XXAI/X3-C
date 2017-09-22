import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'almacen/transferencia-almacen', redirectTo: '/almacen/transferencia-almacen/todos', pathMatch: 'full' },
  {
    path: 'almacen/transferencia-almacen',
    children: [
       { path: 'todos', component: ListaComponent},
       { path: 'borradores', component: ListaComponent},
       { path: 'solicitudes', component: ListaComponent},
       { path: 'en-transito', component: ListaComponent},
       { path: 'por-finalizar', component: ListaComponent},
       { path: 'finalizados', component: ListaComponent},
       { path: 'cancelados', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent},
       { path: 'editar/:id', component: FormularioComponent},
       { path: 'ver/:id', component: FormularioComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferenciaAlmacenRoutingModule { }
