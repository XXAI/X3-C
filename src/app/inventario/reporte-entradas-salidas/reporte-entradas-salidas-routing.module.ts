import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'inventario/reporte-entradas-salidas',
    component: ListaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteEntradasSalidasRoutingModule { }
