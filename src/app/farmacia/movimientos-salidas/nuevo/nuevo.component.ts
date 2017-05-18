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
    this.title.setTitle("Nuevo movimiento / Almacen");
    
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

      this.movimiento = this.fb.group({
        id:[''],
        almacen_id: ['', [Validators.required]],
        status: ['', [Validators.required]],
        responsable: ['', [Validators.required]],
        tipo_movimiento_id: ['', [Validators.required]],
        fecha_movimiento: ['', [Validators.required]],
        observaciones: ['', [Validators.required]],
        cancelado: ['', [Validators.required]],
        observaciones_cancelacion: ['', [Validators.required]],
        insumos: this.fb.array([
          this.initInsumo(),
        ])
      });
    
    this.movimiento.patchValue({almacen_id: this.usuario.almacen_activo.id});
    this.movimiento.patchValue({tipo_movimiento_id: 2});

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
    //console.log(`Insumos ${insumosAgregadosForm}`);
    this.movimiento.value.insumos = insumosAgregadosForm;
    console.log(this.movimiento.value);
    this.movimientosSalidasService.crear(this.movimiento.value).subscribe(
        movimiento => {
          this.cargando = false;
          console.log("Movimiento creado.");
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
              this.mensajeError.texto = "Por favor verfique los campos vacíos.";
              this.movimientoRepetido = false;
              this.movimientoInvalido = false;
              for (var input in e.error){
                    console.log(e.error[input]);
                // Iteramos todos los errores
                for (var i in e.error[input]){
                    console.log(e.error[input[i]]);
                    for (var j in e.error[input[i]]){
                    console.log(e.error[input[i[j]]]);

                    }

                  if(e.error[input] == 'insumos'){
                    console.log("No hay insumos");
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
