import {  Component,  OnInit,  Output,  Input,  NgZone,  EventEmitter} from '@angular/core';
import {  Title} from '@angular/platform-browser';
import {  Location} from '@angular/common';
import {  FormBuilder,  FormGroup,  Validators,  FormControl,  FormArray} from '@angular/forms';
import {  Observable } from 'rxjs/Observable';
import {  Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import * as FileSaver from 'file-saver';
import {  Mensaje} from '../../../mensaje';
import {  Modelo} from '../modelo';
import {  Insumo} from '../movimiento';

@Component({
  selector: 'salidas-form-insumos',
  templateUrl: './form-insumos.component.html',
  host: {
    '(window:keydown)': 'keyboardInput($event)'
  }
})
export class FormInsumosComponent implements OnInit {
  @Input()  insumos: Insumo[];
  @Input()  movimiento: FormGroup;
  @Input()  insumosAgregados: Insumo[];
  @Output() onMovimientoSalida = new EventEmitter < any > ();
  /*
    @Input('group')
      public insumosForm: FormGroup;*/
  cargando: boolean = false;
  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion: any;
  // # FIN SECCION  
  // # SECCION: Modal Insumos
  mostrarModalInsumos = false;
  //Harima: Lista de claves agregadas al pedido, para checar duplicidad
  listaClaveAgregadas: Array < string > = [];
  // # FIN SECCION
  // # SECCION: Modelo
  // Los pedidos tienen que ser en un array por si se va a generar mas de un pedido de golpe
  pedidos: Modelo[] = [];
  // esta variable es para saber el pedido seleccionado (por si hay mas)
  private pedidoActivo: number = 0;
  // # FIN SECCION
  // # SECCION: Reportes
  private pdfworker: Worker;
  private cargandoPdf: boolean = false;
  // # FIN SECCION
  constructor(private title: Title, private location: Location, private _ngZone:
    NgZone) {}
  ngOnInit() {
    this.title.setTitle('Nueva salida / Farmacia');
    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker("web-workers/farmacia/pedidos/imprimir.js")
    // Este es un hack para poder usar variables del componente dentro de una funcion del worker
    var self = this;
    var $ngZone = this._ngZone;
    this.pdfworker.onmessage = function(evt) {
      // Esto es un hack porque estamos fuera de contexto dentro del worker
      // Y se usa esto para actualizar alginas variables
      $ngZone.run(() => {
        self.cargandoPdf = false;
      });
      FileSaver.saveAs(self.base64ToBlob(evt.data.base64, 'application/pdf'),
        evt.data.fileName);
      //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
    };
    this.pdfworker.onerror = function(e) {
      $ngZone.run(() => {
        self.cargandoPdf = false;
      });
      console.log(e)
    };
    // Inicialicemos el pedido
    this.pedidos.push(new Modelo(true));
    //this.pedidos[0].nombre = "General";
    this.pedidos[0].observaciones = null;
    //console.log(this.pedidos[0]);
    // this.insumosAgregados.push(new Insumo());
  }
  regresar() {
    this.location.back();
  }
  toggleModalInsumos() {
    //console.log(this.mostrarModalInsumos)
    this.mostrarModalInsumos = !this.mostrarModalInsumos
    //console.log(this.mostrarModalInsumos)
  }

  // # SECCION Funciones globales
  agregarItem(item: any = {}) {
    let auxPaginasTotales = this.pedidos[this.pedidoActivo].paginacion.totalPaginas;

      console.log(this.insumosAgregados);
      console.log(item.lotes.length);
      console.log(item);
    if (item.lotes.lenght <= 0 || !item.lotes.length) {
      console.log("SIN ITEMS QUE AGREGAR");
    } else {
      this.pedidos[this.pedidoActivo].lista.push(item);
      var existe = false;
      var posicion = 0;
      var i = 0;
      for (let insumo of this.insumosAgregados) {
        if (insumo.clave == item.clave) {
          existe = true;
          posicion = i;
        }
        i++;
      }
      item.cantidad = 0;
      i = 0;
      for (let val of item.lotes) {
        console.log(val);
        if (!val.cantidad) {
          item.lotes.splice(i, 1);
        } else if (val.cantidad == "" || val.cantidad == 0) {
          item.lotes.splice(i, 1);
        }
        if (!val.lote) {
          item.lotes.splice(i, 1);
        }
        if (val.lote == "") {
          item.lotes.splice(i, 1);
        }
        if (val.cantidad && val.cantidad > 0) {
          console.log(val.cantidad);
          item.cantidad = item.cantidad + val.cantidad;
        } else {
          item.lotes.splice(i, 1);
        }
        i++;
      }
      if (!existe) {
        let insumo = new Insumo();
        //insumo = item;
        insumo.descripcion = item.descripcion;
        insumo.informacion = item.informacion;
        insumo.generico_nombre = item.generico_nombre;
        insumo.tipo = item.tipo;
        insumo.es_causes = item.es_causes;
        insumo.clave = item.clave;
        insumo.cantidad = item.cantidad;
        insumo.cantidad_x_envase = Number(item.informacion.cantidad_x_envase);
        insumo.codigo_barras = item.codigo_barras;
        insumo.lotes = item.lotes;
        //insumo.lote = item.lote;
        insumo.fecha_caducidad = item.fecha_caducidad;
        insumo.filtro = item.filtro;
        insumo.paginacion = item.paginacion;
        console.log(insumo);
        this.insumosAgregados.push(insumo);
      } else {
        for (let valueItem of item.lotes) {
          var encontrado = false;
          for (let insumo of this.insumosAgregados[posicion].lotes) {
            if (valueItem.id == insumo.id) {
              encontrado = true;
              console.log(valueItem.cantidad);
              if (valueItem.cantidad) {
                insumo.cantidad = insumo.cantidad + valueItem.cantidad;
                this.insumosAgregados[posicion].cantidad = this.insumosAgregados[
                  posicion].cantidad + insumo.cantidad;
              }
            }
          }
          if (!encontrado) {
            this.insumosAgregados[posicion].cantidad = this.insumosAgregados[
              posicion].cantidad + valueItem.cantidad;
            this.insumosAgregados[posicion].lotes.push(valueItem);
          }
        }
      }
      for (let val of this.insumosAgregados) {
        val.cantidad = 0;
        for (let item of val.lotes) {
          if (item.cantidad > 0) {
            val.cantidad = val.cantidad + item.cantidad;
          }
        }
      }
      this.pedidos[this.pedidoActivo].indexar();
      console.log("pedidos");
      console.log(this.pedidos);
      console.log("insumosAgregados");
      console.log(this.insumosAgregados);
      // El siguiente proceso es para cambiar de página automáticamente si se encuentra en la última.
      if (this.pedidos[this.pedidoActivo].paginacion.lista.length == this.pedidos[
          this.pedidoActivo].paginacion.resultadosPorPagina &&
        this.pedidos[this.pedidoActivo].paginacion.paginaActual ==
        auxPaginasTotales &&
        !this.pedidos[this.pedidoActivo].filtro.activo) {
        this.pedidos[this.pedidoActivo].listar(this.pedidos[this.pedidoActivo]
          .paginacion.paginaActual + 1);
      } else {
        this.pedidos[this.pedidoActivo].listar(this.pedidos[this.pedidoActivo]
          .paginacion.paginaActual);
      }
    }
  }

  buscar(e: KeyboardEvent, input: HTMLInputElement, inputAnterior:
    HTMLInputElement, parametros: any[]) {
    let term = input.value;
    // Quitamos la busqueda
    if (e.keyCode == 27) {
      e.preventDefault();
      e.stopPropagation();
      input.value = "";
      inputAnterior.value = "";
      this.pedidos[this.pedidoActivo].filtro.activo = false;
      this.pedidos[this.pedidoActivo].filtro.lista = [];
      //this.insumosAgregados[this.pedidoActivo].filtro.activo = false;
      return;
    }
    //Verificamos que la busqueda no sea la misma que la anterior para no filtrar en vano
    if (inputAnterior.value == term) {
      return
    }
    e.preventDefault();
    e.stopPropagation();
    inputAnterior.value = term;
    if (term != "") {
      this.pedidos[this.pedidoActivo].filtro.activo = true;
    } else {
      this.pedidos[this.pedidoActivo].filtro.activo = false;
      this.pedidos[this.pedidoActivo].filtro.lista = [];
      return;
    }
    var arregloResultados: any[] = []
    for (let i in parametros) {
      let termino = (parametros[i].input as HTMLInputElement).value;
      if (termino == "") {
        continue;
      }
      let listaFiltrada = this.pedidos[this.pedidoActivo].lista.filter((item) => {
        var cadena = "";
        let campos = parametros[i].campos;
        for (let l in campos) {
          try {
            // Esto es por si escribieron algo como "objeto.propiedad" en lugar de: "propiedad"
            let prop = campos[l].split(".");
            if (prop.length > 1) {
              cadena += " " + item[prop[0]][prop[1]].toLowerCase();
            } else {
              cadena += " " + item[campos[l]].toLowerCase();
            }
          } catch (e) {}
        }
        return cadena.includes(termino.toLowerCase())
      });
      arregloResultados.push(listaFiltrada)
    }
    if (arregloResultados.length > 1) {
      // Ordenamos Ascendente
      arregloResultados = arregloResultados.sort(function(a, b) {
        return a.length - b.length
      });
      var filtro = arregloResultados[0];
      var match: any[] = [];
      for (let k = 1; k < arregloResultados.length; k++) {
        for (let i in arregloResultados[k]) {
          for (let j in filtro) {
            if (arregloResultados[k][i] === filtro[j]) {
              match.push(filtro[j]);
            }
          }
        };
      }
      this.pedidos[this.pedidoActivo].filtro.lista = match;
    } else {
      this.pedidos[this.pedidoActivo].filtro.lista = arregloResultados[0];
    }
    this.pedidos[this.pedidoActivo].filtro.indexar(false);
    this.pedidos[this.pedidoActivo].filtro.paginacion.paginaActual = 1;
    this.pedidos[this.pedidoActivo].filtro.listar(1);
  }
  eliminarInsumo(item: any[], index: number) {
    this.insumosAgregados.splice(index, 1);
  }
  eliminarLote(i, index: number) {
    this.insumosAgregados[i].lotes.splice(index, 1);
    if (this.insumosAgregados[i].lotes.length == 0) {
      this.insumosAgregados.splice(i, 1);
    }
  }
  /*
    //Harima: necesitamos eliminar también de la lista de claves agregadas
    eliminarInsumo(item,index,filtro:boolean = false){
      //Harima: eliminar el elemento en la lista de claves agregadas, para poder agregarla de nuevo si se desea
      var i = this.listaClaveAgregadas.indexOf(item.clave);
      this.listaClaveAgregadas.splice(i,1);

      //Harima: si no es el filtro(busqueda), borrar de la lista principal de insumos
      if(!filtro){
        this.pedidos[this.pedidoActivo].eliminarItem(item,index);
      }else{
        this.pedidos[this.pedidoActivo].filtro.eliminarItem(item,index);
      }
    }*/
  mostrarFichaInformativa(e, clave: string) {
    e.preventDefault();
    e.stopPropagation();
    // Mostrar el componente de Ficha Informativa
    // Falta hacerlo sumamiiiii :)
    alert(clave);
    console.log(clave);
  }
  // # SECCION: Eventos del teclado
  keyboardInput(e: KeyboardEvent) {
    if (e.keyCode == 32 && e.ctrlKey) { // Ctrl + barra espaciadora
      event.preventDefault();
      event.stopPropagation();
      this.mostrarModalInsumos = true;
    }
    // Cambiar página hacia adelante ctrl + shift + ->
    if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
      event.preventDefault();
      event.stopPropagation();
      if (!this.pedidos[this.pedidoActivo].filtro.activo) {
        this.pedidos[this.pedidoActivo].paginaSiguiente();
      } else {
        this.pedidos[this.pedidoActivo].filtro.paginaSiguiente();
      }
    }
    // Cambiar página hacia adelante ctrl + shift + <-
    if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey)) {
      event.preventDefault();
      event.stopPropagation();
      if (!this.pedidos[this.pedidoActivo].filtro.activo) {
        this.pedidos[this.pedidoActivo].paginaAnterior();
      } else {
        this.pedidos[this.pedidoActivo].filtro.paginaAnterior();
      }
    }
  }
  // # SECCION - Webworkers
  imprimir() {
    try {
      this.cargandoPdf = true;
      var pedidos_imprimir = {
        datos: {
          alamcen: 'colicitar',
          solicitante: 'unidad',
          observaciones: 'texto'
        },
        lista: this.pedidos[this.pedidoActivo].lista
      };
      this.pdfworker.postMessage(JSON.stringify(pedidos_imprimir));
    } catch (e) {
      this.cargandoPdf = false;
      console.log(e);
    }
  }
  base64ToBlob(base64, type) {
    var bytes = atob(base64),
      len = bytes.length;
    var buffer = new ArrayBuffer(len),
      view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++)
      view[i] = bytes.charCodeAt(i) & 0xff;
    return new Blob([buffer], {
      type: type
    });
  }
}