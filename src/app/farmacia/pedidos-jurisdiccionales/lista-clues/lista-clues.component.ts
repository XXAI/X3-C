import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pedidos-jurisdiccionales-lista-clues',
  templateUrl: './lista-clues.component.html',
  styleUrls: ['./lista-clues.component.css']
})
export class ListaCluesComponent implements OnInit {

  @Output() onCerrar = new EventEmitter<void>();
  @Output() onEnviar = new EventEmitter<any>();

  //Harima: Para evitar agregar insumos que ya estan en la lista
  @Input() insumo: any;

  constructor() { }

  ngOnInit() {
  }

  actualizarTotales(){
    this.insumo.monto = 0;
    this.insumo.cantidad = 0;
    for(var i in this.insumo.listaClues){
      this.insumo.monto += this.insumo.listaClues[i].cantidad * this.insumo.precio;
      this.insumo.cantidad += this.insumo.listaClues[i].cantidad;
    }
      
  }
  eliminarInsumo(item,index){
    this.insumo.listaClues.splice(index,1);
    this.actualizarTotales();
  }
  cerrar(){
    this.onCerrar.emit();
  }
}
