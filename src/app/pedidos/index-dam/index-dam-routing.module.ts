import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexDamComponent } from './index-dam.component';

import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: 'dam',
    component: IndexDamComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class IndexDamRoutingModule { }
