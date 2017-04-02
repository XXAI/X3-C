import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import  * as FileSaver    from 'file-saver'; 


import { PedidosService } from '../../pedidos/pedidos.service';

import { Pedido } from '../../pedidos/pedido';
import { Mensaje } from '../../../mensaje';



@Component({
  selector: 'app-surtir',
  templateUrl: './surtir.component.html',
  styleUrls: ['./surtir.component.css']
})
export class SurtirComponent implements OnInit {
  id:string ;
  cargando: boolean = false;
  
   // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeAdvertencia: Mensaje = new Mensaje()
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion: any;
  // # FIN SECCION  

  private pedido: Pedido; 
  
  constructor(private title: Title, private route:ActivatedRoute, private pedidosService:PedidosService) { }

  ngOnInit() {
    this.title.setTitle('Surtir pedido / Farmacia');
    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
      //this.cargarDatos();
    });

    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number      
    });
    this.cargando = true;
    this.pedidosService.ver(this.id).subscribe(
          pedido => {
            this.cargando = false;
            console.log(pedido)
            //this.datosCargados = true;
            //this.pedido.datos.patchValue(pedido);
            this.pedido = new Pedido(true);
            for(let i in pedido.insumos){
              let dato = pedido.insumos[i];
              let insumo = dato.insumos_con_descripcion;
              insumo.cantidad = +dato.cantidad_solicitada_um;
              this.pedido.lista.push(insumo);
             // this.listaClaveAgregadas.push(insumo.clave);
            }
            /*
            this.pedido.indexar();
            this.pedido.listar(1);*/
          },
          error => {
            this.cargando = false;

            this.mensajeError = new Mensaje(true);
            this.mensajeError = new Mensaje(true);
            this.mensajeError.mostrar;

            try {
              let e = error.json();
              if (error.status == 401 ){
                this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
              }
              
            } catch(e){
                          
              if (error.status == 500 ){
                this.mensajeError.texto = "500 (Error interno del servidor)";
              } else {
                this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
              }            
            }
          }
    );
  }

}
