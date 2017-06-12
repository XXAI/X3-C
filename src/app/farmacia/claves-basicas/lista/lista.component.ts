import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';

import { ClavesBasicasService } from '../claves-basicas.service';
import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';

import { Mensaje } from '../../../mensaje';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
	providers: [ClavesBasicasService]
})

export class ListaComponent implements OnInit {

	// # SECCION: Esta sección es para mostrar mensajes
	mensajeError: Mensaje = new Mensaje();
	mensajeExito: Mensaje = new Mensaje();
	ultimaPeticion:any;
	// # FIN SECCION

	cargando:boolean = false;
	lista:any[] = [];

	// # SECCION: Cambios de Entorno
	private cambiarEntornoSuscription: Subscription;
	// # FIN SECCION

	constructor(private title: Title, private apiService: ClavesBasicasService,  private cambiarEntornoService:CambiarEntornoService) { }
	
	ngOnInit() {
		this.title.setTitle("Claves básicas / Almacén");
		this.listar();
		

		this.cambiarEntornoSuscription = this.cambiarEntornoService.entornoCambiado$.subscribe(evento => {
			this.listar();
		});
	}
	listar(){
		this.cargando = true;
		this.apiService.lista().subscribe(
		respuesta => {
			this.lista = respuesta;
			this.cargando = false;
		}, error => {
			this.cargando = false;
		});
	}
	eliminar(item: any, index): void {
		item.cargando = true;
		this.apiService.eliminar(item.id).subscribe(
			data => {
				item.cargando = false;
				this.lista.splice(index, 1);  
				console.log("Se eliminó el elemento de la lista.");

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

}
