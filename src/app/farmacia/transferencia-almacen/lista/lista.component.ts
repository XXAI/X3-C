import { Component, OnInit, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription }   from 'rxjs/Subscription';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import  * as FileSaver    from 'file-saver';

import { TransferenciaAlmacenService } from '../transferencia-almacen.service';
import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';

import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'transferencia-almacen-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [TransferenciaAlmacenService]
})
export class ListaComponent implements OnInit {
  cargando: boolean = false;

  soloLectura: boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION

  // # SECCION: Lista
  status: string;
  tipo:string = '';
  titulo: string = "Pedidos";
  icono = "fa-file";
  pedidos: any[] = [];
  paginaActual = 1;
  resultadosPorPagina = 10;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = []
  // # FIN SECCION

   /**
   * Objeto para los reportes con web Webworkers.
   * @type {Worker}
   */
  pdfworker: Worker;

   /**
   * Contiene la lista general de los datos para enviarlo al PDF.
   * @type {any} */
  lista_impresion;

  // # SECCION: Resultados de búsqueda
  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: any[] = [];
  busquedaActivada:boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 10;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda:number[] = []
  // # FIN SECCION

  cambiarEntornoSuscription: Subscription;

  constructor(private title: Title, private route: ActivatedRoute, private transferenciaAlmacenService: TransferenciaAlmacenService, private cambiarEntornoService:CambiarEntornoService, private _ngZone: NgZone) { }

  ngOnInit() {
    switch(this.route.snapshot.url[0].path){
      //case 'todos': this.status = "TODO"; this.titulo = "Todos"; this.icono = "fa-file"; break;
      case 'borradores': this.status = "BR"; this.titulo = "Borradores"; this.icono = "fa-pencil-square-o"; break;
      case 'por-surtir': this.status = "SD"; this.titulo = "Solicitudes por surtir"; this.icono = "fa-inbox"; break;
      case 'en-transito': this.status = "ET"; this.titulo = "En transito"; this.icono = "fa-clock-o"; break;
      case 'por-finalizar': this.status = "PFI"; this.titulo = "Por finalizar"; this.icono = "fa-check"; break;
      case 'finalizados': this.status = "FI"; this.titulo = "Finalizados"; this.icono = "fa-check-circle"; break;
      case 'cancelados': this.status = "EX-CA"; this.titulo = "Cancelados"; this.icono = "fa-times-circle"; break;
      default: this.titulo = "Transferencias"; this.icono = "fa-file"; break;
    }
    console.log('inicializar lista de pedidos');
    this.title.setTitle("Pedidos");
    
    this.cambiarEntornoSuscription = this.cambiarEntornoService.entornoCambiado$.subscribe(evento => {
      console.log('subscripcion en lista de pedidos');
      this.listar(this.paginaActual);

      var usuario =  JSON.parse(localStorage.getItem("usuario"));
      this.soloLectura = usuario.solo_lectura;
    });

    this.listar(1);
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    var usuario =  JSON.parse(localStorage.getItem("usuario"));
    this.soloLectura = usuario.solo_lectura;

    var self = this;

    var busquedaSubject = this.terminosBusqueda
    .debounceTime(300) // Esperamos 300 ms pausando eventos
    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
    .switchMap((term:string)  =>  { 
      console.log("Cargando búsqueda.");
      this.busquedaActivada = term != "" ? true: false;

      this.ultimoTerminoBuscado = term;
      this.paginaActualBusqueda = 1;
      this.cargando = true;
      return term  ? this.transferenciaAlmacenService.buscar(this.status,term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda, this.tipo) : Observable.of<any>({data:[]}) 
    }
      
    
    ).catch( function handleError(error){ 
     
      self.cargando = false;      
      self.mensajeError.mostrar = true;
      self.ultimaPeticion = function(){self.listarBusqueda(self.ultimoTerminoBuscado,self.paginaActualBusqueda);};//OJO
      try {
        let e = error.json();
        if (error.status == 401 ){
          self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
        }
      } catch(e){
        console.log("No se puede interpretar el error");
        
        if (error.status == 500 ){
          self.mensajeError.texto = "500 (Error interno del servidor)";
        } else {
          self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
        }            
      }
      // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
      return busquedaSubject
    
    });

    busquedaSubject.subscribe(
      resultado => {
        this.cargando = false;

        let parsed = resultado.data ;
        for(var i in parsed) {
          parsed[i].created_at = parsed[i].created_at.replace(" ","T");

        }

        this.resultadosBusqueda = parsed as any[];
        this.totalBusqueda = resultado.total | 0;
        this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

        this.indicePaginasBusqueda = [];
        for(let i=0; i< this.paginasTotalesBusqueda; i++){
          this.indicePaginasBusqueda.push(i+1);
        }
        
        console.log("Búsqueda cargada.");
      }

    );

     // Inicializamos el objeto para los reportes con web Webworkers
     this.pdfworker = new Worker('web-workers/farmacia/transferencia/imprimir-acuse.js');

     // Este es un hack para poder usar variables del componente dentro de una funcion del worker
     let $ngZone = this._ngZone;
 
     this.pdfworker.onmessage = function( evt ) {
       // Esto es un hack porque estamos fuera de contexto dentro del worker
       // Y se usa esto para actualizar alginas variables
       $ngZone.run(() => {
          //self.cargandoPdf = false;
       });
 
       FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
       // open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
     };
  }

