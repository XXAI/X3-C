import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { PedidosComponent } from './pedidos.component';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { VerComponent } from './ver/ver.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ListaComponent as ListaActasComponent } from './actas/lista/lista.component';
import { VerComponent as VerActaComponent } from './actas/ver/ver.component';

import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'almacen/pedidos', redirectTo: '/almacen/pedidos/todos', pathMatch: 'full' },
  {
    path: 'almacen/pedidos',
    children: [
      { path: 'ordinarios', component: ListaComponent}, 
      { path: 'ordinarios/todos', component: ListaComponent}, 
       { path: 'ordinarios/bandeja', component: ListaComponent}, 
       { path: 'ordinarios/borradores', component: ListaComponent}, 
       { path: 'todos', component: ListaComponent},
       { path: 'borradores', component: ListaComponent},
       { path: 'solicitados', component: ListaComponent},
       { path: 'en-transito', component: ListaComponent},
       { path: 'por-surtir', component: ListaComponent},
       { path: 'finalizados', component: ListaComponent},
       { path: 'finalizados/completos', component: ListaComponent},
       { path: 'finalizados/incompletos', component: ListaComponent},
       { path: 'finalizados/cancelados', component: ListaComponent},
       { path: 'expirados', component: ListaComponent},
       { path: 'expirados-cancelados', component: ListaComponent},
       { path: 'farmacia-subrogada', component: ListaComponent},
       { path: 'alternos', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent},
       { path: 'nuevo/ordinario/:pedido_ordinario_unidad_medica_id', component: FormularioComponent},
       { path: 'editar/:id', component: FormularioComponent},
       { path: 'ver/:id', component: VerComponent},
       { path: 'recepcion/:id', component: RecepcionComponent},
       { path: 'actas', component: ListaActasComponent},
       { path: 'actas/:id', component: VerActaComponent},
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
