import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { SurtirComponent } from './surtir/surtir.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'almacen/transferencia-almacen', redirectTo: '/almacen/transferencia-almacen/por-surtir', pathMatch: 'full' },
  {
    path: 'almacen/transferencia-almacen',
    children: [
       { path: 'todos', component: ListaComponent},
       { path: 'borradores', component: ListaComponent},
       { path: 'por-surtir', component: ListaComponent},
       { path: 'en-transito', component: ListaComponent},
       { path: 'por-finalizar', component: ListaComponent},
       { path: 'finalizados', component: ListaComponent},
       { path: 'cancelados', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent},
       { path: 'editar/:id', component: FormularioComponent},
       { path: 'ver/:id', component: FormularioComponent},
       { path: 'surtir/:id', component: SurtirComponent},

       { path: 'nueva', component: TransferenciaComponent},
       
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferenciaAlmacenRoutingModule { }
