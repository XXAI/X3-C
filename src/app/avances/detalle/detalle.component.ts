import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location}           from '@angular/common';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { AvanceService } from '../avance.service';
import { Detalle } from '../detalle';

import { Mensaje } from '../../mensaje';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  	
    cargando: boolean = false;
    showAgregarAvance: boolean = false;
    privilegio_usuario: boolean = false;
    avance: FormGroup;
    usuario_form: FormGroup;
	

	// # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
	mensajeExito: Mensaje = new Mensaje();
	ultimaPeticion:any;
	id_avance_detalle:string = "0";
	id_avance:string;
	// # FIN SECCION

	// # SECCION: Lista de pacinetes
	private paginaActual = 1;
	resultadosPorPagina = 25;
	total = 0;
	private paginasTotales = 0;
	private indicePaginas:number[] = [];

  detalles: Detalle[] = [];
  usuarios:any = [];
	usuarios_privilegios:any = [];
	// # FIN SECCION
	
	// # SECCION: Resultados de búsqueda
	private ultimoTerminoBuscado = "";
	private terminosBusqueda = new Subject<string>();
	private resultadosBusqueda: Detalle[] = [];
	busquedaActivada:boolean = false;
	private paginaActualBusqueda = 1;
	resultadosPorPaginaBusqueda = 25;
	totalBusqueda = 0;
	private paginasTotalesBusqueda = 0;
	private indicePaginasBusqueda:number[] = [];

  //Subir archivo
  tag:any;
  id_pedido:string;
  nombre_pedido:string;
  cargando_archivo:number = 0;
  subir_archivo:boolean = true;

  constructor(
  	private router: Router,
  	private location: Location,
  	private route: ActivatedRoute,
  	private title: Title, 
  	private avanceService: AvanceService,
  	private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.avance = this.fb.group({
           archivo: ['', []],
           porcentaje: ['', [Validators.required]],
           comentario: ['', [Validators.required]]
       
    });

    this.usuario_form = this.fb.group({
           usuario_id: ['', [Validators.required]],
           agregar: ['', []],
           editar: ['', []],
           eliminar: ['', []],
           avance_id: ['', []]
    });
  	this.title.setTitle("Temas / Avance");
  		this.mensajeError = new Mensaje();
	    this.mensajeExito = new Mensaje();

	    var self = this;

	    this.route.params.subscribe(params => {
	      this.id_avance = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
	    });

	    this.listar(1);
	    this.cargar_usuarios();

	    var busquedaSubject = this.terminosBusqueda
	    .debounceTime(300) // Esperamos 300 ms pausando eventos
	    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
	    .switchMap((term:string)  =>  { 
	      console.log("Cargando búsqueda."+term);
	      this.busquedaActivada = term != "" ? true: false;

	      this.ultimoTerminoBuscado = term;
	      this.paginaActualBusqueda = 1;
	      this.cargando = true;
	      return term  ? this.avanceService.buscar_detalle(this.id_avance, term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda) : Observable.of<any>({data:[]}) 
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
	        this.resultadosBusqueda = resultado.data as Detalle[];
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

  cargar_usuarios():void
  {
    this.avanceService.usuarios(this.id_avance).subscribe(
        resultado => {
          console.log(resultado);

          this.usuarios_privilegios = resultado.data_lista;
          this.usuarios = resultado.usuarios;
          this.privilegio_usuario = resultado.privilegio;
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

  eliminar_usuario_avance(id:string): void
  {
    if(confirm("¿Realmente Desea eliminar"))
    {
    this.avanceService.elimina_usuarios(id).subscribe(
        resultado => {
          this.cargar_usuarios();
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
  }

  agregar_usuario(): void
  {
      this.cargando = true;
      this.usuario_form.patchValue({avance_id: this.id_avance});
      this.avanceService.crear_usuario(this.usuario_form.value).subscribe(
          tema => {
            this.cargando = false;

            
            this.mensajeExito = new Mensaje(true);
            this.mensajeExito.texto = "Se han guardado los cambios.";
            this.mensajeExito.mostrar = true;
            this.cargar_usuarios();
            this.usuario_form.patchValue({usuario_id:"", agregar:"",editar:"", eliminar:""});
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
              if (error.status == 409){
                this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
                
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

  listar(pagina:number): void {
    this.paginaActual = pagina;
    
    this.cargando = true;
    
    this.avanceService.lista_detalles(this.id_avance, pagina,this.resultadosPorPagina).subscribe(
        resultado => {

          this.cargando = false;
          this.detalles = resultado.data as Detalle[];

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
      );
    }

    buscar(term: string): void {
	    this.terminosBusqueda.next(term);
	}

  listarBusqueda(term:string ,pagina:number): void {
    this.paginaActualBusqueda = pagina;

    this.cargando = true;
    this.avanceService.buscar_detalle(this.id_avance, term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
        resultado => {
          console.log(resultado);
          this.cargando = false;

          this.resultadosBusqueda = resultado.data as Detalle[];

          this.totalBusqueda = resultado.total | 0;
          this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

          this.indicePaginasBusqueda = [];
          for(let i=0; i< this.paginasTotalesBusqueda; i++){
            this.indicePaginasBusqueda.push(i+1);
          }
          
          
          
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

  fileChanged(e: Event) {
    var element: HTMLInputElement = e.target as HTMLInputElement;
    this.tag = element;    
  }

  upload() {
        if(this.tag)
        {

          console.log(this.avance.value);
          this.subir_archivo = false;
          let img:any = this.tag.files[0];
          var formData: FormData = new FormData();
          formData.append("file", img, img.name);
          formData.append("porcentaje", this.avance.value.porcentaje);
          formData.append("comentario", this.avance.value.comentario);
          formData.append("avance_id", this.id_avance);

          var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
              
          });
          var self = this;
          xhr.open("POST", environment.API_URL+"/avance_repository", true);
          xhr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('token'));
          var usuario = JSON.parse(localStorage.getItem("usuario"));

          if(usuario.proveedor_activo){
            xhr.setRequestHeader("X-Proveedor-Id", usuario.proveedor_activo.id);
          }

          xhr.onreadystatechange = function () {
              if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                 self.mensajeExito = new Mensaje(true);
                  self.mensajeExito.mostrar = true;
                  self.mensajeExito.texto = "Se  guardo correctamente el avance";
                 self.listar(1);
                 self.showAgregarAvance = !self.showAgregarAvance;
                 self.avance.patchValue({porcentaje:"", comentario:"",archivo:""});
              }

              if(xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
                 self.error_envio(xhr);
                 self.subir_archivo = true;        
              }
              self.cargando_archivo = xhr.readyState;
          };        
          xhr.send(formData);
        }else{
          alert("ES NECESARIO ELEGIR UN ARCHIVO A SUBIR, VUELVA A INTENTARLO POR FAVOR");
        }
    }

    error_envio(obj)
    {
      console.log(obj);
      this.mensajeError = new Mensaje(true);
      this.mensajeError.mostrar = true;
      
      if(obj.status == 500)
      this.mensajeError.texto = obj.responseText;
        else
      this.mensajeError.texto = "Ha ocurrido un error al enviar el archivo";
    }

  eliminar_avance(id)
  {
      if(confirm("¿Realmente desea eliminar este avance?"))
      {
        this.cargando = true;
        this.avanceService.eliminar(id).subscribe(
        resultado => {
          this.cargando = false;
          this.listar(1);
          this.mensajeExito = new Mensaje(true);
          this.mensajeExito.mostrar = true;
          this.mensajeExito.texto = "Se ha eliminado satisfactoriamente el avance";
        },
        error => {
          this.cargando = false;
          this.mensajeError = new Mensaje(true);
          this.mensajeError.mostrar = true;
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
  } 

  descargar(id){
    let id_avance = id;
    var query = "token="+localStorage.getItem('token');
    var self = this;

    var download = window.open(`${environment.API_URL}/download-file-avance/${id_avance}?${query}`);
    var contador = 0;
    /*var timer = setInterval(function ()
    {
       contador = contador + 1;
        if (download.closed)
        {
            clearInterval(timer);
            self.mostrarDialogoArchivos(self.datosPedido);
             self.mensajeError.mostrar = false;
             self.mensajeExito.mostrar = true;
             self.mensajeExito.iniciarCuentaAtras();
            self.mensajeExito.texto = "Se ha descargado correctamente el archivo";
        }else{
          if(contador == 5)
          {
            clearInterval(timer);
            download.close();
            self.mensajeError.mostrar = true;
            self.mensajeError.iniciarCuentaAtras();
            self.mensajeError.texto = "Ocurrio un error al intentar descargar el archivo.";
          }
        }
    }, 1000);*/
  }

  view(id){
    let id_avance = id;
    var query = "token="+localStorage.getItem('token');
    var self = this;

    var download = window.open(`${environment.API_URL}/view-file-avance/${id_avance}?${query}`);
    var contador = 0;
    /*var timer = setInterval(function ()
    {
       contador = contador + 1;
        if (download.closed)
        {
            clearInterval(timer);
            self.mostrarDialogoArchivos(self.datosPedido);
             self.mensajeError.mostrar = false;
             self.mensajeExito.mostrar = true;
             self.mensajeExito.iniciarCuentaAtras();
            self.mensajeExito.texto = "Se ha descargado correctamente el archivo";
        }else{
          if(contador == 5)
          {
            clearInterval(timer);
            download.close();
            self.mensajeError.mostrar = true;
            self.mensajeError.iniciarCuentaAtras();
            self.mensajeError.texto = "Ocurrio un error al intentar descargar el archivo.";
          }
        }
    }, 1000);*/
  }

 	regresar(){
    this.location.back();
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
