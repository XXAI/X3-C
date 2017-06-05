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
  private usuario: any = {};
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
    if(!this.movimiento.get("fecha_movimiento").value){
      var mes = date.getMonth();
      mes++;
      this.fecha_actual = date.getFullYear()+"-"+mes+"-"+date.getDate();
      this.movimiento.get("fecha_movimiento").patchValue(this.fecha_actual);
    }else{
      this.fecha_actual = this.movimiento.get("fecha_movimiento").value;
    }
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
