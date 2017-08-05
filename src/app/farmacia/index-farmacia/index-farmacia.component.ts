import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { BuscarModuloPipe } from '../../pipes/buscar-modulo.pipe';

@Component({
  selector: 'app-index-farmacia',
  templateUrl: './index-farmacia.component.html',
  styleUrls: ['./index-farmacia.component.css']
})
export class IndexFarmaciaComponent implements OnInit {

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
      { permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk', icono: 'assets/icono-pagina-lista.svg', titulo: 'Pedidos', url: '/almacen/pedidos' },
      { permiso: 'z9MQHY1YAIlYWsPLPF9OZYN94HKjOuDk--', icono: 'assets/icono-pedidos-jurisdiccionales.svg', titulo: 'Pedidos jurisdiccionales', url:"/almacen/pedidos-jurisdiccionales" },
      { permiso: 'iSxK0TpoYpnzf8KIQTWOq9Web7WnSKhz', icono: 'assets/icono-pedidos-alt.svg', titulo:'Entregas de pedidos', url:"/almacen/entregas" },
      
      { permiso: 'GPSDLmXckXcdfdj7lD4rdacwMivsTp9g', icono: 'assets/icono-recetas.svg', titulo:'Recetas', url:'/almacen/salidas-recetas' },
      { permiso: 'qQvNeb1UFPOfVMKQnNkvxyqjCIUgFuEG', icono: 'assets/icono-salidas.svg', titulo:'Salida  de almacén', url:'/almacen/salidas-estandar' },
      { permiso: 'a1OMZVn7dveOf5aUK8V0VsvvSCxz8EMw', icono: 'assets/icono-entradas.svg', titulo:'Entrada  de almacén', url:'/almacen/entradas-estandar' },

      { permiso: 'kWbg08UnfL8fHlOpcNmcTvVbGEU6L8Wz', icono: 'assets/icono-stock.svg', titulo: 'Inventario', url: '/almacen/inventario' },
      { permiso: 'g8YLm8F0e9Zokxq6iSJUndPYro5Ic6tQ', icono: 'assets/icono-stock-edit.svg', titulo: 'Ajuste de Inventario', url: '/almacen/ajuste-inventario' },

      //{ permiso: '', icono: 'assets/hub-almacen.svg', titulo:"Inventario", url:"/farmacia/inventario" },
      //{ permiso: '', icono: 'assets/icono-ajustes-inventario.svg', titulo:"Ajustes de inventario", url:"/farmacia/inventario/ajustes" },
      //{ permiso: '', icono: 'assets/icono-recetas.svg', titulo:"Recetas", url:"/farmacia/recetas" },
      //{ permiso: '', icono: 'assets/icono-colectivo.svg', titulo:"Colectivos", url:"/farmacia/colectivos" },
      //{ permiso: '', icono: 'assets/icono-camion.svg', titulo:"Reabastecimiento", url:"/farmacia/pedidos-reabastecimiento" },
      //{ permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo:"Actas por desabasto", url:"/farmacia/actas" },
      //{ permiso: '', icono: 'assets/icono-pagina-lista.svg', titulo:"Actas colectivas por desabasto", url:"/farmacia/actas-colectivas" },
      
    ]
    this.accesosDirectos = [
      { permiso: '2nC6GUf6E737QwZSxuLORT6rZUDy5YUO', icono: 'assets/icono-pagina-lista.svg', titulo:'Nuevo pedido', url:'/almacen/pedidos/nuevo' },
      { permiso: 'q9ppCvhWdeCJI85YtCrKvtHLaoPipeaT', icono: 'assets/icono-pedidos-alt.svg', titulo:'Recibir pedido', url:'/almacen/pedidos/por-surtir' },
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
