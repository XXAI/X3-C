import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenComponent } from './resumen/resumen.component';
import { NuevoComponent } from "./nuevo/nuevo.component";

import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  {
    path: 'administrador-central/presupuesto',
    children: [       
       { path: '', component: ResumenComponent, canActivate: [PermisosGuard], data: { key: 'X36qZL6YWSwvEaR2EH1TeSOotssAkrxu'} },        
       { path: 'nuevo', component: NuevoComponent, canActivate: [PermisosGuard], data: { key: 'jBCDyEZfGTteX7PdyuLPCdpbrCabseXy'} },
       { path: 'ajustes/:id', component: ResumenComponent, canActivate: [PermisosGuard], data: { key: 'LUSTiOJVbVzVkfCKLi2VcJk29UC0GCRZ'}},    
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestoRoutingModule { }
