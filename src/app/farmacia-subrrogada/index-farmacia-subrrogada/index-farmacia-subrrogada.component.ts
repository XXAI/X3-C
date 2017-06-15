import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { BuscarModuloPipe } from '../../pipes/buscar-modulo.pipe';

@Component({
  selector: 'app-index-farmacia',
  templateUrl: './index-farmacia-subrrogada.component.html',
  styleUrls: ['./index-farmacia-subrrogada.component.css']
})
export class IndexFarmaciaSubrrogadaComponent implements OnInit {

  usuario: any = {}
  busqueda: string = "";

  private modulos:any[] = [];
  modulosAutorizados:any[] = [];
  private accesosDirectos:any[] = [];
  accesosDirectosAutorizados:any[] = [];

  constructor(private title: Title) { }
  
  ngOnInit() {
    this.title.setTitle("Farmacia Subrrogada");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    this.modulos = [
      //{ permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', icono: 'assets/icono-pagina-lista.svg', titulo:"Pedidos", url:"/almacen/pedidos" },
      //{ permiso: 'iSxK0TpoYpnzf8KIQTWOq9Web7WnSKhz', icono: 'assets/icono-pedidos-alt.svg', titulo:"Entregas de pedidos", url:"/almacen/entregas" },
      //{ permiso: 'ZNrN0e8cQL8cIAcXHJfczGpFEC2Ap9QA', icono: 'assets/icono-salidas.svg', titulo:"Salida estandar", url:"/almacen/salidas-estandar" },
      //{ permiso: 'hAeTBeuyxHcAi2OerU7NsVpTA5isktJ7', icono: 'assets/icono-entradas.svg', titulo:"Entrada estandar", url:"/almacen/entradas-estandar" },
    ]
    this.accesosDirectos = [          
      { permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', icono: 'assets/icono-dashboard.svg', titulo:"Dashboard Salidas", url:"/almacen/dashboard-salidas" },
    ]

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    var permisos =  usuario.permisos.split("|")

    if(permisos.length > 0){      
        
      for(var i in this.modulos){
        siguienteItemProtegido:             
        for(var j in permisos){
          
          if(permisos[j] == this.modulos[i].permiso){
            
            this.modulosAutorizados.push(this.modulos[i]);              
            break siguienteItemProtegido;
          }           
        }
      }

      for(var i in this.accesosDirectos){
        siguienteItemProtegido:             
        for(var j in permisos){
          if(permisos[j] == this.accesosDirectos[i].permiso){
            this.accesosDirectosAutorizados.push(this.accesosDirectos[i]);              
            break siguienteItemProtegido;
          }           
        }        
      }
      
    }

  }

}
