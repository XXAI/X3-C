import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  { path: 'inventario/monitor-caducidades', redirectTo: '/inventario/monitor-caducidades/TODO', pathMatch: 'full' },
  {
    path: 'inventario/monitor-caducidades',
    children: [
       { path: ':tipo_busqueda', component: ListaComponent}
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MonitorCaducidadesRoutingModule { }

