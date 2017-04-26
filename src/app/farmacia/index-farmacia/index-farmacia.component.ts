import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { BuscarModuloPipe } from '../../pipes/buscar-modulo.pipe';

@Component({
  selector: 'app-index-farmacia',
  templateUrl: './index-farmacia.component.html',
  styleUrls: ['./index-farmacia.component.css']
})
export class IndexFarmaciaComponent implements OnInit {

  private usuario: any = {}
  private busqueda: string = "";

  private modulos:any[] = [];
  private accesosDirectos:any[] = [];

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Farmacia");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    this.modulos = [
      { permiso: '', icono: 'assets/icono-entradas.svg', titulo:"Entrada manual", url:"/farmacia/movimientos/entradas" },
      { permiso: '', icono: 'assets/icono-salidas.svg', titulo:"Salida manual", url:"/farmacia/movimientos/salidas" },
      { permiso: '', icono: 'assets/icono-salidas.svg', titulo:"Salidas", url:"/farmacia/salidas" },
      //{ permiso: '', icono: 'assets/hub-almacen.svg', titulo:"Inventario", url:"/farmacia/inventario" },
      //{ permiso: '', icono: 'assets/icono-ajustes-inventario.svg', titulo:"Ajustes de inventario", url:"/farmacia/inventario/ajustes" },
      { permiso: '', icono: 'assets/icono-recetas.svg', titulo:"Recetas", url:"/farmacia/recetas" },
      //{ permiso: '', icono: 'assets/icono-colectivo.svg', titulo:"Colectivos", url:"/farmacia/colectivos" },
      { permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo:"Pedidos", url:"/farmacia/pedidos", badge:1 },
      { permiso: '', icono: 'assets/icono-pedidos-alt.svg', titulo:"Entregas de pedidos", url:"/farmacia/entregas" },
      { permiso: '', icono: 'assets/icono-camion.svg', titulo:"Reabastecimiento", url:"/farmacia/pedidos-reabastecimiento" },
      //{ permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo:"Actas por desabasto", url:"/farmacia/actas" },
      //{ permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo:"Actas colectivas por desabasto", url:"/farmacia/actas-colectivas" },
    ]
    this.accesosDirectos = [
      { permiso: '', icono: 'assets/icono-receta.svg', titulo:"Dispensación por Receta", url:"/farmacia/recetas/nueva" },
      //{ permiso: '', icono: 'assets/icono-colectivo.svg', titulo:"Nuevo colectivo", url:"/farmacia/colectivos/nuevo" },      
      { permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo:"Nuevo pedido", url:"/farmacia/pedidos/nuevo" },
      { permiso: '', icono: 'assets/icono-pedidos-alt.svg', titulo:"Recibir pedido", url:"/farmacia/pedidos/por-surtir" },
      //{ permiso: '', icono: 'assets/icono-entradas.svg', titulo:"Nueva entrada", url:"/farmacia/entradas/nueva" },
      //{ permiso: '', icono: 'assets/icono-salidas.svg', titulo:"Nueva salida", url:"/farmacia/salida/nueva" },
    ]

  }

}
