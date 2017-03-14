import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../auth.service';
import { RolesService  } from './roles.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [RolesService]
})
export class RolesModule { }
