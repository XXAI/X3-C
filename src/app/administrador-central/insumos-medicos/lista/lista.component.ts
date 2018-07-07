import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { InsumosMedicosService } from '../insumos-medicos.service';
import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';
import { environment } from '../../../../environments/environment';


import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [InsumosMedicosService]
})
export class ListaComponent implements OnInit {

  cargando: boolean = false;
	mostrarModalClues:boolean = false;
	listaSeleccionada:any = null;


  	// # SECCION: Esta sección es para mostrar mensajes
  	mensajeError: Mensaje = new Mensaje();
  	mensajeExito: Mensaje = new Mensaje();
  	ultimaPeticion:any;
  	// # FIN SECCION


  	// # SECCION: Lista 
  	lista: any[] = [];
	paginaActual = 1;
  	resultadosPorPagina = 25;
  	total = 0;
   	paginasTotales = 0;
   	indicePaginas:number[] = []
  	// # FIN SECCION

	// # SECCION: Resultados de búsqueda
	ultimoTerminoBuscado = "";
	terminosBusqueda = new Subject<string>();
	resultadosBusqueda: any[] = [];
	busquedaActivada:boolean = false;
	paginaActualBusqueda = 1;
	resultadosPorPaginaBusqueda = 25;
	totalBusqueda = 0;
	paginasTotalesBusqueda = 0;
	indicePaginasBusqueda:number[] = []
	// # FIN SECCION



	errores = {
		archivo: null
	}
	mostrarModalCarga:boolean = false;

	mensajeErrorSync:string = "";
	archivo:File = null;
	archivoSubido:boolean = false;
	enviandoDatos: boolean = false;
	progreso: number = 0;

	tabMedicamentos: boolean = false;
	tabMaterialCuracion: boolean = false;

	tabMedicamentosCorrectos: boolean = false;
	tabMedicamentosErrores: boolean = false;

	tabMaterialCuracionCorrectos: boolean = false;
	tabMaterialCuracionErrores: boolean = false;

	listaCargaMasiva = {
		medicamentos: { correctos: [], errores: [] },
		material_curacion:  { correctos: [], errores: [] }
	}

	constructor(    
		private title: Title, 
		private apiService: InsumosMedicosService,
		private http:Http) { }

  	ngOnInit() {
		this.title.setTitle("Insumos médicos / Administrador central");
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
		this.tabMedicamentos = true;
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
	exportarExcel(){
		var query = "token="+localStorage.getItem('token');
		window.open(`${environment.API_URL}/administrador-central/insumos-medicos-excel?${query}`);
	}
	eliminar(item: any, index): void {
		if(!confirm("¿Estás seguro de eliminar esta lista?, Se eliminará de todas las unidades médicas donde esté asignada.")){
			return;
		}
		item.cargando = true;
		this.apiService.eliminar(item.id).subscribe(
			data => {
			item.cargando = false;

			if(this.busquedaActivada){
				this.resultadosBusqueda.splice(index, 1);  
			} else {
				this.lista.splice(index, 1);  
			}				
			
			this.mensajeExito = new Mensaje(true)
			this.mensajeExito.mostrar = true;
			this.mensajeExito.texto = "item eliminado";
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


	// # SECCION: Importación

	cambiarArchivo(){
		this.errores = { archivo: null }
		this.mensajeErrorSync = "";
		this.archivo = null;
		this.archivoSubido = false;
		this.enviandoDatos = false;
		this.progreso = 0;
	}
	cerrarModalCarga(){
		this.mostrarModalCarga = false;		
		this.cambiarArchivo();
	}
	fileChange(event){
		let fileList: FileList = event.target.files;
		if(fileList.length > 0) {
			this.archivo = fileList[0];
		}
	}

	descargarFormato(){
		var query = "token="+localStorage.getItem('token');
		window.open(`${environment.API_URL}/administrador-central/formato-insumos-medicos-excel?${query}`);
	}

	subir(){
		if(this.archivo){
			this.listaCargaMasiva = {
				medicamentos: { correctos: [], errores: [] },
				material_curacion:  { correctos: [], errores: [] }
			}
			this.errores = {
				archivo: null
			}
			this.mensajeErrorSync = "";
			this.archivoSubido = false;
			this.enviandoDatos = true;

			let usuario = JSON.parse(localStorage.getItem("usuario"));			
			
			let formData:FormData = new FormData();
			formData.append('archivo', this.archivo, this.archivo.name);
			
			let headers = new Headers();
			headers.delete('Content-Type');
			headers.append('Authorization',  'Bearer ' + localStorage.getItem('token'));
			let options = new RequestOptions({ headers: headers });
			//let options = new RequestOptions({ headers: headers });

			
			var responseHeaders:any;
			var contentDisposition:any;
			this.http.post(`${environment.API_URL}/administrador-central/cargar-insumos-excel/`, formData, options)										
				.subscribe(
					response => {
						this.archivoSubido = true;
						this.enviandoDatos = false;
						//this.mostrarModalSubirArchivoSQL = false;
						this.progreso = 100;
						this.archivo = null;

						this.tabMedicamentos = this.tabMedicamentosCorrectos =  this.tabMaterialCuracionCorrectos = true;


						this.tabMaterialCuracion = this.tabMaterialCuracionErrores = this.tabMedicamentosErrores  = false;

						var data = response.json().data;


						for(var i in data.medicamentos){
							if(data.medicamentos[i].error != null){
								this.listaCargaMasiva.medicamentos.errores.push(data.medicamentos[i]);
							} else {
								this.listaCargaMasiva.medicamentos.correctos.push(data.medicamentos[i]);
							}
						}

						for(var i in data.material_curacion){
							if(data.material_curacion[i].error != null){
								this.listaCargaMasiva.material_curacion.errores.push(data.material_curacion[i]);
							} else {
								this.listaCargaMasiva.material_curacion.correctos.push(data.material_curacion[i]);
							}
						}
						
					},					
					error => {
						if(error.status == 409){
							this.mensajeErrorSync = "No se pudo subir el archivo, verifica que el archivo que tratas de subir sea correcto, que el nombre no haya sido modificado. Verifica que el archivo que intentas subir ya ha sido sincronizado previamente.";
						} else if(error.status == 401){
							this.mensajeErrorSync = "El archivo que intentas subir ya ha sido sincronizado previamente";
						} else {
							this.mensajeErrorSync = "Hubo un problema al sincronizar, prueba recargar el sitio de lo contrario llama a soporte técnico.";
						}
						this.progreso = 100;
						this.enviandoDatos = false;
						
					}
				);	
		}
	}


}