  obtenerDireccion(id:string, status:string): string{
    if(status == 'BR'){
      return '/almacen/transferencia-almacen/editar/'+id;
    }else if(status == 'SD' || status == 'ET'){
      return '/almacen/transferencia-almacen/surtir/'+id;
    }else{
      return '/almacen/transferencia-almacen/ver/'+id;
    }
  }
   imprimir_reporte(id: string): void
   {
      //console.log(id);
      try {
        let pedido = id;
  
        this.transferenciaAlmacenService.reporte_acuse(pedido).subscribe(
          resultado => {
                  /*this.cargando = false;
                  
                  this.cargandoPdf = false;*/
                  
                  this.lista_impresion = resultado;
                  let datos_imprimir = {
                    pedido: this.lista_impresion.pedido,
                    fecha: this.lista_impresion.fecha_completa
                  };
                  console.log(datos_imprimir);
                  this.pdfworker.postMessage(JSON.stringify(datos_imprimir));
                },
                error => {
                  //this.cargandoPdf = false;
                }
        );
      } catch (e) {
        console.log(e);
        //this.cargandoPdf = false;
      }
   }
  
  buscar(term: string): void {
    this.terminosBusqueda.next(term);
  }

  listarBusqueda(term:string ,pagina:number): void {
    this.paginaActualBusqueda = pagina;
    console.log("Cargando búsqueda.");
   
    this.cargando = true;
    this.transferenciaAlmacenService.buscar(this.status, term, pagina, this.resultadosPorPaginaBusqueda, this.tipo).subscribe(
        resultado => {
          this.cargando = false;

          let parsed = resultado.data ;
          for(var i in parsed) {
            parsed[i].created_at = parsed[i].created_at.replace(" ","T"); // En safari fallan las fechas por eso se pone esto

          }

          this.resultadosBusqueda = parsed as any[];

          this.totalBusqueda = resultado.total | 0;
          this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

          this.indicePaginasBusqueda = [];
          for(let i=0; i< this.paginasTotalesBusqueda; i++){
            this.indicePaginasBusqueda.push(i+1);
          }

          console.log("Búsqueda cargada.");
          
        },
        error => {
          this.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = function(){this.listarBusqueda(term,pagina);};
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }            
          }

        }
      );
  }

  listar(pagina:number): void {
    this.paginaActual = pagina;
    console.log("Cargando pedidos.");
   
    this.cargando = true;
    this.transferenciaAlmacenService.lista(this.status, pagina,this.resultadosPorPagina, this.tipo).subscribe(
        resultado => {
          this.cargando = false;
          this.pedidos = resultado.data as any[];

          this.total = resultado.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }

          console.log("Pedidos cargados.");
          
        },
        error => {
          this.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = this.listar;
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }            
          }

        }
      );
  }

  eliminar(pedido: any, index): void {
    pedido.cargando = true;
    if(confirm('Desea eliminar el pedido?')){
      this.transferenciaAlmacenService.eliminar(pedido.id).subscribe(
        data => {
          pedido.cargando = false;
          this.pedidos.splice(index, 1);  
          console.log("Se eliminó el elemento de la lista.");

          this.mensajeExito = new Mensaje(true)
          this.mensajeExito.mostrar = true;
          this.mensajeExito.texto = "Pedido eliminado";
          
        },
        error => {
          pedido.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = function(){
            this.eliminar(pedido, index);
          }
        
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }else{
              this.mensajeError.texto = e.error;
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }
          }
          
        }
      );
    }else{
      pedido.cargando = false;
    }
  }

  /**
   * Método que realiza una conversión de base64 a Blob
   * @param base64 Formato en el que llega el dato
   * @param type Tipo al que se convertira.
   */
  base64ToBlob( base64, type ) {
    let bytes = atob( base64 );
    let len = bytes.length;
    let buffer = new ArrayBuffer( len );
    let view = new Uint8Array( buffer );

    for ( let i = 0 ; i < len ; i++ ) {
      view[i] = bytes.charCodeAt(i) & 0xff;
    }
    return new Blob( [ buffer ], { type: type } );
  }

  // # SECCION: Paginación
  paginaSiguiente():void {
    this.listar(this.paginaActual+1);
  }
  paginaAnterior():void {
    this.listar(this.paginaActual-1);
  }

  paginaSiguienteBusqueda(term:string):void {
    this.listarBusqueda(term,this.paginaActualBusqueda+1);
  }
  paginaAnteriorBusqueda(term:string):void {
    this.listarBusqueda(term,this.paginaActualBusqueda-1);
  }

  ngOnDestroy(){
    this.cambiarEntornoSuscription.unsubscribe();
  }

}
