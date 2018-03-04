import { Component, OnInit, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';

import { OpcionesAvanzadasService } from '../opciones-avanzadas.service';
import { environment } from '../../../../environments/environment';
import { PATCHES } from '../../../patches';

@Component({
  selector: 'app-actualizar-sistema',
  templateUrl: './actualizar-sistema.component.html',
  styleUrls: ['./actualizar-sistema.component.css']
})
export class ActualizarSistemaComponent implements OnInit {
  cargando: boolean = false;
  mostrarLog:boolean = false;
  logActualizacion:string = "";

  tabOnline = false;
  tabParches = true;
  tabParchesCliente = true;
  tabParchesAPI = false;


  errores = {
		archivo: null
	}
  cargandoParches = false;
  mostrarModalSubirParche:boolean = false;
  mensajeErrorSync:string = "";
  archivo:File = null;
  archivoSubido:boolean = false;
  enviandoDatos: boolean = false;
  progreso: number = 0;

  parches_cliente:any[] = [];
  parches_api:any[] = [];
  
  constructor(private apiService:OpcionesAvanzadasService, private http:Http) {}

  ngOnInit() {
		this.listarParches();
		this.parches_cliente = PATCHES;
  }

  actualizarViaGit() {
    this.apiService.actualizarViaGit().subscribe(
			respuesta => {
				this.cargando = false;				
				this.logActualizacion = respuesta;
				this.mostrarLog = true;
				
			
			},
			error => {
				this.cargando = false;				
				console.log(error);

			}
		);
  }

  listarParches() {
    this.cargandoParches = true;
    this.apiService.listarParches().subscribe(
			respuesta => {
				this.cargandoParches = false;							
        this.parches_api = respuesta;
			
			},
			error => {
				this.cargandoParches = false;				
				console.log(error);

			}
		);

  }

  adjuntarParche(){
		if(this.archivo){

			this.errores = {
			archivo: null
			}
			this.mensajeErrorSync = "";
			this.archivoSubido = false;
			this.enviandoDatos = true;

			
			
			let formData:FormData = new FormData();
			formData.append('patch', this.archivo, this.archivo.name);
			
			let headers = new Headers();
			headers.delete('Content-Type');
			headers.append('Authorization',  'Bearer ' + localStorage.getItem('token'));
			let options = new RequestOptions({ headers: headers });
			//let options = new RequestOptions({ headers: headers });

			
			var responseHeaders:any;
      var contentDisposition:any;
      
			this.http.post(`${environment.API_URL}/patches/ejecutar`, formData, options)										
				.subscribe(
					response => {
            this.logActualizacion = response.json().data;
            this.mostrarLog = true;

						this.archivoSubido = true;
						this.enviandoDatos = false;
						//this.mostrarModalSubirArchivoSQL = false;
						this.progreso = 100;
						this.archivo = null;
						this.listarParches();
					},					
					error => {
            
            if(error.status == 500){
              this.mensajeErrorSync = "Error interno del servidor";
            } else {
              let e = error.json();
              this.mensajeErrorSync = e.error;
            }
            
						/*if(error.status == 409){
							this.mensajeErrorSync = "No se pudo subir el archivo, verifica que el archivo que tratas de subir sea correcto, que el nombre no haya sido modificado. Verifica que el archivo que intentas subir ya ha sido sincronizado previamente.";
						} else if(error.status == 401){
							this.mensajeErrorSync = "El archivo que intentas subir ya ha sido sincronizado previamente";
						} else {
							this.mensajeErrorSync = "Hubo un problema al sincronizar, prueba recargar el sitio de lo contrario llama a soporte técnico.";
						}*/
						
						this.progreso = 100;
						this.enviandoDatos = false;
					}
					
				)
			
			
			
		}

  }
  fileChange(event){
		let fileList: FileList = event.target.files;
		if(fileList.length > 0) {
			this.archivo = fileList[0];
		}
	}

}
