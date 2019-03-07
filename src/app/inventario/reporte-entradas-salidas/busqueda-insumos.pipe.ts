import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaInsumos'
})
export class BusquedaInsumosPipe implements PipeTransform {

  transform(value: any, term): any {
    term = term.toLowerCase();
    let descripcion = value.filter(item => item.descripcion.toLowerCase().includes(term));
    let clave = value.filter(item => item.clave.toLowerCase().includes(term));
    let merge = Object.assign(descripcion, clave);
    return merge;
  }

}
