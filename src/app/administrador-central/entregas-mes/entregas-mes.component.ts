import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { Mensaje } from '../../mensaje'

import { AdministradorCentralService } from '../administrador-central.service';

@Component({
  selector: 'app-entregas-mes',
  templateUrl: './entregas-mes.component.html',
  styleUrls: ['./entregas-mes.component.css']
})
export class EntregasMesComponent implements OnInit {

  cargando: boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION
  
  listaMesesAnios:any[] = [];
  fecha:any = -1;

  estadisticasGlobales:any[] = [];
  
  cargandoFechas:boolean = false;

  cargandoEstadisticasGlobales:boolean = false;

  constructor(private title: Title, private apiService: AdministradorCentralService) { }

  ngOnInit() {
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();
    
    this.title.setTitle("Entregas del mes / Administrador central");
    
    this.cargandoFechas = true;
    this.apiService.mesesAniosPedidos().subscribe(
      respuesta => {
        this.cargandoFechas = false;
        this.listaMesesAnios = respuesta;
        if(this.listaMesesAnios.length > 0){
          this.fecha = this.listaMesesAnios[0].fecha
          this.generarStats();
        }
        
      }, error => {
        this.cargandoFechas = false;
        console.log(error)
      }
    );

    
  }
  generarStats(){
    if(this.listaMesesAnios.length <= 0){
      return;
    } 

    var fecha_seleccionada = this.fecha.split("/");
    if(fecha_seleccionada.length != 2){
      return;
    }

    var entregasPedidosStatsPayload = {
      mes: fecha_seleccionada[0],
      anio: fecha_seleccionada[1]
    }

    this.cargandoEstadisticasGlobales = true;
    this.apiService.entregasPedidosStatsMesesAnios(entregasPedidosStatsPayload).subscribe(
      respuesta => {
        this.cargandoEstadisticasGlobales = false;
        this.estadisticasGlobales = respuesta;
        
      }, error => {
        this.cargandoEstadisticasGlobales = false;
        console.log(error)
      }
    );


  }
  
}
