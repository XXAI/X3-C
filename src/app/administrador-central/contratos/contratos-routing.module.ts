import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  {
    path: 'administrador-central/contratos',
    children: [       
       { path: '', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'IMkUZwr9GEJW91gdXNEdHZPMvYMYthT2'} },        
       { path: 'nuevo', component: FormularioComponent, canActivate: [PermisosGuard], data: { key: 'hhKMLXe4j7aECBpbPXantCVIizVp7Jvj'} },
       { path: 'editar/:id', component: FormularioComponent, canActivate: [PermisosGuard], data: { key: 'Wek8fk58OZrOyygmQEc8tjpg36ZkaTWK'}},    
       { path: 'editar/:id/:lista', component: FormularioComponent, canActivate: [PermisosGuard], data: { key: 'Wek8fk58OZrOyygmQEc8tjpg36ZkaTWK'}},  
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosRoutingModule { }
