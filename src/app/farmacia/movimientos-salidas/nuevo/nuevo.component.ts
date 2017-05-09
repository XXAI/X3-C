import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location}           from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth.service';
import { MovimientosSalidasService }       from '../movimientos-salidas.service';

import { Mov }       from '../movimiento';
import { Insumo  } from '../movimiento';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
  providers: [MovimientosSalidasService]
})
export class NuevoComponent implements OnInit {

  public movimiento: FormGroup;

  private movimientoRepetido:boolean = false;
  private movimientoInvalido:boolean = false;

  cargando: boolean = false;
  private cargandoDatos: boolean = false;  
  private almacenes: any = {};
  private usuario: any ={};
  datos : any[];

  private servidorId: string;
 

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
    private location: Location,
    private movimientosSalidasService: MovimientosSalidasService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.title.setTitle("Nuevo movimiento / Farmacia");
    
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    //console.log(this.usuario);
    //console.log("*****************");
    this.movimientosSalidasService.listaDatos("almacenes").subscribe(
       datos => {
         this.datos = datos;
         for (let data of this.datos) {
           //console.log(data.almacen_usuarios.length); 
           for(let usuario of data.usuarios){
             if(usuario.usuario_id==this.usuario.id){
              //console.log("NUEVO  nuevo.component.ts"); 
              //console.log(almacen_usuario.usuario_id);
              //console.log(almacen_usuario.servidor_id);
              this.movimiento.value.almacen_id= usuario.servidor_id;
              this.servidorId = usuario.almacen_id;
              //console.log("SERVIDOR ID-------------------------------------");
              //console.log(this.servidorId);
              this.movimiento.patchValue({almacen_id: this.servidorId});
              this.movimiento.patchValue({cancelado: false});
              this.movimiento.patchValue({tipo_movimiento_id: 2});
             }
           }
          }
         console.log(this.datos);
        }, //Bind to view
       err => {
              // Log errors if any
              console.log(err);
          });




    /**************************** */


      this.movimiento = this.fb.group({
        almacen_id: ['', [Validators.required]],
        tipo_movimiento_id: ['', [Validators.required]],
        fecha_movimiento: ['', [Validators.required]],
        observaciones: ['', [Validators.required]],
        cancelado: ['', [Validators.required]],
        observaciones_cancelacion: ['', [Validators.required]],
        insumos: this.fb.array([
          this.initInsumo(),
        ])
      });
    

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

    enviar(insumosAgregadosForm: any[]) {
    

    
    this.cargando = true;  
    console.log("insumos" + insumosAgregadosForm);
    this.movimiento.value.insumos = insumosAgregadosForm;
    console.log(this.movimiento.value);
    this.movimientosSalidasService.crear(this.movimiento.value).subscribe(
        movimiento => {
          this.cargando = false;
          console.log("movimiento creado.");
          this.location.back();
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
              this.movimientoRepetido = false;
              this.movimientoInvalido = false;
              for (var input in e.error){
                // Iteramos todos los errores
                for (var i in e.error[input]){

                  if(input == 'id' && e.error[input][i] == 'unique'){
                    this.movimientoRepetido = true;
                  }
                  if(input == 'id' && e.error[input][i] == 'email'){
                    this.movimientoInvalido = true;
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

  regresar(){
    
    this.location.back();
  }

}