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
  listaEntregasEstadisticaDiaria:any[] = [];
  
  cargandoFechas:boolean = false;
  cargandoEstadisticasGlobales:boolean = false;



  constructor(private title: Title, private apiService: AdministradorCentralService) { 
   
  }

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

        this.listaEntregasEstadisticaDiaria = [];
        for(var i in this.estadisticasGlobales){

          

         
          this.listaEntregasEstadisticaDiaria.push({
            proveedor_id: this.estadisticasGlobales[i].proveedor_id,
            proveedor: this.estadisticasGlobales[i].proveedor,
            cargando: true,
            tipoDatos: 'claves',
            data: []
          });

          this.generarStatsDiariasProveedor(this.listaEntregasEstadisticaDiaria.length -1);

        }
        

        
      }, error => {
        this.cargandoEstadisticasGlobales = false;
        console.log(error)
      }
    );


  }

  generarStatsDiariasProveedor(index){
    console.log(this.listaEntregasEstadisticaDiaria[index]);
    var fecha_seleccionada = this.fecha.split("/");
    if(fecha_seleccionada.length != 2){
      return;
    }

    var entregasPedidosStatsPayload = {
      mes: fecha_seleccionada[0],
      anio: fecha_seleccionada[1],
      proveedor_id: this.listaEntregasEstadisticaDiaria[index].proveedor_id
    }
    this.listaEntregasEstadisticaDiaria[index].cargando = true;
    this.apiService.entregasPedidosStatsDiarias(entregasPedidosStatsPayload).subscribe(
      respuesta => {
        this.listaEntregasEstadisticaDiaria[index].cargando = false;
        this.listaEntregasEstadisticaDiaria[index].data = respuesta
        
        this.renderGrafica(index);
      }, error => {
        console.log(error);
        this.listaEntregasEstadisticaDiaria[index].cargando = false;
      });
  }


  renderGrafica(index){
    var categorias: string[] = [];

    var causes:any [] = [];
    var no_causes:any [] = [];
    var material_curacion:any [] = [];

    for(var i in this.listaEntregasEstadisticaDiaria[index].data){
      categorias.push(this.listaEntregasEstadisticaDiaria[index].data[i].dia + " " + this.listaEntregasEstadisticaDiaria[index].data[i].mes_nombre);
      if(this.listaEntregasEstadisticaDiaria[index].tipoDatos == 'claves'){
        causes.push(this.listaEntregasEstadisticaDiaria[index].data[i].causes_claves || 0 );
        no_causes.push(this.listaEntregasEstadisticaDiaria[index].data[i].no_causes_claves || 0 );
        material_curacion.push(this.listaEntregasEstadisticaDiaria[index].data[i].material_curacion_claves || 0 );
      }

      if(this.listaEntregasEstadisticaDiaria[index].tipoDatos == 'insumos'){
        causes.push(this.listaEntregasEstadisticaDiaria[index].data[i].causes_cantidad || 0 );
        no_causes.push(this.listaEntregasEstadisticaDiaria[index].data[i].no_causes_cantidad || 0 );
        material_curacion.push(this.listaEntregasEstadisticaDiaria[index].data[i].material_curacion_cantidad || 0 );
      }

      if(this.listaEntregasEstadisticaDiaria[index].tipoDatos == 'monto'){
        causes.push(Number(this.listaEntregasEstadisticaDiaria[index].data[i].causes_monto) || 0.00 );
        no_causes.push(Number(this.listaEntregasEstadisticaDiaria[index].data[i].no_causes_monto) || 0.00);
        material_curacion.push(Number(this.listaEntregasEstadisticaDiaria[index].data[i].material_curacion_monto) || 0.00 );
      }
      
    }

    var yAxis =  {} 
    if(this.listaEntregasEstadisticaDiaria[index].tipoDatos == 'claves'){
      yAxis = {
          min: 0,
          title: {
              text: 'Total claves'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: 'gray'
              }
          }
      }
    }

    if(this.listaEntregasEstadisticaDiaria[index].tipoDatos == 'insumos'){
      yAxis = {
          min: 0,
          title: {
              text: 'Total insumos'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: 'gray'
              }
          }
      }
    }
    if(this.listaEntregasEstadisticaDiaria[index].tipoDatos == 'monto'){
      yAxis = {
          min: 0,
          title: {
              text: 'Total en monto'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: 'gray'
              }
          }
      }
    }
    
    this.listaEntregasEstadisticaDiaria[index].options = {
      chart:{type: 'column'},
      xAxis: {
          categories: categorias
      },
      yAxis: yAxis,
      legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor: 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true,
              }
          }
      },
      title : { text : 'Entrega de insumos' },
      series: [{
          name: 'Causes',
          data: causes,
      },
      {
          name: 'No Causes',
          data: no_causes,
      },
      {
          name: 'Material Curacion',
          data: material_curacion,
      }]
    } 

  }
  
}
