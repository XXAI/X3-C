import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';
import { PaginacionModule } from '../../paginacion/paginacion.module';
import { IndexInventarioModule } from '../index-inventario/index-inventario.module';

import { ReporteSalidaRoutingModule } from './reporte-salida-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ReporteSalidaService } from './reporte-salida.service';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { BusquedaCluesPipe } from './busqueda-clues.pipe';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';


declare var require: any;
export function highchartsFactory() {
  //return require('highcharts');
  const hc = require('highcharts');
  const dd = require('highcharts/modules/exporting');
  const drill = require('highcharts/modules/drilldown');
  drill(hc);
  dd(hc);
}

@NgModule({
  imports: [
    CommonModule,
    ReporteSalidaRoutingModule,
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
    { 
      provide: HighchartsStatic,
      useFactory: highchartsFactory,
    },
    ReporteSalidaService
  ],
  declarations: [ListaComponent, BusquedaCluesPipe]
})
export class ReporteSalidaModule { }
