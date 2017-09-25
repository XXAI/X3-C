import { Component, OnInit, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location}           from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription }   from 'rxjs/Subscription';

import { FirmanteService } from '../firmante.service';
import { environment } from '../../../../environments/environment';

import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  firmantes: FormGroup;
  cargando:boolean = false;
  showFirmante:boolean = false;

    private paginaActual = 1;
	resultadosPorPagina = 25;
	total = 0;
	private paginasTotales = 0;
	private indicePaginas:number[] = [];
	// # SECCION: Resultados de búsqueda
	private ultimoTerminoBuscado = "";
	private terminosBusqueda = new Subject<string>();
	private resultadosBusqueda: any;
	busquedaActivada:boolean = false;
	private paginaActualBusqueda = 1;
	resultadosPorPaginaBusqueda = 25;
	totalBusqueda = 0;
	private paginasTotalesBusqueda = 0;
	private indicePaginasBusqueda:number[] = [];

	mensajeError: Mensaje = new Mensaje();
	mensajeExito: Mensaje = new Mensaje();
	ultimaPeticion:any;
  
  constructor(
  	private title: Title, 
	private location: Location, 
	private router: Router,
	private route: ActivatedRoute,
	private _ngZone: NgZone, 
	private fb: FormBuilder,
	private firmanteService: FirmanteService
  ) { }

  ngOnInit() {
  	this.firmantes = this.fb.group({
        firma_director: ['', [Validators.required]],
        firma_almacen: ['', [Validators.required]]
    });

    this.title.setTitle('Firmantes / Configuración');

    var self = this;

    var busquedaSubject = this.terminosBusqueda
    .debounceTime(300) // Esperamos 300 ms pausando eventos
    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
    .switchMap((term:string)  =>  { 

      this.ultimoTerminoBuscado = term;
      this.paginaActualBusqueda = 1;
      this.cargando = true; 	  

 	  return false ? this.firmanteService.buscar_personal(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda) : Observable.of<any>({data:[]})
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
        /*this.cargando = false;
        this.resultadosBusqueda = resultado.data as Tema[];
        this.totalBusqueda = resultado.total | 0;
        this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

        this.indicePaginasBusqueda = [];
        for(let i=0; i< this.paginasTotalesBusqueda; i++){
          this.indicePaginasBusqueda.push(i+1);
        }
        
        console.log("Búsqueda cargada.");*/
      }

    );
  }

   buscar_firmante():void
   {
  		this.showFirmante = !this.showFirmante;
   }

   buscar_personal():void
   {
  		
   }

   listar(pagina:number): void {
    this.paginaActual = pagina;
    
    /*this.cargando = true;
    this.avanceService.lista(pagina,this.resultadosPorPagina).subscribe(
        resultado => {

          this.cargando = false;
          this.temas = resultado.data as Tema[];

          this.total = resultado.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }
          
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
      );*/
    }

   listarBusqueda(term:string ,pagina:number): void {
   }

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
}
