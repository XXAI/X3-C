import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PedidosService } from '../pedidos.service';

import { Subscription }   from 'rxjs/Subscription';

import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  usuario:any;
  presupuestos: any[];
  presupuestoSeleccionado: number;
  cargando: boolean = false;
  cargando_presupuesto: boolean = false;
  nueva_version_presupuesto: boolean = false;

  stats: any = {
    ordinarios_bandeja:0,
    ordinarios_borrador:0,
    ordinarios:0,
    todos: 0, 
    borradores: 0,
    solicitados: 0,
    en_transito: 0,
    por_surtir: 0,
    finalizados: 0,
    expirados: 0,
    expirados_cancelados: 0,
    farmacia: 0,
    alternos: 0,
    recepcion:0
  };

  @Output() onCambiarPresupuesto = new EventEmitter<void>();

  cambiarEntornoSuscription: Subscription;

  constructor(private pedidosService:PedidosService, private cambiarEntornoService:CambiarEntornoService) { }

  ngOnInit() {
    this.cambiarEntornoSuscription = this.cambiarEntornoService.entornoCambiado$.subscribe(evento => {
      this.stats = {
        ordinarios_bandeja:0,
        ordinarios_borrador:0,
        ordinarios:0,
        todos: 0, 
        borradores: 0,
        solicitados: 0,
        en_transito: 0,
        por_surtir: 0,
        finalizados: 0,
        expirados: 0,
        expirados_cancelados: 0,
        farmacia: 0,
        alternos: 0,
        actas:0, 
        recepcion:0
      };
      this.cargarStatsPedidos();
      this.cargarPresupuestos();
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    });
    let presupuesto_seleccionado = localStorage.getItem('presupuestoSeleccionado');
    let nueva_version_presupuesto_seleccionada = localStorage.getItem("nuevaVersionPresupuesto");
    if(presupuesto_seleccionado){
      this.presupuestoSeleccionado = +presupuesto_seleccionado;
    }
    this.nueva_version_presupuesto = nueva_version_presupuesto_seleccionada == "true";
    
   // this.cargarStatsPedidos();
    this.cargarPresupuestos();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(this.usuario);
  }

  setPresupuesto(data) {
    this.presupuestos = data;
    let presupuesto_seleccionado = localStorage.getItem('presupuestoSeleccionado');
    if (!presupuesto_seleccionado) {
      for (let i in this.presupuestos) {
        if (this.presupuestos[i].activo) {
          localStorage.setItem('presupuestoSeleccionado', this.presupuestos[i].id);
          this.presupuestoSeleccionado = this.presupuestos[i].id;
          break; 
        }
      }
    }
    this.cambioPresupuesto();
    this.cargando_presupuesto = false;
  }
  cargarPresupuestos(){
    this.presupuestos = [];
   // this.presupuestoSeleccionado = null;
    //localStorage.removeItem('presupuestoSeleccionado');
    this.cargando_presupuesto = true;
    if(this.nueva_version_presupuesto){
      this.pedidosService.pedidosStatsPresupuestos().subscribe(
        response => {
          this.setPresupuesto(response.data);
        },
        error => {
          console.log(error);
          this.cargando_presupuesto = false;
        }
      );
    } else{
      console.log("cargar version vieja");
      this.pedidosService.presupuestos().subscribe(
        response => {
          this.setPresupuesto(response.data);
        },
        error => {
          console.log(error);
          this.cargando_presupuesto = false;
        }
      );
    }
    
  }
  cambiarVersionPresupuesto(){
    this.nueva_version_presupuesto = !this.nueva_version_presupuesto;
    localStorage.setItem("nuevaVersionPresupuesto", this.nueva_version_presupuesto.toString());
    localStorage.removeItem('presupuestoSeleccionado');
    this.cargarPresupuestos();
  }

  cambioPresupuesto(){
    if(this.presupuestoSeleccionado == null){
      return;
    }
    console.log(this.presupuestoSeleccionado);
    localStorage.setItem('presupuestoSeleccionado',this.presupuestoSeleccionado.toString());
    this.cargarStatsPedidos();
    this.onCambiarPresupuesto.emit();
  }

  cargarStatsPedidos(){
    this.cargando = true;
    let presupuesto = +localStorage.getItem('presupuestoSeleccionado');

    if(this.nueva_version_presupuesto){
      this.pedidosService.pedidosStats({presupuesto : presupuesto, nueva_version: this.nueva_version_presupuesto}).subscribe(
        response => {
          this.cargando = false;
          this.stats = response;
        },
        error => {
          this.cargando = false;
          console.log(error);
        }
      );
    } else {    
      this.pedidosService.stats(presupuesto).subscribe(
        response => {
          this.cargando = false;
          this.stats = response;
        },
        error => {
          this.cargando = false;
          console.log(error);
        }
      );
    }
  }


  ngOnDestroy(){
    this.cambiarEntornoSuscription.unsubscribe();
  }

}
