import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';
import { IndexInventarioModule } from '../index-inventario/index-inventario.module';

import { ReporteEntradasSalidasService } from './reporte-entradas-salidas.service';

import { ChartModule } from 'angular2-highcharts';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

import { ReporteEntradasSalidasRoutingModule } from './reporte-entradas-salidas-routing.module';
import { ListaComponent } from './lista/lista.component';
import { BusquedaInsumosPipe } from './busqueda-insumos.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReporteEntradasSalidasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
    PaginacionModule,
    IndexInventarioModule,
    ChartModule,
    NguiDatetimePickerModule
  ],
  providers: [
    ReporteEntradasSalidasService
  ],
  declarations: [ListaComponent, BusquedaInsumosPipe]
})
export class ReporteEntradasSalidasModule { }
