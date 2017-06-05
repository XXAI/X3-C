import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexFarmaciaModule } from '../../index-farmacia/index-farmacia.module';
/**
 * Se debe agregar el ChartModule y HighchartsStatic para poder usar la gráfica
 * INICIO
 */
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { GraficasComponent } from '../graficas/graficas.component';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}/**FIN*/

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    IndexFarmaciaModule
  ],
  providers: [
    { //Propiedad de la gráfica
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  declarations: [
    GraficasComponent
  ],
  exports:[
    GraficasComponent
  ]
})
export class GraficasModule { }
