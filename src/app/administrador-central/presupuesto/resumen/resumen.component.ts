import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from "../presupuesto.service";

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  providers:[PresupuestoService]
})
export class ResumenComponent implements OnInit {
  tabPresupuesto:boolean = true;
  tabHistorico:boolean = false;
  mostrarModalModificado:boolean = false;
  mostrarModalPedidos:boolean = false;
  modalCauses:boolean = false;

  //loaders
  cargandoEjercicios:boolean = false;
  cargandoPresupuestoUnidadesMedicas:boolean = false;
  cargandoHistorial:boolean = false;
  cargandoHistorialAjustes:boolean = false;
  //Ids
  ejercicioSeleccionado:any;

  //listas
  historial:any[] = [];
  ejercicios:any[] = [];
  presupuestoUnidadesMedicas:any[] = [];
  presupuestoUnidadesMedicasTotales:any = {
    causes_autorizado:0,
    no_causes_autorizado:0,
    causes_modificado:0,
    no_causes_modificado:0,
    causes_comprometido:0,
    no_causes_comprometido:0,
    causes_devengado:0,
    no_causes_devengado:0,
    causes_disponible:0,
    no_causes_disponible:0,
  }

  itemPresupuestoModificado:any = {};

  tituloModalPedidos:string ="";

  constructor(private apiService: PresupuestoService) { }

  ngOnInit() {
    this.cargarEjercicios();
    this.cargarHistorial();
  }

  exportarPresupuestoExcel() {
		var query = "token=" + localStorage.getItem('token');
		window.open(`${environment.API_URL}/administrador-central/presupuesto/excel/${this.ejercicioSeleccionado.id}?${query}`);
  }
  
  exportarHistorialExcel() {
		var query = "token=" + localStorage.getItem('token');
		window.open(`${environment.API_URL}/administrador-central/presupuesto/excel/historial?${query}`);
	}

  cargarEjercicios(){
    this.cargandoEjercicios = true;
    this.apiService.ejercicios().subscribe(
      respuesta => {
        this.cargandoEjercicios = false;
        this.ejercicios = respuesta;
        if(this.ejercicios.length>0){
          this.ejercicioSeleccionado = this.ejercicios[0];
          this.cargarPresupuestoUnidadesMedicas();
          
        }
      }, error => {
        this.cargandoEjercicios = false;
        console.log(error);
      }
    )
  }
  cargarPresupuestoUnidadesMedicas(){
    this.cargandoPresupuestoUnidadesMedicas = true;
    this.presupuestoUnidadesMedicasTotales = {
      causes_autorizado:0,
      no_causes_autorizado:0,
      causes_modificado:0,
      no_causes_modificado:0,
      causes_comprometido:0,
      no_causes_comprometido:0,
      causes_devengado:0,
      no_causes_devengado:0,
      causes_disponible:0,
      no_causes_disponible:0,
    }
    this.apiService.presupuestoUnidadesMedicas(this.ejercicioSeleccionado.id).subscribe(
      respuesta => {
        this.cargandoPresupuestoUnidadesMedicas = false;
        this.presupuestoUnidadesMedicas = respuesta;        

        for(var i in this.presupuestoUnidadesMedicas){
          this.presupuestoUnidadesMedicasTotales.causes_autorizado += this.presupuestoUnidadesMedicas[i].causes_autorizado;
          this.presupuestoUnidadesMedicasTotales.no_causes_autorizado += this.presupuestoUnidadesMedicas[i].no_causes_autorizado;

          this.presupuestoUnidadesMedicasTotales.causes_modificado += this.presupuestoUnidadesMedicas[i].causes_modificado;
          this.presupuestoUnidadesMedicasTotales.no_causes_modificado += this.presupuestoUnidadesMedicas[i].no_causes_modificado;

          this.presupuestoUnidadesMedicasTotales.causes_comprometido += this.presupuestoUnidadesMedicas[i].causes_comprometido;
          this.presupuestoUnidadesMedicasTotales.no_causes_comprometido += this.presupuestoUnidadesMedicas[i].no_causes_comprometido;

          this.presupuestoUnidadesMedicasTotales.causes_devengado += this.presupuestoUnidadesMedicas[i].causes_devengado;
          this.presupuestoUnidadesMedicasTotales.no_causes_devengado += this.presupuestoUnidadesMedicas[i].no_causes_devengado;

          this.presupuestoUnidadesMedicasTotales.causes_disponible += this.presupuestoUnidadesMedicas[i].causes_disponible;
          this.presupuestoUnidadesMedicasTotales.no_causes_disponible += this.presupuestoUnidadesMedicas[i].no_causes_disponible;
        }
      }, error => {
        this.cargandoPresupuestoUnidadesMedicas = false;
        console.log(error);
      }
    )
  }

  cargarHistorial(){
    this.cargandoHistorial = true;
    this.apiService.historial().subscribe(
      respuesta => {
        this.cargandoHistorial = false;
        this.historial = respuesta;
        //console.log(respuesta);
      }, error => {
        this.cargandoHistorial = false;
        console.log(error);
      }
    )
  }

  cargarHistorialAjustes(clues:any, causes:boolean){
    this.cargandoHistorialAjustes = true;
    this.apiService.historialAjustes({clues: clues, causes: causes}).subscribe(
      respuesta =>{
        this.cargandoHistorialAjustes = false;

      }, error =>{
        this.cargandoHistorialAjustes = false;
      }
    )
  }
  cambioSeleccionEjercicio(ejercicio:any){
    this.presupuestoUnidadesMedicas = [];
    
    if(ejercicio != ""){    
      for(var i in this.ejercicios){        
        if(this.ejercicios[i].id == ejercicio){
          this.ejercicioSeleccionado = this.ejercicios[i];  
          this.cargarPresupuestoUnidadesMedicas();
          return;
        }
      }
      
    }
  }
  abrirModalModificado(item:any, causes:boolean = true){

    if(causes){
      this.cargarHistorialAjustes(item.clues, causes);
    } else {
      this.cargarHistorialAjustes(item.clues, causes);
    }
    this.itemPresupuestoModificado = item;
    this.modalCauses = causes;
    this.mostrarModalModificado = true;
  }

  abrirModalComprometido(causes:boolean = true){
    
    if(causes){

    } else {

    }
    this.tituloModalPedidos = "Presupuesto comprometido"
    this.modalCauses = causes;
    this.mostrarModalPedidos = true;
  }

  abrirModalDevengado(causes:boolean = true){

    if(causes){

    } else {

    }
    this.tituloModalPedidos = "Presupuesto devengado"
    this.modalCauses = causes;
    this.mostrarModalPedidos = true;
  }
}
