import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  busquedaActivada:boolean = true;
  cargando:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  buscar(value:string){
    //
  }

}
