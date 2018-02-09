import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ListaComponent } from './lista/lista.component';
import { InicialComponent } from './formulario/formulario.component';
// import { VerComponent} from './ver/ver.component';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'inventario/iniciar-inventario',
    children: [
      // { path: '', component: ListaComponent},
      { path: '', component: InicialComponent},
      { path: ':id', component: InicialComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class IniciarInventarioServiceRoutingModule { }