import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { environment } from '../../../../environments/environment';

import { SyncService } from '../sync.service';

import { Mensaje } from '../../../mensaje';

@Component({
	selector: 'app-local',
	templateUrl: './local.component.html',
	styleUrls: ['./local.component.css'],
	providers: [SyncService]
})
export class LocalComponent implements OnInit {

	// # SECCION: Esta sección es para mostrar mensajes
	mensajeError: Mensaje = new Mensaje();
	mensajeExito: Mensaje = new Mensaje();
	ultimaPeticion:any;
	// # FIN SECCION

	// # SECCION: Lista 
	lista: any[] = [];
	private paginaActual = 1;
	resultadosPorPagina = 10;
	total = 0;
	private paginasTotales = 0;
	private indicePaginas:number[] = []
	// # FIN SECCION

	// # SECCION: Resultados de búsqueda
	private ultimoTerminoBuscado = "";
	private terminosBusqueda = new Subject<string>();
	private resultadosBusqueda: any[] = [];
	busquedaActivada:boolean = false;
	private paginaActualBusqueda = 1;
	resultadosPorPaginaBusqueda = 10;
	totalBusqueda = 0;
	private paginasTotalesBusqueda = 0;
	private indicePaginasBusqueda:number[] = []
	// # FIN SECCION

	constructor(private apiService: SyncService) { }
	cargando: boolean = false;
	sincronizandoEnLinea:boolean = false;
	subiendoConfirmacion:boolean = false;
	mostrarLogAutoSync:boolean = false;
	logAutoSync:any;

	ngOnInit() {
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
		return term  ? this.apiService.buscar(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda) : Observable.of<any>({data:[]}) 
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
			this.resultadosBusqueda = resultado.data as any[];
			this.totalBusqueda = resultado.total | 0;
			this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

			this.indicePaginasBusqueda = [];
			for(let i=0; i< this.paginasTotalesBusqueda; i++){
			this.indicePaginasBusqueda.push(i+1);
			}
			
			console.log("Búsqueda cargada.");
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
		this.apiService.buscar(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
			resultado => {
			this.cargando = false;

			this.resultadosBusqueda = resultado.data as any[];

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
		console.log("Cargando items.");
	
		this.cargando = true;
		this.apiService.listaPaginada(pagina,this.resultadosPorPagina).subscribe(
			resultado => {
			this.cargando = false;
			this.lista = resultado.data as any[];

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

	descargarSync(){
		var query = "token="+localStorage.getItem('token');
    		window.open(`${environment.API_URL}/sync/manual/?${query}`); 
	}

	sincronizarEnLinea(){
		if(!confirm("¿Estás seguro que quieres sincronizar con el servidor central?")){
			return
		}
		this.sincronizandoEnLinea = true;
		this.logAutoSync = "";
		this.apiService.auto().subscribe(
			respuesta => {
				this.sincronizandoEnLinea = false;
				this.listar(1);
				this.logAutoSync = respuesta;
				this.mostrarLogAutoSync = true;
				console.log(respuesta);
			}, error => {
				this.sincronizandoEnLinea = false;
				this.mensajeError.mostrar = true;
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

		)
	}
}