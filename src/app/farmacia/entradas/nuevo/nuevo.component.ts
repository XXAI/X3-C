import { Component, OnInit, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location}           from '@angular/common';
import { FormControl } from '@angular/forms';

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

import { Mensaje } from '../../../mensaje';

import { Entrada } from '../entrada';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
  host: { '(window:keydown)' : 'keyboardInput($event)'}
})


export class NuevoComponent implements OnInit {

  cargando: boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION  

  // # SECCION: Modal Insumos
  private mostrarModalInsumos = false;
  //Harima: Lista de claves agregadas al entrada, para checar duplicidad
  listaClaveAgregadas: Array<string> = [];
  // # FIN SECCION

  // # SECCION: Entrada
  
  // Los entradas tienen que ser en un array por si se va a generar mas de un entrada de golpe
  private entradas: Entrada[] = []; 
  // esta variable es para saber el entrada seleccionado (por si hay mas)
  private entradaActivo:number = 0; 
  
  // # FIN SECCION


  // # SECCION: Reportes
  private pdfworker:Worker;
  private cargandoPdf:boolean = false;
  // # FIN SECCION


  constructor(private title:Title, private location:Location, private _ngZone: NgZone) { }

  ngOnInit() {
    this.title.setTitle('Nuevo entrada / Farmacia');

    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker("web-workers/farmacia/entradas/imprimir.js")
    
    // Este es un hack para poder usar variables del componente dentro de una funcion del worker
    var self = this;    
    var $ngZone = this._ngZone;

    this.pdfworker.onmessage = function( evt ) {       
      
      
      // Esto es un hack porque estamos fuera de contexto dentro del worker
      // Y se usa esto para actualizar alginas variables
      $ngZone.run(() => {
         self.cargandoPdf = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
      //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
    };
    this.pdfworker.onerror = function( e ) {
      $ngZone.run(() => {
         self.cargandoPdf = false;
      });
      console.log(e)
    };
    
    

    // Inicialicemos el entrada
    this.entradas.push(new Entrada(true) );
    this.entradas[0].nombre = "General";
    this.entradas[0].observaciones = null;

    
  }
  regresar(){
    
    this.location.back();
  }

  toggleModalInsumos(){
    //console.log(this.mostrarModalInsumos)
    this.mostrarModalInsumos = !this.mostrarModalInsumos
    //console.log(this.mostrarModalInsumos)
  }

  // # SECCION Funciones globales
  
  agregarItem(item:any = {}){
    let auxPaginasTotales = this.entradas[this.entradaActivo].paginacion.totalPaginas;
   
    this.entradas[this.entradaActivo].lista.push(item);
    
    this.entradas[this.entradaActivo].indexar();

    // El siguiente proceso es para cambiar de página automáticamente si se encuentra en la última.
    
    if(this.entradas[this.entradaActivo].paginacion.lista.length == this.entradas[this.entradaActivo].paginacion.resultadosPorPagina
      && this.entradas[this.entradaActivo].paginacion.paginaActual == auxPaginasTotales
      && !this.entradas[this.entradaActivo].filtro.activo){
        this.entradas[this.entradaActivo].listar(this.entradas[this.entradaActivo].paginacion.paginaActual + 1);
    } else {
      this.entradas[this.entradaActivo].listar(this.entradas[this.entradaActivo].paginacion.paginaActual);
    }
    
  }
  
  buscar(e: KeyboardEvent, input:HTMLInputElement, inputAnterior: HTMLInputElement,  parametros:any[]){
    
    let term = input.value;

    // Quitamos la busqueda
    if(e.keyCode == 27){
      e.preventDefault();
      e.stopPropagation();
      input.value = "";
      inputAnterior.value = "";

      this.entradas[this.entradaActivo].filtro.activo = false;
      this.entradas[this.entradaActivo].filtro.lista = [];      

      return;      
    }

    
    //Verificamos que la busqueda no sea la misma que la anterior para no filtrar en vano
    if(inputAnterior.value == term){
      
      return
    }

    e.preventDefault();
    e.stopPropagation();

    inputAnterior.value = term;    

    if(term != ""){
      this.entradas[this.entradaActivo].filtro.activo = true;      
    } else {
      this.entradas[this.entradaActivo].filtro.activo = false;
      this.entradas[this.entradaActivo].filtro.lista = [];
      return;
    }

    var arregloResultados:any[] = []
    for(let i in parametros){

      let termino = (parametros[i].input as HTMLInputElement).value;
      if(termino == ""){
        continue;
      }
            
      let listaFiltrada = this.entradas[this.entradaActivo].lista.filter((item)=> {   
        var cadena = "";
        let campos = parametros[i].campos;
        for (let l in campos){
          try{
            // Esto es por si escribieron algo como "objeto.propiedad" en lugar de: "propiedad"
            let prop = campos[l].split(".");            
            if (prop.length > 1){
              cadena += " " + item[prop[0]][prop[1]].toLowerCase();
            } else {
               cadena += " " + item[campos[l]].toLowerCase();
            }
           
          } catch(e){}
          
        }
        return cadena.includes(termino.toLowerCase())
      });

      arregloResultados.push(listaFiltrada)
    }
    
    if(arregloResultados.length > 1 ){
      // Ordenamos Ascendente

      arregloResultados = arregloResultados.sort( function(a,b){ return  a.length - b.length });
      
      var filtro = arregloResultados[0];
      var match: any[] = [];
      for(let k = 1; k <  arregloResultados.length ; k++){
        
        for(let i in arregloResultados[k]){
          for(let j in filtro){
            if(arregloResultados[k][i] === filtro[j]){
              match.push(filtro[j]);
            }
          }
        };
      }
      this.entradas[this.entradaActivo].filtro.lista = match;
    } else {
      this.entradas[this.entradaActivo].filtro.lista = arregloResultados[0];
    }


    this.entradas[this.entradaActivo].filtro.indexar(false);
    
    this.entradas[this.entradaActivo].filtro.paginacion.paginaActual = 1;
    this.entradas[this.entradaActivo].filtro.listar(1); 

  }

  //Harima: necesitamos eliminar también de la lista de claves agregadas
  eliminarInsumo(item,index,filtro:boolean = false){
    //Harima: eliminar el elemento en la lista de claves agregadas, para poder agregarla de nuevo si se desea
    var i = this.listaClaveAgregadas.indexOf(item.clave);
    this.listaClaveAgregadas.splice(i,1);

    //Harima: si no es el filtro(busqueda), borrar de la lista principal de insumos
    if(!filtro){
      this.entradas[this.entradaActivo].eliminarItem(item,index);
    }else{
      this.entradas[this.entradaActivo].filtro.eliminarItem(item,index);
    }
  }

  mostrarFichaInformativa(e, clave: string){
    e.preventDefault();
    e.stopPropagation();

    // Mostrar el componente de Ficha Informativa
    // Falta hacerlo sumamiiiii :)
    alert(clave);
    console.log(clave);
  }

  // # SECCION: Eventos del teclado
  keyboardInput(e: KeyboardEvent) {
    
    if(e.keyCode == 32 &&  e.ctrlKey){ // Ctrl + barra espaciadora
      event.preventDefault();
      event.stopPropagation();
      
      this.mostrarModalInsumos = true;
    }

    // Cambiar página hacia adelante ctrl + shift + ->
    if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey )){
      event.preventDefault();
      event.stopPropagation();

      if (!this.entradas[this.entradaActivo].filtro.activo){
        this.entradas[this.entradaActivo].paginaSiguiente();
      } else {
        this.entradas[this.entradaActivo].filtro.paginaSiguiente();
      }
      
    }
    // Cambiar página hacia adelante ctrl + shift + <-
    if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey )){
      
      event.preventDefault();
      event.stopPropagation();

      if (!this.entradas[this.entradaActivo].filtro.activo){
        this.entradas[this.entradaActivo].paginaAnterior();
      } else {
        this.entradas[this.entradaActivo].filtro.paginaAnterior();
      }
      
    }
    
        
  }

  // # SECCION - Webworkers

  imprimir() {
    
    try {
      this.cargandoPdf = true;
      var entradas_imprimir = {
        datos:{alamcen:'colicitar',solicitante:'unidad',observaciones:'texto'},
        lista: this.entradas[this.entradaActivo].lista
      };
      this.pdfworker.postMessage(JSON.stringify(entradas_imprimir));
    } catch (e){
      this.cargandoPdf = false;
      console.log(e);
    }
    
  }

  base64ToBlob( base64, type ) {
      var bytes = atob( base64 ), len = bytes.length;
      var buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( var i=0 ; i < len ; i++ )
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type: type } );
  }
}
