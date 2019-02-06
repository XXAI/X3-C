import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInsumos'
})
export class FilterInsumosPipe implements PipeTransform {

  transform(item: any[], value: string): any {
    //console.log(item[0]);
    if(!value) return item;
    
    var obj_recepcion = [];
    for (var i in item) {
        var bandera  = 0;
        var insumos = item[i].insumos;
        //console.log(i);
        for (var j in insumos) {
            var nombre = insumos[j].detalles;
            
            if(nombre.descripcion.toUpperCase().indexOf(value.toUpperCase()) >= 0)
            {
              bandera = 1;
              break;
            }
            
        }
        if(bandera == 1)
          obj_recepcion.push(item[i]);
    }
    return obj_recepcion;
    //return item;
  }

}
