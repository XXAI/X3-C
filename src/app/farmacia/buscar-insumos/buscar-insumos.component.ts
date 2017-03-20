import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Mensaje } from '../../mensaje';

import { BuscarInsumosService } from './buscar-insumos.service';
import { InsumoMedico } from '../insumo-medico';



@Component({
  selector: 'buscar-insumos',
  templateUrl: './buscar-insumos.component.html',
  styleUrls: ['./buscar-insumos.component.css'], 
  host: { '(document:keydown)' : 'keyboardInput($event)'}
})

export class BuscarInsumosComponent implements OnInit, AfterViewInit {
  
  @ViewChildren('searchBox') searchBoxViewChildren;
  @ViewChildren('cantidadBox') cantidadBoxViewChildren;
  
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onEnviar = new EventEmitter<any>();

  cargando: boolean = false;

  // # SECCION: Lista de insumos
  insumos: InsumoMedico[] = [];
  private ultimoTerminoBuscado = "";
  private terminosBusqueda = new Subject<string>();
  private paginaActual = 1;
  private resultadosPorPagina = 25;
  private total = 0;
  private paginasTotales = 0;
  private indicePaginas:number[] = [];
  // # FIN SECCION

  
  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  mensajeAgregado: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION

  private cantidadValida: boolean = false;
  private insumoSeleccionado:InsumoMedico;
  
  /*{
        clave: "010.000.1327.00",
        tipo: "ME",
        generico_id: 1,
        generico_nombre: "CHUCHI",
        es_cuadro_basico: 1,
        grupo_insumo_nombre: "",
        es_causes: 0,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse. Inventore quasi dolore sapiente sequi, sunt natus fugiat quas eos, quia nostrum corporis voluptatem a distinctio! Adipisci, aperiam amet placeat.",
        medicamento:{
          id: 1,
          insumo_medico_clave: "010.000.1327.00",
          presentacion_id: 1,
          presentacion_nombre: "PRESEN",
          es_controlado: 0,
          es_surfactante: 0,
          descripcion: "Lorem",
          concentracion: "ceonetr",
          cantidad_x_envase: 20,
          unidad_medida_id: 1,
          unidad_medida_nombre: "pza",
          indicaciones: "indicscion",
          via_administracion_id: 1,
          via_administracion_nombre: "oral",
          dosis: "recomendada"
        },
        cantidad: 0,
        cargando:false
  };*/

  constructor(private buscarInsumosService: BuscarInsumosService) { }

  ngOnInit() {
    var self = this;

    var busquedaSubject = this.terminosBusqueda
    .debounceTime(300) // Esperamos 300 ms pausando eventos
    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
    .switchMap((term:string)  =>  { 
      console.log("Cargando búsqueda.");
      //this.busquedaActivada = term != "" ? true: false;

      this.ultimoTerminoBuscado = term;
      this.paginaActual = 1;
      this.cargando = true;
      return term  ? this.buscarInsumosService.buscar(term, this.paginaActual, this.resultadosPorPagina) : Observable.of<any>({data:[]}) 
    }
      
    
    ).catch( function handleError(error){ 
     
      self.cargando = false;      
      self.mensajeError.mostrar = true;
      self.ultimaPeticion = function(){self.listar(self.ultimoTerminoBuscado,self.paginaActual);};//OJO
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
        this.resetItemSeleccionado();
        this.insumos = resultado.data as InsumoMedico[];
        this.total = resultado.total | 0;
        this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

        this.indicePaginas = [];
        for(let i=0; i< this.paginasTotales; i++){
          this.indicePaginas.push(i+1);
        }
        
        console.log("Búsqueda cargada.");
      }

    );
  }
  ngAfterViewInit() {            
        this.searchBoxViewChildren.first.nativeElement.focus();
  }

  cerrar(){
    this.onCerrar.emit();
  }

  resetItemSeleccionado(){
    this.cantidadBoxViewChildren.first.nativeElement.value = "";
    this.insumoSeleccionado = null;
    this.cantidadValida = false;
  }
  seleccionar(item:InsumoMedico){
    this.insumoSeleccionado = item;
    this.cantidadBoxViewChildren.first.nativeElement.disabled = false;
    this.cantidadBoxViewChildren.first.nativeElement.focus();
  }
  comprobarCantidad(value: any){
    if (value.replace(/ /g,'') == ""){
      this.cantidadValida = false;
      return false;
    }
    if (isNaN(value)){
      this.cantidadValida = false;
      return false;
    }

    let x = value % 1;
    if ( x != 0 ){
      this.cantidadValida = false;
      return false;
    }
    this.cantidadValida = true;
    return true;

  }
  enviar(e){
    e.preventDefault();
    this.mensajeAgregado = new Mensaje(true, 2);
    this.mensajeAgregado.mostrar = true;    
    this.onEnviar.emit(this.insumoSeleccionado);
    this.searchBoxViewChildren.first.nativeElement.focus();
    this.resetItemSeleccionado();
  }
  
  buscar(term: string): void {
    this.terminosBusqueda.next(term);
  }

  listar(term:string, pagina:number): void {
    this.paginaActual = pagina;
    this.resetItemSeleccionado();
    console.log("Cargando insumos.");
   
    this.cargando = true;
    this.buscarInsumosService.buscar(term, pagina, this.resultadosPorPagina).subscribe(
        resultado => {
          this.cargando = false;
          this.insumos = resultado.data as InsumoMedico[];

          this.total = resultado.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }

          console.log("Insumos cargados.");
          console.log(this.insumos);
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

  // # SECCION: Paginación
  paginaSiguiente(term:string):void {
    this.resetItemSeleccionado();
    this.listar(term,this.paginaActual+1);
  }
  paginaAnterior(term:string):void {
    this.resetItemSeleccionado();
    this.listar(term,this.paginaActual-1);
  }

  keyboardInput(e: KeyboardEvent) {
    if(e.keyCode == 27 ){
      event.preventDefault();
      event.stopPropagation();
      this.cerrar();
    }
        
  }
}
