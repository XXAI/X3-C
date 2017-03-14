import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'app/auth.service';

import { ESTA_SALUD_ID_DISPONIBLE } from 'app/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private saludIdDisponible: boolean;
  private credenciales: any = {};
  private loading: boolean = false;
  private returnUrl: string;
  private mensaje: string = "";
  private mostrarMensaje: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.saludIdDisponible = ESTA_SALUD_ID_DISPONIBLE;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.loading = true;
    this.mostrarMensaje = false;
    

    this.authService.login(this.credenciales.id, this.credenciales.password)
      .subscribe(
       

        data => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
          localStorage.removeItem('bloquear_pantalla');
        },
        error => {
          this.loading = false;
          this.mostrarMensaje = true;
          this.mensaje = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          try {
            let e = error.json();
            
            if (error.status == 401){
              this.mensaje = "Lo sentimos el usuario y/o contraseña no son válidos."
            }

            if (error.status == 0){
              this.mensaje = "Conexión rechazada."
            }

            if (error.status == 500 ){
              this.mensaje = "500 (Error interno del servidor)";
            } 
          } catch(e){
            if (error.status == 500 ){
              this.mensaje = "500 (Error interno del servidor)";
            } 
          }
          
        }
      );
  }

}
