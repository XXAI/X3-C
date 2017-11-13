import { Component, OnInit, Input } from '@angular/core';

import { BuscarModuloPipe } from '../../pipes/buscar-modulo.pipe';

import { Subscription }   from 'rxjs/Subscription';

import { CambiarEntornoService } from '../../perfil/cambiar-entorno.service';

@Component({
  selector: 'menu-medicos',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: any = {}
  
    @Input() modulo:string;
    @Input() icono:string;
    @Input() url:string;
  
    private cambiarEntornoSuscription: Subscription;
  
    constructor(private cambiarEntornoService:CambiarEntornoService) { }
  
    ngOnInit() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.cambiarEntornoSuscription = this.cambiarEntornoService.entornoCambiado$.subscribe(evento => {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
      });
    }
  
    ngOnDestroy(){
      this.cambiarEntornoSuscription.unsubscribe();
    }

}
