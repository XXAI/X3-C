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
    this.title.setTitle('Inventario');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.modulos = [
      {
        permiso: '7KbTARF2kpnO4Lfqv8hmYP8QGMcgJBwU', icono: 'assets/icono-ajustes-inventario.svg',
        titulo: 'Inicialización Inventario', url: '/inventario/inicializacion-inventario'
      },
      {
        permiso: 'H5IV7Z6CAj8V2CRIQ2wnbXrYhvjLsSBk', icono: 'assets/icono-stock.svg',
        titulo: 'Existencia de insumos médicos', url: '/inventario/existencias'
      },
      {
        permiso: '0oADIo1ltfAl4VMDVbyWgLR3rAhYGjlY', icono: 'assets/icono-ajuste-mas.svg',
        titulo: 'Ajuste más de Inventario', url: '/inventario/ajuste-mas-inventario'
      },
      {
        permiso: 'cE81erieaVjvmhcb9GCYI4doqYGtTcj1', icono: 'assets/icono-ajuste-menos.svg',
        titulo: 'Ajuste menos de Inventario', url: '/inventario/ajuste-menos-inventario'
      },
      {
        permiso: 'cE81erieaVjvmhcb9GCYI4doqYGtTcj1', icono: 'assets/icono-movimientos.svg',
        titulo: 'Movimientos generales', url: '/inventario/movimientos-generales'
      },

      // Para que tienen todas estas pruebas? R=Porque los permisos no están en la BD aún, entonces uso el permiso de pedidos
      // Harima: voy a borrar las pruebas, si necesitas los permisos en la base de datos porfa dile a Joram que los agregue, asi como me mandan por correo la lista, Jomran puede hacer el insert manual en su base de datos
    ];
    this.accesosDirectos = [
    ];

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let permisos =  usuario.permisos.split('|');

    if (permisos.length > 0) {

      for (let i in this.modulos) {
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
          if(permisos[j] == this.accesosDirectos[i].permiso) {
            this.accesosDirectosAutorizados.push(this.accesosDirectos[i]);
            break siguienteItemProtegido;
          }
        }
      }

    }
  }
}
