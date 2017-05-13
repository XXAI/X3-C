import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Movimiento } from '../movimiento';
import { Insumo     } from '../movimiento';

@Component({
  moduleId: module.id,
  selector: 'entradas-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  @Input() insumos: Insumo[];
  @Input() movimiento:FormGroup;

  @Input()  movimientoRepetido:boolean;
  @Input()  movimientoInvalido:boolean;
  @Input()  cargando: boolean;
  @Input()  cargandoDatos: boolean;
  @Input()  listaAgregados: Array<string> = [];
  @Input()  insumosForm : Insumo[];

  insumosAgregadosEntrada: Insumo[]= [];
  servidor_id: string;
  listaStatus: any [] = [];

  @Output() onEnviar : EventEmitter<any[]> = new EventEmitter();
  @Output() onRegresar = new EventEmitter<void>();
  @Output() onCargarDatos = new EventEmitter<void>();

  ngOnInit() {
    this.listaStatus=[{id:"FI", nombre:"Finalizado"}, {id:"BR", nombre:"Borrador"}];
    this.movimiento.patchValue({status: "FI"});
    //console.log(this.movimiento.value);
  }


  enviar() {
    this.onEnviar.emit(this.insumosAgregadosEntrada);
    console.log(this.insumosAgregadosEntrada);
   
  }

  regresar() {
    this.onRegresar.emit();
  }

}
