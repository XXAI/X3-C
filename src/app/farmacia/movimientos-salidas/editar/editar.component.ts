import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Location}           from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth.service';
import { MovimientosSalidasService }       from '../movimientos-salidas.service';

import  * as FileSaver    from 'file-saver'; 

import { Modelo } from '../modelo';
import { Mov }       from '../movimiento';
import { Insumo  } from '../movimiento';
import { Salida  } from '../salida';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'entrada-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [MovimientosSalidasService]
})
export class EditarComponent implements OnInit {

  public movimiento: FormGroup;

  private id:string;
  private movimientoRepetido:boolean = false;
  private movimientoInvalido:boolean = false;

    // # SECCION: Reportes
  private pdfworker:Worker;
  private cargandoPdf:boolean = false;
  // # FIN SECCION
 
  datosCargados: boolean;
  cargando: boolean = false;
  private cargandoDatos: boolean = false;  
  private almacenes: any = {};
  private usuario: any ={};
  datos : any[];
  salidaMovimiento : Salida[];
  private servicios;

  fecha_actual:any;
  mostrarCancelado: boolean = false;
  private almacenId: string;
 

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje()
  mensajeAdvertencia: Mensaje = new Mensaje()
  mensajeExito: Mensaje = new Mensaje();
  // # FIN SECCION

  insumosNuevo : Insumo[] = [];

  constructor(
    private router: Router,
    private title: Title, 
    private authService:AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private movimientosSalidasService: MovimientosSalidasService,
    private fb: FormBuilder,
    private _ngZone: NgZone

  ) { }

  ngOnInit() {
    this.title.setTitle("Editar movimiento / Farmacia");
    
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker("web-workers/farmacia/movimientos/salida.js")

    
    // Este es un hack para poder usar variables del componente dentro de una funcion del worker
    var self = this;    
    var $ngZone = this._ngZone;
    
    this.pdfworker.onmessage = function( evt ) {       
      // Esto es un hack porque estamos fuera de contexto dentro del worker
      // Y se usa esto para actualizar alginas variables
      $ngZone.run(() => {
         self.cargandoPdf = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
      //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
    };
    
      this.movimiento = this.fb.group({
        almacen_id: ['', [Validators.required]],
        tipo_movimiento_id: ['', [Validators.required]],
        fecha_movimiento: ['', [Validators.required]],
        observaciones: ['', [Validators.required]],
        cancelado: ['', [Validators.required]],
        observaciones_cancelacion: ['', [Validators.required]],
        movimiento_metadato: this.fb.group({
          persona_recibe: ['', [Validators.required]],
          servicio_id: ['', [Validators.required]],
        }),
        insumos: this.fb.array([
          this.initInsumo(),
        ])
      });
    /*
    this.movimiento.patchValue({almacen_id: this.usuario.almacen_activo.id});
    this.movimiento.patchValue({cancelado: false});
    this.movimiento.patchValue({tipo_movimiento_id: 1});*/

    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
      //console.log(this.id);
      this.cargarDatos();
    });

        this.movimientosSalidasService.listaDatos("clues-servicio", this.usuario.clues_activa.clues).subscribe(
      servicios =>{
        this.cargando = false;
        this.servicios = servicios;
      },
        error => {
          this.cargando = false;
          try {
            let e = error.json();
            if (error.status == 401 ){
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              console.log("500 (Error interno del servidor)") ;
            } else {
              console.log("No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.");
            }            
          }

        }
    );
  }



  asignarTipo(algo:number){
    console.log('asfsadfsadfasdfsadf');
  }

  initInsumo() {
        return this.fb.group({
            clave: ['', Validators.required],
            cantidad: ['', Validators.required],
            cantidad_x_envase: ['', Validators.required],
            lote:  ['', Validators.required],
            fecha_caducidad:  ['', Validators.required],
            codigo_barras:  ['', Validators.required],
        });
    }


    enviar() {
    
    this.cargando = true;  
    
    let movimiento = this.movimiento.value;
    console.log(this.movimiento.value);
    this.movimientosSalidasService.editar(this.id, this.movimiento.value).subscribe(
      movimiento => {
        this.cargando = false;
        console.log("Usuario editado.");

        this.mensajeExito = new Mensaje(true);
          this.mensajeExito.texto = "Se han guardado los cambios.";
          this.mensajeExito.mostrar = true;
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
              //this.usuarioRepetido = false;
              //this.usuarioInvalido = false;
              for (var input in e.error){
                // Iteramos todos los errores
                for (var i in e.error[input]){

                  if(input == 'id' && e.error[input][i] == 'unique'){
                    //this.usuarioRepetido = true;
                  }
                  if(input == 'id' && e.error[input][i] == 'email'){
                    //this.usuarioInvalido = true;
                  }
                }                      
              }
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

  cargarDatos(){
    this.cargando = true;
    console.log("Cargando movimiento.");
    this.movimientosSalidasService.ver(this.id).subscribe(
      resultado =>{
        this.cargando = false;
        this.datosCargados = true;
        //console.log(resultado);
        this.movimiento.patchValue(resultado);
        this.salidaMovimiento = resultado as Salida[];
        //  console.log(this.salidaMovimiento);        
        console.log("Movimiento cargado.");
        //console.log(this.movimiento);
      },
        error => {
          this.cargando = false;

          this.mensajeError = new Mensaje(true);
          this.mensajeError = new Mensaje(true);
          this.mensajeError.mostrar;

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

  regresar(){
    this.location.back();
  }

  // # SECCION - Webworkers

  imprimir(item: Modelo) {
    console.log(item);

    this.movimientosSalidasService.ver(this.id).subscribe(
          movimientoActual => {
            this.cargando = false;
            item.datosImprimir = movimientoActual;
            console.log(movimientoActual);
            
                try {
                this.cargandoPdf = true;
                var entradas_imprimir = {
                  datos: item,
                  lista: item.datosImprimir.insumos,
                  usuario: this.usuario
                };
                this.pdfworker.postMessage(JSON.stringify(entradas_imprimir));
              } catch (e){
                this.cargandoPdf = false;
                console.log(e);
              }
          },
          error => {
            this.cargando = false;

            this.mensajeError = new Mensaje(true);
            this.mensajeError = new Mensaje(true);
            this.mensajeError.mostrar;

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

  base64ToBlob( base64, type ) {
      var bytes = atob( base64 ), len = bytes.length;
      var buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( var i=0 ; i < len ; i++ )
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type: type } );
  }

}
