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
  private modulosAutorizados:any[] = [];
  private accesosDirectos:any[] = [];
  private accesosDirectosAutorizados:any[] = [];

  constructor(private title: Title) { }

  

  ngOnInit() {
    this.title.setTitle("Farmacia");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    

    this.modulos = [
      { permiso: 'hAeTBeuyxHcAi2OerU7NsVpTA5isktJ7', icono: 'assets/icono-entradas.svg', titulo:"Entrada manual", url:"/farmacia/movimientos/entradas" },
      { permiso: 'ZNrN0e8cQL8cIAcXHJfczGpFEC2Ap9QA', icono: 'assets/icono-salidas.svg', titulo:"Salida manual", url:"/farmacia/movimientos/salidas" },
      { permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', icono: 'assets/icono-pagina-lista.svg', titulo:"Pedidos", url:"/farmacia/pedidos", badge:1 },
      { permiso: 'iSxK0TpoYpnzf8KIQTWOq9Web7WnSKhz', icono: 'assets/icono-pedidos-alt.svg', titulo:"Entregas de pedidos", url:"/farmacia/entregas" },
    ]
    this.accesosDirectos = [    
      { permiso: '2nC6GUf6E737QwZSxuLORT6rZUDy5YUO', icono: 'assets/icono-pagina-lista.svg', titulo:"Nuevo pedido", url:"/farmacia/pedidos/nuevo" },
      { permiso: 'q9ppCvhWdeCJI85YtCrKvtHLaoPipeaT', icono: 'assets/icono-pedidos-alt.svg', titulo:"Recibir pedido", url:"/farmacia/pedidos/por-surtir" },
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
