import { Component, OnInit } from '@angular/core';
import { Location}           from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth.service';

//import { RolesService }       from '../../roles/roles.service';
import { EntradasService }       from '../entradas.service';

//import { Rol }       from '../../roles/rol';
import { Entrada }       from '../entrada';
import { Mensaje } from '../../../mensaje'

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  entrada: FormGroup;
  
  
  private id:string;
  private entradaRepetido:boolean = false;
  private entradaInvalido:boolean = false;
  private cambiarPassword:boolean = false;

  private datosCargados: boolean;
  private cargando: boolean = false;
  private cargandoRoles: boolean = false;
  //private roles: Rol[] = [];

   // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje()
  mensajeAdvertencia: Mensaje = new Mensaje()
  mensajeExito: Mensaje = new Mensaje();
  // # FIN SECCION

  constructor(
    private router: Router,
    private title: Title, 
    private authService:AuthService,
    private route: ActivatedRoute,
    private location: Location,
    //private rolesService: RolesService,
    private entradasService: EntradasService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.title.setTitle("Editar entrada / Panel de control");
    this.entrada = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      id: ['', [Validators.required]],
      cambiarPassword:[false,[]],
      password: [{value: '', disabled: true}, [Validators.required]],
      confirmarPassword: [{value: '', disabled: true}, [Validators.required]],
      avatar: ['avatar-circled-user-male'],
      roles: [[1],[Validators.required]]
    });

    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
      //this.cargarDatos();
    });

    //this.cargarRoles();
    
  }
  

  toggleCambiarPassword(){
    this.cambiarPassword = !this.cambiarPassword

    if(this.cambiarPassword){
      this.entrada.get('password').enable();
      this.entrada.get('confirmarPassword').enable();
    } else {
      this.entrada.get('password').disable();
      this.entrada.get('confirmarPassword').disable();
    }
    
  }

  enviar() {
    
    if (this.entrada.get('password').value != this.entrada.get('confirmarPassword').value) {
      return false;
    }
    this.cargando = true;    
    let entrada = this.entrada.value;
    if(!this.cambiarPassword){
      delete entrada.cambiarPassword;
    }
    this.entradasService.editar(this.id,this.entrada.value).subscribe(
        entrada => {
          this.cargando = false;
          console.log("Entrada editado.");

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
              this.entradaRepetido = false;
              this.entradaInvalido = false;
              for (var input in e.error){
                // Iteramos todos los errores
                for (var i in e.error[input]){

                  if(input == 'id' && e.error[input][i] == 'unique'){
                    this.entradaRepetido = true;
                  }
                  if(input == 'id' && e.error[input][i] == 'email'){
                    this.entradaInvalido = true;
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

  cargarDatos() {
    this.cargando = true;  
    console.log("Cargando entrada.");
    this.entradasService.ver(this.id).subscribe(
        entrada => {
          this.cargando = false;
          this.datosCargados = true;
          this.entrada.patchValue(entrada);

          console.log("Entrada cargado.");
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
/*
  cargarRoles() {
    this.cargandoRoles = true;
    this.rolesService.lista().subscribe(
        roles => {
          this.cargandoRoles = false;
          this.roles = roles;
          console.log("Roles cargados.");

          if (this.roles.length == 0){
            this.mensajeAdvertencia = new Mensaje(true);
            this.mensajeAdvertencia.texto = `
            No hay roles registrados en el sistema, póngase en contacto con un administrador.`;
            this.mensajeAdvertencia.mostrar = true;
          }

          this.cargarDatos();
        },
        error => {
          this.cargandoRoles = false;
          
          this.mensajeError = new Mensaje(true);
          this.mensajeError.texto = "No especificado.";
          this.mensajeError.mostrar = true;
          
          this.cargarDatos();
          
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para ver los roles.";
            }

            if (error.status == 500 ){
             
              this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
             
              this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los roles";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.  No se pudieron cargar los roles";
            }            
          }
          

        }
      );
  }*/

  regresar(){
    this.location.back();
  }

}
