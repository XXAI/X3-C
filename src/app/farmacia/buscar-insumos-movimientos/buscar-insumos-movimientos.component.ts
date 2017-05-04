import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

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

import { BuscarInsumosService } from './buscar-insumos-movimientos.service';
import { InsumoStock } from '../insumo-movimientos';
import { InsumoMedico } from '../insumo-movimientos';


@Component({
  selector: 'buscar-insumos-movimientos',
  templateUrl: './buscar-insumos-movimientos.component.html',
  styleUrls: ['./buscar-insumos-movimientos.component.css'], 
  host: { '(document:keydown)' : 'keyboardInput($event)'}
})

export class BuscarInsumosComponent implements OnInit, AfterViewInit {

  
  @ViewChildren('searchBox') searchBoxViewChildren;
  @ViewChildren('cantidadBox') cantidadBoxViewChildren;
  @ViewChildren('codigoBarrasBox') codigoBarrasViewChildren;
  @ViewChildren('fechaBox') fechaViewChildren;
  @ViewChildren('loteBox') loteViewChildren;
  
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onEnviar = new EventEmitter<any>();

  private cantidadAPI: boolean = true;

  //Harima: Para evitar agregar insumos que ya estan en la lista
  @Input() listaAgregados: Array<string>;

  cargando: boolean = false;
  @Input() salida: boolean;

  // # SECCION: Lista de insumos
  insumos: InsumoMedico[] = [];

  //insumosMovs: InsumoMedico[] = [];
  private ultimoTerminoBuscado = "";
  private terminosBusqueda = new Subject<string>();
  private paginaActual = 1;
  private resultadosPorPagina = 25;
  private total = 0;
  private paginasTotales = 0;
  private indicePaginas:number[] = [];
  insumo_stock: InsumoStock[] = [];
  // # FIN SECCION

  
  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
 // mensajeExito: Mensaje = new Mensaje();
  mensajeAgregado: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION

