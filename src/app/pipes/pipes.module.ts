import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarModuloPipe } from './buscar-modulo.pipe';
import { GroupByPipe  } from './groupBy.pipe';
import { FilterPipe  } from './filter.pipe';
import { FilterInsumosPipe } from './filter-insumos.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    BuscarModuloPipe,
    GroupByPipe,
    FilterPipe,
    FilterInsumosPipe
  ],
  declarations: [BuscarModuloPipe, GroupByPipe, FilterPipe, FilterInsumosPipe]
})
export class PipesModule { }
