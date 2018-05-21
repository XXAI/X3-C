import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  {
    path: 'administrador-central/insumos-medicos',
    children: [       
       { path: '', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r1RX6Yq7fc4CRRI2OJXIPxeBLW3lFP59_'} },        
       { path: 'nuevo', component: FormularioComponent, canActivate: [PermisosGuard], data: { key: 'r1RX6Yq7fc4CRRI2OJXIPxeBLW3lFP59_'} },
       { path: 'editar/:id', component: FormularioComponent, canActivate: [PermisosGuard], data: { key: 'r1RX6Yq7fc4CRRI2OJXIPxeBLW3lFP59_'}},    
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumosMedicosRoutingModule { }
