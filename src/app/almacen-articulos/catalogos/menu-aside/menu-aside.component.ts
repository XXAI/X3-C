import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'panel-control-menu-aside',
  templateUrl: './menu-aside.component.html',
  styleUrls: ['./menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {

  usuario: any = {}
  menu:any[] = [];
  menuAutorizado: any[] = [];
  constructor() { }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    var permisos =  usuario.permisos.split("|");

    this.menu = [
      {
        titulo: 'Accesos directos',
        modulos: [
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servidor.svg', titulo:"Categorias", url:"/almacen-articulos/categoria" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servidor.svg', titulo:"Articulos", url:"/almacen-articulos/articulos" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servidor.svg', titulo:"Servidores", url:"/catalogos/servidores" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-almacenes.svg', titulo:"Almacenes", url:"/catalogos/almacenes" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-proveedores.svg', titulo:"Proveedores", url:"/catalogos/proveedores"}, 
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-um.svg', titulo:"Unidades Médicas", url:"/catalogos/unidades-medicas"},         
        ]
      },
      {
        titulo: 'Catalogos',
        modulos: [
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-grupo-insumos.svg', titulo:"Grupos de insumos", url:"/catalogos/grupos-insumos"}, 
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-marcas.svg', titulo:"Marcas", url:"/catalogos/marcas"}, 
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-mc.svg', titulo:"Material de curación", url:"/catalogos/material-curacion"}, //
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-medicamento.svg', titulo:"Medicamentos", url:"/catalogos/medicamentos"}, //      
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-programas.svg', titulo:"Programas", url:"/catalogos/programas"}, 
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-presentacion.svg', titulo:"Presentaciones de medicamentos", url:"/catalogos/presentaciones-medicamentos"}, 
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-administracion.svg', titulo:"Vias de administración", url:"/catalogos/vias-administracion" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-unid-medida.svg', titulo:"Unidades de medida", url:"/catalogos/unidades-medida" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servicios.svg', titulo:"Servicios", url:"/catalogos/servicios"},
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servicios.svg', titulo:"Forma Farmaceutica", url:"/catalogos/forma-farmaceutica"},
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-pedido.svg', titulo:"Tipos de pedidos", url:"/catalogos/tipo-pedido" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-tipo-movimiento.svg', titulo:"Tipos de movimientos", url:"/catalogos/tipos-movimientos" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-tipo-insumos.svg', titulo:"Tipos de insumos", url:"/catalogos/tipos-insumos"},
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-tipo-insumos.svg', titulo:"Tipos de personal", url:"/catalogos/tipos-personal"},
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-tipo-insumos.svg', titulo:"Condicion articulo", url:"/catalogos/condicion-articulo"},
        ]
      },
      
    ];
    
    
    if(permisos.length > 0){    
      for(var i in this.menu){
       
        for(var j in this.menu[i].modulos){
          siguienteItemProtegido: 
          for(var k in permisos){
            if(permisos[k] == this.menu[i].modulos[j].permiso){
              var item = this.initMenuAutorizadoPorItem(this.menu[i].titulo)
              item.modulos.push(this.menu[i].modulos[j]);      

              break siguienteItemProtegido;
            }           
          }
        }

      }
    } 
  }

  initMenuAutorizadoPorItem(titulo:string){
     for(var i in this.menuAutorizado){
       if(titulo == this.menuAutorizado[i].titulo){
        return this.menuAutorizado[i];
       }
     }
     
     this.menuAutorizado.push({ titulo: titulo, modulos: []})
     return this.menuAutorizado[this.menuAutorizado.length - 1];
     
  }

}
