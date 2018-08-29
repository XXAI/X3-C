import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaClues'
})
export class BusquedaCluesPipe implements PipeTransform {

  transform(value: any, term): any {
    term = term.toLowerCase();
    return value.filter(item => item.nombre.toLowerCase().includes(term));
  }

}
