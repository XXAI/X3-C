import { Component, OnInit } from '@angular/core';
import { Title} from  '@angular/platform-browser';
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

import { MovimientosEntradasService } from  '../movimientos-entradas.service';


import { Modelo } from '../modelo';
import { Mensaje } from '../../../mensaje';
import { Movimiento }  from '../movimiento';

@Component({
  selector: 'farmacia-entradas-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [MovimientosEntradasService]
})
export class ListaComponent implements OnInit {

  cargando: boolean = false;
  public movimiento: FormGroup;

  private mostrarModalCancelado = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION
  
  datos : any[];
  private almacenId: string;
  private usuario: any ={};

  // # SECCION: Lista de Modelos, hay que CAMBIAR a movimientos
  items: Modelo[] = [];
  //dato: Movimiento[] = [];
  public dato: Movimiento;
  public index: any;
  private paginaActual = 1;
  private resultadosPorPagina = 5;
  private total = 0;
  private paginasTotales = 0;
  private indicePaginas:number[] = []
  // # FIN SECCION

   // # SECCION: Resultados de búsqueda
  private ultimoTerminoBuscado = "";
  private terminosBusqueda = new Subject<string>();
  private resultadosBusqueda: Modelo[] = [];
  private busquedaActivada:boolean = false;
  private paginaActualBusqueda = 1;
  private resultadosPorPaginaBusqueda = 5;
  private totalBusqueda = 0;
  private paginasTotalesBusqueda = 0;
  private indicePaginasBusqueda:number[] = []
  // # FIN SECCION

  constructor(
    private title: Title,
    private movimientosEntradasService: MovimientosEntradasService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.title.setTitle("Entradas / Farmacia");

    this.obtenerAlmacenId();
    this.listar(1);
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

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
      return term  ? this.movimientosEntradasService.buscar(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda) : Observable.of<any>({data:[]}) 
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

  obtenerAlmacenId(){

      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      
      this.movimientosEntradasService.listaDatos("almacenes").subscribe(
       datos => {
         this.datos = datos;
         for (let data of this.datos) {
           for(let usuario of data.usuarios){
             console.log("usuario");
             console.log(usuario);
             if(usuario.usuario_id==this.usuario.id){
              this.movimiento.value.almacen_id= usuario.almacen_id;
              this.almacenId = usuario.almacen_id;
              console.log(this.almacenId);
             }
           }
          }
         console.log(this.datos);
        }, //Bind to view
       err => {
              // Log errors if any
              console.log(err);
          });
  }
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
     this.movimientosEntradasService.editar(item.id,item).subscribe(
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
    this.movimientosEntradasService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
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

  listar(pagina:number): void {
    this.paginaActual = pagina;
    console.log("Cargando usuarios.");
   
    this.cargando = true;
    //Peticion a la API
    this.movimientosEntradasService.lista(pagina,this.resultadosPorPagina).subscribe(
        resultado => {
          this.cargando = false;
          this.items = resultado.data as Modelo[];

          console.log(this.items);

          this.total = resultado.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }

          console.log("Items cargados.");
          
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
    this.movimientosEntradasService.eliminar(item.id).subscribe(
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
  // Fin # SECCION: Paginación

}
