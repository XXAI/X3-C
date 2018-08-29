import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
    {
      path: 'inventario/reporte-salidas',
      component: ListaComponent,
      canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteSalidaRoutingModule { }
