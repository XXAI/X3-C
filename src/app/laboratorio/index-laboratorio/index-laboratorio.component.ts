import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { BuscarModuloPipe } from '../../pipes/buscar-modulo.pipe';

@Component({
  selector: 'app-index-laboratorio',
  templateUrl: './index-laboratorio.component.html',
  styleUrls: ['./index-laboratorio.component.css']
})
export class IndexLaboratorioComponent implements OnInit {

  usuario: any = {}
  busqueda: string = "";

  private modulos:any[] = [];
  modulosAutorizados:any[] = [];
  private accesosDirectos:any[] = [];
  accesosDirectosAutorizados:any[] = [];

  constructor(private title: Title) { }
  
  ngOnInit() {
    this.title.setTitle("Almacén / Laboratorio");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    this.modulos = [
      { permiso: 'a1OMZVn7dveOf5aUK8V0VsvvSCxz8EMw', icono: 'assets/icono-entradas-laboratorio.svg', titulo: 'Entrada de laboratorio', url:'/laboratorio/entradas-laboratorio' },
      { permiso: 'a1OMZVn7dveOf5aUK8V0VsvvSCxz8EMw', icono: 'assets/icono-salidas-laboratorio.svg', titulo: 'Salidas de laboratorio', url:'/laboratorio/salidas-laboratorio' },
    ]
    this.accesosDirectos = [          
     // { permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', icono: 'assets/icono-catalogos.svg', titulo:"Catálogos", url:"/almacen-articulos/catalogos" },
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