  private cantidadValida: boolean = false;
  private insumoSeleccionado:InsumoMedico;

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
      self.mensajeError =  new Mensaje();
      self.mensajeError.mostrar = true;
      self.ultimaPeticion = function(){self.listar(self.ultimoTerminoBuscado,self.paginaActual);};//OJO
      try {
        let e = error.json();
        if (error.status == 401 ){
          self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
        }
        
        if (error.status == 0 ){
          self.mensajeError.texto = "El servidor no responde.";
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
    try{
      // Por alguna razón si no implemento un setTimeout me lanza error
      // investigar porque ocurre esto

      // Poner el focus en la barra de busqueda
      setTimeout(() => { this.searchBoxViewChildren.first.nativeElement.focus();} ); 
      
    } catch(e){
      console.log(e);
    }           
      
  }

  cerrar(){
    this.searchBoxViewChildren.first.nativeElement.value = "";
    this.onCerrar.emit();
  }

  resetItemSeleccionado(){
    if(!this.salida){
      this.codigoBarrasViewChildren.first.nativeElement.value = "";
      this.fechaViewChildren.first.nativeElement.value = "";
      this.loteViewChildren.first.nativeElement.value = "";
    }
    this.cantidadBoxViewChildren.first.nativeElement.value = "";
    this.insumoSeleccionado = null;
    this.cantidadValida = false;
  }
  seleccionar(item:InsumoMedico){
    this.insumoSeleccionado = item;
    console.log(item);
    this.cantidadBoxViewChildren.first.nativeElement.disabled = false;
    this.cantidadBoxViewChildren.first.nativeElement.focus();
    if(!this.salida){
      this.codigoBarrasViewChildren.first.nativeElement.disabled = false;
      this.fechaViewChildren.first.nativeElement.disabled = false;
      this.loteViewChildren.first.nativeElement.disabled = false;
    }
    //this.codigoBarrasViewChildren.first.nativeElement.focus();
  }

  comprobarStock(existencia: number, cantidadBox:number){
    if(cantidadBox>existencia){
      console.log("false");
      return false;
    }else{
      console.log("true");
      return true;
    }
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
    
   /* if(!this.salida && this.cantidadValida){
      this.cantidadAPI=true;
    }else{
      //this.agregar(value);
      //enviar peticion a la API para comprobarCantidad
      
    }*/
    return true;

  }

  agregar(value: number){
    console.log("BOTON AGREGAR");
    this.buscarInsumosService.comprobarStock("00021", this.insumoSeleccionado.clave).subscribe(
      resultado => {
          this.insumo_stock = resultado as InsumoStock[]
          console.log(resultado);
          let existencia = resultado.existencia;
          console.log(`Existencia ${existencia}`);
          console.log(`Cantidad Valida: ${+value}`);
          this.cantidadValida = this.comprobarStock(existencia, +value);
          this.cantidadAPI=this.cantidadValida;
          console.log(`agregar(value: number)${this.cantidadValida}`);
          if(this.cantidadAPI){
            this.enviar();
          }
          return this.cantidadValida;
        });
  }

  enviar(){
    //e.preventDefault();
    //console.log(e);

    //Harima: Checamos si el insumo que seleccionamos no se encuentra agregado
    if(this.listaAgregados.indexOf(this.insumoSeleccionado.clave) < 0){
      this.mensajeAgregado = new Mensaje(true, 2);
      this.mensajeAgregado.mostrar = true;    
      this.insumoSeleccionado.cantidad = this.cantidadBoxViewChildren.first.nativeElement.value;
      if(!this.salida){
        this.insumoSeleccionado.codigo_barras = this.codigoBarrasViewChildren.first.nativeElement.value;
        this.insumoSeleccionado.fecha_caducidad = this.fechaViewChildren.first.nativeElement.value;
        this.insumoSeleccionado.lote = this.loteViewChildren.first.nativeElement.value;
      }
      this.onEnviar.emit(this.insumoSeleccionado);
      this.searchBoxViewChildren.first.nativeElement.focus();
      //Harima: Agregamos la clave al arreglo de items agregados
      this.listaAgregados.push(this.insumoSeleccionado.clave);
      this.resetItemSeleccionado();
    }else{
      //Harima: Mostramos un mensaje de error al intentar agregar un insumo ya presente en la lista
      this.mensajeError = new Mensaje(true,2);
      this.mensajeError.texto = "El insumo seleccionado ya se encuentra en la lista";
      this.mensajeError.mostrar = true;
    }
  }
  
  buscar(term: string): void {
    this.terminosBusqueda.next(term);
    this.mensajeError.mostrar = false;
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

  mostrarFichaInformativa(e, clave: string){    
    e.preventDefault();
    e.stopPropagation();

    // Mostrar el componente de Ficha Informativa
    // Falta hacerlo sumamiiiii :)
    alert(clave);
    console.log(clave);
  }

  // # SECCION: Paginación
  paginaSiguiente(term:string):void {
    if (this.paginaActual == this.paginasTotales){
        return;
    }
    this.resetItemSeleccionado();
    this.listar(term,this.paginaActual+1);
  }
  paginaAnterior(term:string):void {
     if (this.paginaActual == 1){
        return;
    }
    this.resetItemSeleccionado();
    this.listar(term,this.paginaActual-1);
  }

  keyboardInput(e: KeyboardEvent) {
    if(e.keyCode == 27 ){
      event.preventDefault();
      event.stopPropagation();
      this.cerrar();
    }
        

    // Cambiar página hacia adelante ctrl + shift + ->
    if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey )){
      event.preventDefault();
      event.stopPropagation();

      this.paginaSiguiente(this.searchBoxViewChildren.first.nativeElement.value);
      
    }
    // Cambiar página hacia adelante ctrl + shift + <-
    if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey )){
      
      event.preventDefault();
      event.stopPropagation();

      this.paginaAnterior(this.searchBoxViewChildren.first.nativeElement.value);
      
    }
    
        
  }
}
