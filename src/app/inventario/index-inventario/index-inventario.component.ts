import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { BuscarModuloPipe } from '../../pipes/buscar-modulo.pipe';

@Component({
  selector: 'app-index-inventario',
  templateUrl: './index-inventario.component.html',
  styleUrls: ['./index-inventario.component.css']
})
export class IndexInventarioComponent implements OnInit {

  usuario: any = {};
  busqueda = '';

  private modulos: any[] = [];
  modulosAutorizados: any[] = [];
  private accesosDirectos: any[] = [];
  accesosDirectosAutorizados: any[] = [];

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Almacén');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.modulos = [
      { permiso: 'kWbg08UnfL8fHlOpcNmcTvVbGEU6L8Wz', icono: 'assets/icono-stock.svg', titulo: 'Existencias', url: '/inventario/existencias' },
      { permiso: 'g8YLm8F0e9Zokxq6iSJUndPYro5Ic6tQ', icono: 'assets/icono-stock-edit.svg', titulo: 'Ajuste de Inventario', url: '/almacen/ajuste-inventario' },
      { permiso: '7KbTARF2kpnO4Lfqv8hmYP8QGMcgJBwU', icono: 'assets/icono-ajustes-inventario.svg', titulo: 'Inicialización Inventario', url: '/inventario/inicializacion-inventario' },
      //{ permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', icono: 'assets/icono-stock.svg', titulo: 'Existencias', url: '/inventario/existencias' }, // PRUEBA
      //{ permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', icono: 'assets/icono-stock-edit.svg', titulo: 'Ajuste de Inventario', url: '/almacen/ajuste-inventario' }, // PRUEBA

    ]
    this.accesosDirectos = [
    ]

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    var permisos =  usuario.permisos.split('|')

    if (permisos.length > 0) {

      for (var i in this.modulos) {
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
