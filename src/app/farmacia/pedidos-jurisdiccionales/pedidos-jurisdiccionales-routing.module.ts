import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { PedidosComponent } from './pedidos.component';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { VerComponent } from './ver/ver.component';
import { RecepcionComponent } from './recepcion/recepcion.component';

import { AuthGuard } from '../../auth-guard.service';

import { PermisosGuard } from '../../permisos.guard';

const routes: Routes = [
  { path: 'almacen/pedidos-jurisdiccionales', redirectTo: '/almacen/pedidos-jurisdiccionales/todos', pathMatch: 'full' },
  {
    path: 'almacen/pedidos-jurisdiccionales',
    children: [
       { path: 'todos', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'borradores', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'en-transito', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'por-surtir', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'finalizados', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'finalizados/completos', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'finalizados/incompletos', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'finalizados/cancelados', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'expirados', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       //{ path: 'farmacia-subrogada', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent, canActivate: [PermisosGuard], data: { key: 'mNfcZs2T7xmDbUf4UwnLOoJrLv8H346c'}},
       { path: 'editar/:id', component: FormularioComponent, canActivate: [PermisosGuard], data: { key: 'ERl7UBwQvLbr7MYXDpwPf7eXZNzTB17I'}},
       { path: 'ver/:id', component: VerComponent, canActivate: [PermisosGuard], data: { key: 'r6REUnVWlsQ00zVYXakLUxdKtGArcenY'}},
       { path: 'recepcion/:id', component: RecepcionComponent, canActivate: [PermisosGuard], data: { key: 'ipeaGitpjrNFRrB0SjP571C0Xw5tQULZ'}},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PedidosJurisdiccionalesRoutingModule { }
