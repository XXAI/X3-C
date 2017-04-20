import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//import { Rol }       from '../../roles/rol';


@Component({
  selector: 'farmacia-entradas-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

 // @Input() roles: Rol[];
  @Input() usuario:FormGroup;

  @Input()  usuarioRepetido:boolean;
  @Input() usuarioInvalido:boolean;
  @Input()  cargando: boolean;
  @Input()  cargandoRoles: boolean;
  @Input()  mostrarCambiarPassword:boolean;

  @Output() onEnviar = new EventEmitter<void>();
  @Output() onRegresar = new EventEmitter<void>();
  @Output() onToggleCambiarPassword = new EventEmitter<void>();
  @Output() onCargarRoles = new EventEmitter<void>();

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

  
}
