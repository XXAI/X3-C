import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { PedidosComponent } from './pedidos.component';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { VerComponent } from './ver/ver.component';
import { RecepcionComponent } from './recepcion/recepcion.component';

import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'almacen/pedidos', redirectTo: '/almacen/pedidos/todos', pathMatch: 'full' },
  {
    path: 'almacen/pedidos',
    children: [
       { path: 'todos', component: ListaComponent},
       { path: 'borradores', component: ListaComponent},
       { path: 'en-transito', component: ListaComponent},
       { path: 'por-surtir', component: ListaComponent},
       { path: 'finalizados', component: ListaComponent},
       { path: 'finalizados/completos', component: ListaComponent},
       { path: 'finalizados/incompletos', component: ListaComponent},
       { path: 'finalizados/cancelados', component: ListaComponent},
       { path: 'expirados', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent},
       { path: 'editar/:id', component: FormularioComponent},
       { path: 'ver/:id', component: VerComponent},
       { path: 'recepcion/:id', component: RecepcionComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PedidosRoutingModule { }
