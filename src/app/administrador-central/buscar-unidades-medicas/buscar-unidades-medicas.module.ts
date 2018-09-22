import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuscarUnidadesMedicasComponent } from './buscar-unidades-medicas.component';
import { BuscarUnidadesMedicasService } from "./buscar-unidades-medicas.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BuscarUnidadesMedicasComponent
  ],
  declarations: [BuscarUnidadesMedicasComponent],
  providers: [BuscarUnidadesMedicasService]
})
export class BuscarUnidadesMedicasModule { }
