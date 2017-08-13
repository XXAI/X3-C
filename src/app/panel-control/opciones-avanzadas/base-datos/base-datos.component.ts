import { Component, OnInit } from '@angular/core';
import { OpcionesAvanzadasService } from '../opciones-avanzadas.service';


import { Uploader }      from 'angular2-http-file-upload';
import { SubirArchivoSQL }  from './subir-archivo-sql';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-base-datos',
  templateUrl: './base-datos.component.html',
  styleUrls: ['./base-datos.component.css']
})
export class BaseDatosComponent implements OnInit {
  exportando: boolean = false;


  errores = {
		archivo: null
	}
  mostrarModalSubirArchivoSQL:boolean = false;
  mensajeErrorSync:string = "";
	archivo:File = null;
	archivoSubido:boolean = false;
  enviandoDatos: boolean = false;
  progreso: number = 0;

  constructor(private apiService:OpcionesAvanzadasService, private uploaderService: Uploader) { }

  ngOnInit() {
  }

  exportar() {
    var query = "token="+localStorage.getItem('token');
    window.open(`${environment.API_URL}/opciones-avanzadas/exportar-base-datos/?${query}`); 
  }

  importar(){
		if(this.archivo){

			this.errores = {
			archivo: null
			}
			this.mensajeErrorSync = "";
			this.archivoSubido = false;
			this.enviandoDatos = true;
				
			let miArchivo = new SubirArchivoSQL(this.archivo);
			

			this.uploaderService.onSuccessUpload = (item, response, status, headers) => {             
				this.archivoSubido = true;
				this.enviandoDatos = false;
				//this.mostrarModalSubirArchivoSQL = false;
			};

			this.uploaderService.onErrorUpload = (item, response, status, headers) => {
				try {
					var e = JSON.parse(response);
					console.log(e.error);
					this.mensajeErrorSync = e.error;
				} catch(e){
					this.mensajeErrorSync = "Error desconocido, verifique en la consola."
				}

				this.archivoSubido = false;
				this.enviandoDatos = false;
				
			};
			this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
				// complete callback, called regardless of success or failure        
				this.enviandoDatos = false;        
			};

			this.uploaderService.onProgressUpload = (item, percentComplete) => {
				// progress callback
				console.log(percentComplete)
				this.progreso = percentComplete;
			};
			
			this.uploaderService.upload(miArchivo);
			
		}
	
  }
  fileChange(event){
		let fileList: FileList = event.target.files;
		if(fileList.length > 0) {
			this.archivo = fileList[0];
		}
	}

}
