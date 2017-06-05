import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { MovimientosSalidasService }  from  '../movimientos-salidas.service';

import { Movimiento } from '../movimiento';
import { Insumo     } from '../movimiento';

@Component({
  moduleId: module.id,
  selector: 'salidas-form-datos',
  templateUrl: './form-datos.component.html',
  styles: ['.cambiarColor{background:green}']
})
export class FormDatosComponent implements OnInit {

  constructor(
    private movimientosSalidasService: MovimientosSalidasService,
  ) { }

  datos: any[];
  itemsDatos: any[];
  listaMovimientos: any[];
  private usuario: any = {};
  private servicios;
  fecha_actual;
  
  @Input() insumo: Insumo[];
  @Input() movimiento:FormGroup;

  @Input()  movimientoRepetido:boolean;
  @Input()  movimientoInvalido:boolean;
  @Input()  cargando: boolean;
  @Input()  cargandoDatos: boolean;
  @Input()  mostrarCancelado:boolean;

  @Input()  servidor: string;

  @Output() onEnviar = new EventEmitter<void>();
  @Output() onRegresar = new EventEmitter<void>();
  @Output() onCargarDatos = new EventEmitter<void>();
  

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    
    this.cargando = true;

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
    var date= new Date();
    var mes = date.getMonth();
    mes++;
    this.fecha_actual = date.getFullYear()+"-"+mes+"-"+date.getDate();
    //console.log(this.fecha_actual);
    this.movimiento.get("fecha_movimiento").patchValue(this.fecha_actual);
    
  }

  asignarTipo(tipo: number){
         this.movimiento.get("tipo_movimiento_id").patchValue(tipo);
  }

  enviar() {
    this.onEnviar.emit();
  }

  regresar() {
    this.onRegresar.emit();
  }
  
}
