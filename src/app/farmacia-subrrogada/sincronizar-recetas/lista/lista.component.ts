import { Component, OnInit, Input, ElementRef, ViewChild, ViewChildren  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';
import { Mensaje } from '../../../mensaje';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'sincronizar-recetas-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent{
  @ViewChildren('json') jsonBoxViewChildren;
  dato2: FormGroup;
  cargando = false;
  tamano:number = 0;
  error_json = false;
  json_valido;
  pedido_id;
  recetas_resultado = false;
    //Crear la variable que mustra las notificaciones
  mensajeResponse: Mensaje = new Mensaje();
  titulo="Sincronizar recetas";
  //@ViewChild('mainScreen') elementView: ElementRef;
  constructor(private fb: FormBuilder,  
    private crudService: CrudService, 
    private route: ActivatedRoute, 
    private _sanitizer: DomSanitizer, 
    private notificacion: NotificationsService) { }
  
    tieneid: boolean = false;
  ngOnInit() {

    //obtener los datos del usiario logueado almacen y clues
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    //this.tamano = this.elementView.nativeElement.offsetHeight/2;
    //inicializar el formulario reactivo
    this.dato2 = this.fb.group({
      json: [''],
      archivos: [''],
      pedido:['00011']
    }); 
  }
  foto = '';
  /**
     * Este método abre una modal
     * @param id identificador del elemento de la modal
     * @param item_id identificador del pedido
     * @return void
     */
  abrirModal(id, item_id) {
    document.getElementById(id).classList.add('is-active');
    this.pedido_id = item_id;
  } 

  /**
     * Este método cierra una modal
     * @param id identificador del elemento de la modal
     * @return void
     */
  cancelarModal(id) {
    document.getElementById(id).classList.remove('is-active');
    this.dato2.patchValue({json:'',archivos:'' ,pedido:''});
    this.jsonBoxViewChildren.first.nativeElement.value = "";
    this.pedido_id = "";
    this.recetas_resultado = false;
    this.json_valido='';
    console.log(this.dato2);
  }  

  /**
     * Este método selecciona un archivo txt con un json para subirlo <input type="file" (change)="seleccionarJson($event, 'modelo')">
     * @param evt Evento change del campo file
     * @param modelo Modelo donde guardaremos la cadena en base64 de la imagen
     * @return void
     */
  convertirJson(evt, modelo, mostrar) {
      modelo.patchValue('');
      this.error_json = false;
      var files = evt.target.files;
      var file = files[0];
      var esto = this;
      if (files && file) {
          var json = "";
          var reader = new FileReader();
          reader.readAsBinaryString(file);
          reader.onload = (function (theFile) {
              return function (e) {
                  try {
                      json = JSON.parse(e.target.result);
                      modelo.patchValue(json);
                  } catch (ex) {
                      esto.error_json = true;
                  }
              }
          })(file);
      }
  }

  
    /**
    * Este método envia los datos para agregar un elemento 
    * @return void
    */
    enviarDatos(url?) {
        this.cargando = true;
        this.dato2.patchValue({pedido:this.pedido_id});
        var json = this.dato2.getRawValue();
        this.crudService.crear(json, url).subscribe(
            resultado => {
              this.cargando = false;   
              if(resultado.data){
                this.json_valido = resultado.data;
              }
              this.recetas_resultado = true;
              this.mensajeResponse.texto = "Se han guardado los cambios.";
              this.mensajeResponse.mostrar = true;
              this.mensajeResponse.clase = "success";
              this.mensaje(2);            
            },
            error => {
                this.cargando = false;

                try {
                    let e = error.json();
                    if (error.status == 401) {
                        this.mensajeResponse.texto = "No tiene permiso para hacer esta operación.";

                    }
                    // Problema de validación
                    if (error.status == 409) {
                        this.mensajeResponse.texto = "Por favor verfique los campos marcados en rojo.";
                        this.mensajeResponse.clase = 'warning';
                        this.mensaje(8);
                                
                        for (var input in e.error) {
                            // Iteramos todos los errores
                            for (var i in e.error[input]) {
                                this.mensajeResponse.titulo = input;
                                this.mensajeResponse.texto = e.error[input][i];
                                this.mensajeResponse.clase = "error";
                                this.mensaje(3);
                            }
                        }
                    }
                } catch (e) {

                    if (error.status == 500) {
                        this.mensajeResponse.texto = "500 (Error interno del servidor)";
                    } else {
                        this.mensajeResponse.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                    }
                }
            }
        );
    }
      /**
    * Este método envia los datos para agregar un elemento 
    * @return void
    */
    sincronizarReceta(modal?) {
        this.cargando = true;
        this.dato2.patchValue({pedido:this.pedido_id});
        var json = this.dato2.getRawValue();
        this.crudService.crear(json, "procesar-json-proveedor").subscribe(
            resultado => {
              this.cargando = false;   
              
              this.cancelarModal(modal);
              //this.recetas_resultado=false;
              console.log(resultado);
              this.mensajeResponse.texto = "Se han sincronizado las recetas.";
              this.mensajeResponse.mostrar = true;
              this.mensajeResponse.clase = "success";
              this.mensaje(2);            
            },
            error => {
                this.cargando = false;

                try {
                    let e = error.json();
                    if (error.status == 401) {
                        this.mensajeResponse.texto = "No tiene permiso para hacer esta operación.";

                    }
                    // Problema de validación
                    if (error.status == 409) {
                        this.mensajeResponse.texto = "Por favor verfique los campos marcados en rojo.";
                        this.mensajeResponse.clase = 'warning';
                        this.mensaje(8);
                        for (var input in e.error) {
                            // Iteramos todos los errores
                            for (var i in e.error[input]) {
                                console.log(input);
                                this.mensajeResponse.titulo = input;
                                this.mensajeResponse.texto = e.error[input][i];
                                this.mensajeResponse.clase = "error";
                                this.mensaje(3);
                            }
                        }
                    }
                } catch (e) {

                    if (error.status == 500) {
                        this.mensajeResponse.texto = "500 (Error interno del servidor)";
                    } else {
                        this.mensajeResponse.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
                    }
                }
            }
        );
    }


    //mostrar notificaciones configuracion default, posicion abajo izquierda, tiempo 2 segundos
    public options = {
        position: ["bottom", "left"],
        timeOut: 2000,
        lastOnBottom: true
    };
    /**
     * Este método muestra los mensajes resultantes de los llamados de la api
     * @param cuentaAtras numero de segundo a esperar para que el mensaje desaparezca solo
     * @param posicion  array de posicion [vertical, horizontal]
     * @return void
     */
    mensaje(cuentaAtras: number = 6, posicion: any[] = ["bottom", "left"]): void {
        var objeto = {
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: this.mensajeResponse.texto.length
        };

        this.options = {
            position: posicion,
            timeOut: cuentaAtras * 1000,
            lastOnBottom: true
        };
        if (this.mensajeResponse.titulo == '')
            this.mensajeResponse.titulo = this.titulo;

        if (this.mensajeResponse.clase == 'alert')
            this.notificacion.alert(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'success')
            this.notificacion.success(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'info')
            this.notificacion.info(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'warning' || this.mensajeResponse.clase == 'warn')
            this.notificacion.warn(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'error' || this.mensajeResponse.clase == 'danger')
            this.notificacion.error(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

    }
}