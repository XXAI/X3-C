import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { BuscarModuloPipe } from '../../../pipes/buscar-modulo.pipe';

@Component({
  selector: 'app-index-catalogo',
  templateUrl: './index-catalogo.component.html',
  styleUrls: ['./index-catalogo.component.css']
})
export class IndexCatalogoComponent implements OnInit {

  private usuario: any = {}
  private busqueda: string = "";

  private modulos:any[] = [];
  private accesosDirectos:any[] = [];

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Artículos / Catálogos");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    this.modulos = [
      { permiso: '', icono: 'assets/catalogo-grupo-insumos.svg', titulo:"Grupos de insumos", url:"/catalogos/grupos-insumos"}, 
      { permiso: '', icono: 'assets/catalogo-marcas.svg', titulo:"Marcas", url:"/catalogos/marcas"}, 
      { permiso: '', icono: 'assets/catalogo-mc.svg', titulo:"Material de curación", url:"/catalogos/material-curacion"}, //
      { permiso: '', icono: 'assets/catalogo-medicamento.svg', titulo:"Medicamentos", url:"/catalogos/medicamentos"}, //      
      { permiso: '', icono: 'assets/catalogo-programas.svg', titulo:"Programas", url:"/catalogos/programas"}, //
      { permiso: '', icono: 'assets/catalogo-presentacion.svg', titulo:"Presentaciones de medicamentos", url:"/catalogos/presentaciones-medicamentos"}, 
      { permiso: '', icono: 'assets/catalogo-administracion.svg', titulo:"Vias de administración", url:"/catalogos/vias-administracion" },
      { permiso: '', icono: 'assets/catalogo-unid-medida.svg', titulo:"Unidades de medida", url:"/almacen-articulos/catalogos/unidades-medida" },
      { permiso: '', icono: 'assets/catalogo-servicios.svg', titulo:"Servicios", url:"/catalogos/servicios"},
      { permiso: '', icono: 'assets/catalogo-pedido.svg', titulo:"Tipos de pedidos", url:"/catalogos/tipo-pedido" },
      { permiso: '', icono: 'assets/catalogo-tipo-movimiento.svg', titulo:"Tipos de movimientos", url:"/catalogos/tipos-movimientos" },
      { permiso: '', icono: 'assets/catalogo-tipo-insumos.svg', titulo:"Tipos de insumos", url:"/catalogos/tipos-insumos"},
      
    ]
    this.accesosDirectos = [
      { permiso: '', icono: 'assets/catalogo-servidor.svg', titulo:"Servidores", url:"/catalogos/servidores" },
      { permiso: '', icono: 'assets/catalogo-almacenes.svg', titulo:"Almacenes", url:"/catalogos/almacenes" },
      { permiso: '', icono: 'assets/catalogo-proveedores.svg', titulo:"Proveedores", url:"/catalogos/proveedores"}, 
      { permiso: '', icono: 'assets/catalogo-um.svg', titulo:"Unidades Médicas", url:"unidades-medicas"}, 
    ]

  }

}
