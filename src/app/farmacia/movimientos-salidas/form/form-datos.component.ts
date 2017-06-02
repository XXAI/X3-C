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
    private movimientosEntradasService: MovimientosSalidasService,
  ) { }

  datos: any[];
  itemsDatos: any[];
  listaMovimientos: any[];
  private usuario: any = {}
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
    var date= new Date();
    this.fecha_actual = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    this.movimiento.get("fecha_movimiento").patchValue(this.fecha_actual);
    //console.log(this.movimiento.get("tipo_movimiento_id").value);
    
    //this.movimiento.patchValue({almacen_id: this.servidorId});
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
