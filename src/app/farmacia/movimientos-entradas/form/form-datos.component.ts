import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { MovimientosEntradasService }  from  '../movimientos-entradas.service';

import { Movimiento } from '../movimiento';
import { Insumo     } from '../movimiento';

@Component({
  moduleId: module.id,
  selector: 'entradas-form-datos',
  templateUrl: './form-datos.component.html'
})
export class FormDatosComponent implements OnInit {

  constructor(
    private movimientosEntradasService: MovimientosEntradasService,
  ) { }

  datos: any[];
  itemsDatos: any[];
  listaMovimientos: any[];
  private usuario: any = {}
  
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
    console.log(this.usuario);
    console.log("*****************");
    this.movimientosEntradasService.listaDatos("almacenes").subscribe(
       datos => {
         this.datos = datos;
         console.log(this.datos);
         for (let data of this.datos) {
           if(data.usuario_id == this.usuario.id){
           console.log(data.usuario_id);
           console.log(this.usuario.id);
              for (let tipo_movimiento of data.tipos_movimientos) {
                  //console.log("almacen_tipos_movimientos");
                  this.listaMovimientos = tipo_movimiento.tipo_movimiento;
                  //console.log(this.listaMovimientos);
                  //console.log(almacen_tipo_movimiento.tipo_movimiento.nombre);                  
              }
           }
          }
         console.log(this.datos);
        }, //Bind to view
       err => {
              // Log errors if any
              console.log(err);
          });
  }

  listarDatos(){
     
  }

  enviar() {
    this.onEnviar.emit();
  }

  regresar() {
    this.onRegresar.emit();
  }
  
}
