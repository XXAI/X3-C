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
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servidor.svg', titulo:"Inventario", url:"/almacen-articulos/inventarios" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servidor.svg', titulo:"Entradas", url:"/almacen-articulos/entradas" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servidor.svg', titulo:"Salidas", url:"/almacen-articulos/salidas" },
          { permiso: '2EA8UKzKrNFzxQxBBSjQ2fHggyrScu9f', icono: 'assets/catalogo-servidor.svg', titulo:"Resguardos", url:"/almacen-articulos/resguardos" },        
        ]
      }
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
