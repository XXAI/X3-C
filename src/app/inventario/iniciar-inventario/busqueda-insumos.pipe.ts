import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaInsumos'
})
export class BusquedaInsumosPipe implements PipeTransform {

  transform(value: any, term): any {
    //term = term. toLowerCase();
    return value.filter(item => item.descripcion.toLowerCase().includes(term));
  }

}
