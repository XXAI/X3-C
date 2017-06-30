import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'administrador-central-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  usuario: any = {}
  menu:any[] = [];
  menuAutorizado: any[] = [];
  toggleMinimizado:boolean = false;
  
  constructor() { }

  ngOnInit() {
    

    this.menu = [
      {
        titulo: 'Reportes',
        modulos: [
          { permiso: 'bsIbPL3qv6XevcAyrRm1GxJufDbzLOax', icono: 'fa-file-text', titulo:"Pedidos", url:"/administrador-central/pedidos" }, 
          { permiso: 'bwWWUufmEBRFpw9HbUJQUP8EFnagynQv', icono: 'fa-line-chart', titulo:"Abasto", url:"/administrador-central/abasto" },          
          { permiso: 'fWA5oDswZ2Ra4O8YaCy6nEY8OeCOxg9C', icono: 'fa-bar-chart', titulo:"Entregas por mes", url:"/administrador-central/entregas-mes" },          
        ]
      },
      {
        titulo: 'Operaciones',
        modulos: [
          { permiso: 's8kSv2Gj9DZwRvClVRmZohp92Rtvi26i', icono: 'fa-exchange', titulo:"Transferencias de recursos", url:"/administrador-central/transferencias-recursos" },
        ]
      },
      
    ],
    this.menuAutorizado = []

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    var permisos =  usuario.permisos.split("|")
    
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
