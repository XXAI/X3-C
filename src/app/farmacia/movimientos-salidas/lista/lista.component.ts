import { Component, OnInit, NgZone } from '@angular/core';
import { Title} from  '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';


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

import { MovimientosSalidasService } from  '../movimientos-salidas.service';


import { Modelo } from '../modelo';
import { Mensaje } from '../../../mensaje';
import { Movimiento }  from '../movimiento';

@Component({
  selector: 'farmacia-salidas-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [MovimientosSalidasService]
})
export class ListaComponent implements OnInit {

  cargando: boolean = false;
  public movimiento: FormGroup;

  mostrarModalCancelado = false;
  private usuario;
  private tipo: number = 2;

  tipo_salida: number;
  titulo: string;

    // # SECCION: Reportes
  private pdfworker:Worker;
  private cargandoPdf:boolean = false;
  // # FIN SECCION

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  datos_imprimir: Modelo[] = [];
  // # FIN SECCION

  // # SECCION: Lista de Modelos, hay que CAMBIAR a movimientos
  items: Modelo[] = [];
  //dato: Movimiento[] = [];
  public dato: Movimiento;
  public index: any;
  private paginaActual = 1;
  resultadosPorPagina = 10;
  total = 0;
  private paginasTotales = 0;
  private indicePaginas:number[] = []
  // # FIN SECCION

   // # SECCION: Resultados de búsqueda
  private ultimoTerminoBuscado = "";
  private terminosBusqueda = new Subject<string>();
  private resultadosBusqueda: Modelo[] = [];
  busquedaActivada:boolean = false;
  private paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 5;
  totalBusqueda = 0;
  private paginasTotalesBusqueda = 0;
  private indicePaginasBusqueda:number[] = []
  // # FIN SECCION

  constructor(
    private title: Title, 
    private route: ActivatedRoute,
    private movimientosSalidasService: MovimientosSalidasService,
    private fb: FormBuilder,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {


    switch(this.route.snapshot.url[0].path){
      case 'estandar': 
        this.tipo_salida = 2;
        this.titulo = "Estandar";
        console.log(this.tipo_salida); break;
      case 'receta': 
        this.tipo_salida = 5;
        this.titulo = "Por receta";
        console.log(this.tipo_salida); break;
      default: this.tipo_salida = 2; this.titulo = "Estandar"; break;
    }

    this.title.setTitle("Salidas / Almacen");

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.listar(1, this.tipo_salida);
    
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
      return term  ? this.movimientosSalidasService.buscar(this.tipo_salida, term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda, this.usuario.almacen_activo.id) : Observable.of<any>({data:[]}) 
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
        this.resultadosBusqueda = resultado.data as Modelo[];
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
    this.pdfworker = new Worker("web-workers/farmacia/movimientos/imprimir-salida.js")

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


    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    this.movimiento = this.fb.group({
        almacen_id: ['', [Validators.required]],
        tipo_movimiento_id: ['', [Validators.required]],
        fecha_movimiento: ['', [Validators.required]],
        observaciones: ['', [Validators.required]],
        cancelado: ['', [Validators.required]],
        observaciones_cancelacion: ['', [Validators.required]],
        insumos: this.fb.array([
          this.initInsumo(),
        ])
      });
  } //Fin ngOnInit

  initInsumo() {
        return this.fb.group({
            clave: ['', Validators.required],
            cantidad: ['', Validators.required],
            cantidad_x_envase: ['', Validators.required],
            lote:  ['', Validators.required],
            fecha_caducidad:  ['', Validators.required],
            codigo_barras:  ['', Validators.required],
        });
    }

  toggleModalCancelado(item: Movimiento, index){
    this.mostrarModalCancelado = !this.mostrarModalCancelado
    this.dato = item;
    this.index = index;

  }

  guardar(item: Movimiento){
    console.log(item);
    item.cancelado=1;
     this.movimientosSalidasService.editar(item.id,item).subscribe(
        movimiento => {
          this.cargando = false;
          console.log("Movimiento editado.");

          this.mensajeExito = new Mensaje(true);
          this.mensajeExito.texto = "Se han guardado los cambios.";
          this.mensajeExito.mostrar = true;
        },
        error => {
          this.cargando = false;
          
          this.mensajeError = new Mensaje(true);
          this.mensajeError.texto = "No especificado.";
          this.mensajeError.mostrar = true;      
          
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
            // Problema de validación
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

  buscar(term: string): void {
    this.terminosBusqueda.next(term);
  }

  listarBusqueda(term:string ,pagina:number): void {
    this.paginaActualBusqueda = pagina;
    console.log("Cargando búsqueda.");
   
    this.cargando = true;
    this.movimientosSalidasService.buscar(this.tipo_salida, term, pagina, this.resultadosPorPaginaBusqueda, this.usuario.almacen_activo.id).subscribe(
        resultado => {
          this.cargando = false;

          this.resultadosBusqueda = resultado.data as Modelo[];

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
  }  //Fin listarBusqueda

  enviarTipo(tipo: number){
    this.tipo = tipo; 
    //this.listar(1);
  }

  listar(pagina:number, tipo: number): void {
    this.paginaActual = pagina;
    //console.log("Cargando usuarios.");
   
    this.cargando = true;
    //Peticion a la API
    this.movimientosSalidasService.lista(pagina, this.resultadosPorPagina, this.usuario.almacen_activo.id, tipo).subscribe(
        resultado => {
          this.cargando = false;
          if(resultado.data){
            this.items = resultado.data.data as Modelo[];
          }else{
            this.items=[];
          }

          this.total = resultado.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }

          //console.log("Items cargados.");
          
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
  } //Fin listar

  eliminar(item: Modelo, index): void {
    item.cargando = true;
    this.movimientosSalidasService.eliminar(item.id).subscribe(
        data => {
          item.cargando = false;
          this.items.splice(index, 1);  
          console.log("Se eliminó el elemento de la lista.");

          this.mensajeExito = new Mensaje(true)
          this.mensajeExito.mostrar = true;
          this.mensajeExito.texto = "Usuario eliminado";
        },
        error => {
          item.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = function(){
            this.eliminar(item, index);
          }
        
          
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
  }//Fin eliminar

  // # SECCION: Paginación
  paginaSiguiente():void {
    this.listar(this.paginaActual+1, this.tipo_salida);
  }
  paginaAnterior():void {
    this.listar(this.paginaActual-1, this.tipo_salida);
  }

  paginaSiguienteBusqueda(term:string):void {
    this.listarBusqueda(term,this.paginaActualBusqueda+1);
  }
  paginaAnteriorBusqueda(term:string):void {
    this.listarBusqueda(term,this.paginaActualBusqueda-1);
  }
  // Fin # SECCION: Paginación
  
  // # SECCION - Webworkers

  imprimir(item: Modelo, index) {
    
    console.log(item.id);
    console.log(item);
    this.movimientosSalidasService.ver(item.id).subscribe(
          movimientoActual => {
            this.cargando = false;
            item.datosImprimir = movimientoActual;
            console.log(item.datosImprimir);
            
                try {
                this.cargandoPdf = true;
                var entradas_imprimir = {
                  datos: item,
                  lista: item.datosImprimir.insumos
                };
                this.pdfworker.postMessage(JSON.stringify(entradas_imprimir));
              } catch (e){
                this.cargandoPdf = false;
                console.log(e);
              }
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

  base64ToBlob( base64, type ) {
      var bytes = atob( base64 ), len = bytes.length;
      var buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( var i=0 ; i < len ; i++ )
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type: type } );
  }

}
