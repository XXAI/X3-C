import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Rol }       from '../../roles/rol';


@Component({
  selector: 'panel-control-usuarios-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  @Input() roles: Rol[];
  @Input() unidadesMedicas: any[];
  @Input() usuario:FormGroup;

  @Input()  usuarioRepetido:boolean;
  @Input()  usuarioInvalido:boolean;
  @Input()  cargando: boolean;
  @Input()  cargandoRoles: boolean;
  @Input()  mostrarCambiarPassword:boolean;

  @Output() onEnviar = new EventEmitter<void>();
  @Output() onRegresar = new EventEmitter<void>();
  @Output() onToggleCambiarPassword = new EventEmitter<void>();
  @Output() onCargarRoles = new EventEmitter<void>();

  private tab:number = 1;
  private unidadesMedicasAgregadas: any[] = [];
  private cluesAgregadas: string[] = [];
  private unidadMedicaSeleccionada = null;

  private almacenesSeleccionados: any[] = [];
  private idsAlmacenesSeleccionados: string[] = [];

  ngOnInit() {
  }

  enviar() {
    this.onEnviar.emit();
  }
  cargarRoles(){
     this.onCargarRoles.emit();
  }

  regresar() {
    this.onRegresar.emit();
  }

  toggleCambiarPassword() {
    this.onToggleCambiarPassword.emit();
  }

  agregarUnidadMedica(clues){
    

    for(var i in this.unidadesMedicas){
      if(this.unidadesMedicas[i].clues == clues){
        this.unidadesMedicasAgregadas.push(this.unidadesMedicas[i]);
        this.cluesAgregadas.push(clues);
        this.usuario.controls['unidadesMedicas'].setValue(this.cluesAgregadas);
      }
    }
  }

  eliminarClues(event,item,index){
    event.preventDefault();
    event.stopPropagation();
  }

  toggleAlmacen(item){
    var bandera = false;
    for(var i = 0; i < this.almacenesSeleccionados.length; i++){
      if(this.almacenesSeleccionados[i].id == item.id){
        console.log(i)
        this.almacenesSeleccionados.splice(i,1);
        console.log(this.almacenesSeleccionados);
        this.idsAlmacenesSeleccionados.splice(i,1);
        item.seleccionado = false;
        bandera = true;
        console.log("me desseleccione")
        break;
      }
    }
    if(!bandera) {
      this.almacenesSeleccionados.push(item)
      this.idsAlmacenesSeleccionados.push(item.id)
      item.seleccionado = true;
      console.log("me seleccione")
    }

    this.usuario.controls['almacenes'].setValue(this.idsAlmacenesSeleccionados);
    
  }

  
  

  
}
