import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Mensaje } from '../../../mensaje';
import { ReporteSalidaService } from '../reporte-salida.service';
import { environment } from '../../../../environments/environment';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  //@ViewChild('searchBox') searchBox: any;

 

  tamano = (document.body.offsetWidth) * 0.95;
  Tipo_Usuario = false;

  tabla_insumos: any[] = [];
  options_insumos: Object = {};
  options_insumos_tipo_medicamento: Object = {};

  tabla_turnos: any[] = [];
  options_turnos: Object = {};

  tabla_servicios: any[] = [];
  options_servicios: Object = {};

  busquedaQuery:String = '';
  filtroClues:String = "";
  filtroCluesPrincipal:String = "";

  catalogo_turno:any;
  catalogo_servicio:any;
  catalogo_clues:any[] = [];
  showPrimerModal = false;
  searchClue:any;

  fecha_desde:any;
  fecha_hasta:any;


  

  titulo:String = "Reporte de Salidas de Medicamento y Material de Curación";



  today:any = new Date();
  dia_actual:string = this.today.getFullYear() +"/"+(this.today.getMonth()+1)+"/"+this.today.getDate();
  filter:any = {desde: this.dia_actual, hasta: this.dia_actual, clues:"", orden: 1};

  //Registros Compensatorios
  registros_ceros:any[] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  registros_grafica_ceros:any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  meses:any[] = ["Todos", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  cargando: boolean = false;
  busquedaActivada:boolean = false;
  colores:string[] =  ["#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
  "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
  "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
  "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
  "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
  "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
  "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
  "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
  "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
  "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
  "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
  "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
  "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
  "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
  "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
  "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
  /*'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'*/];

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  constructor(
    private title: Title,
    private http: Http,
    private reportesalidaService: ReporteSalidaService
  ) { }

  ngOnInit() {
    this.listar();
    this.cargar_catalogo();
    this.title.setTitle("Reporte Salida Medicamento");
    /* configuracion de calendario */
    this.configurar_date_picker();
    /* fin configuracion */

  }

  configurar_date_picker():void{
    NguiDatetime.daysOfWeek = [
      { fullName: 'Domingo', shortName: 'Do' },
      { fullName: 'Lunes', shortName: 'Lu' },
      { fullName: 'Martes', shortName: 'Ma' },
      { fullName: 'Miercoles', shortName: 'Mi' },
      { fullName: 'Jueves', shortName: 'Ju' },
      { fullName: 'Viernes', shortName: 'Vi' },
      { fullName: 'Sabado', shortName: 'Sa' }
    ];

    NguiDatetime.locale = {
      date: 'Fecha',
      time: 'Hora',
      year: 'Año',
      month: 'Mes',
      day: 'Dia',
      hour: 'Hora',
      minute: 'Minuto',
      currentTime: "Hora actual"
    };

    NguiDatetime.months = [
      { fullName: 'Enero', shortName: 'Ene' },
      { fullName: 'Febrero', shortName: 'Feb' },
      { fullName: 'Marzo', shortName: 'Mar' },
      { fullName: 'Abril', shortName: 'Abr' },
      { fullName: 'Mayo', shortName: 'May' },
      { fullName: 'Junio', shortName: 'Jun' },
      { fullName: 'Julio', shortName: 'Jul' },
      { fullName: 'Augosto', shortName: 'Ago' },
      { fullName: 'Septiembre', shortName: 'Sep' },
      { fullName: 'Octubre', shortName: 'Oct' },
      { fullName: 'Noviembre', shortName: 'Nov' },
      { fullName: 'Deciembre', shortName: 'Dic' }
    ];

    this.fecha_desde = new Date();
    this.fecha_hasta = new Date();
    
  }

    listar():void
  {
    this.cargando = true;

    this.tabla_insumos = [];
    this.options_insumos = {};
    this.options_insumos_tipo_medicamento = {};

    this.tabla_turnos = [];
    this.options_turnos = {};

    this.tabla_servicios = [];
    this.options_servicios = {};
    
    this.reportesalidaService.listar(this.filter).subscribe(
      response => {
        if(response.usuario == 1)
        this.Tipo_Usuario = true;

          this.cargando=false;
          let datos_insumos:any;
          let datos_pastel:any;
          let datos_turnos:any;
          let datos_servicios:any;
          datos_insumos = this.cargar_catalogo_barras(response.salidas, response.cantidad_mes_actual);
          datos_pastel = this.cargar_catalogo_pastel(datos_insumos[2]);

          datos_turnos = this.cargar_catalogo_barras_turnos(response.turnos, response.cantidad_mes_actual);
          datos_servicios = this.cargar_catalogo_barras_turnos(response.servicios, response.cantidad_mes_actual);
          
          this.tabla_insumos    = datos_insumos[0];
          this.tabla_turnos     = datos_turnos[0];
          this.tabla_servicios     = datos_servicios[0];
          console.log(datos_servicios);
          var menu:string = "";
          
          if(this.filter.orden == 1)
            menu = " Surtidos ";
          else
            menu = " Negados "

          if(this.filter.desde == this.filter.hasta)  
            menu += " de "+this.filter.desde;  
          else if(this.filter.desde > this.filter.hasta) 
            menu += " de "+this.filter.hasta+" a "+this.filter.desde;  
          else if(this.filter.hasta > this.filter.desde) 
            menu += " de "+this.filter.desde+" a "+this.filter.hasta;   

          let clues = "";  
           if(this.filter.clues!='')
            clues = response.clues.clues+" - "+response.clues.nombre;
           else
            clues = "Todas"; 
        
            this.options_insumos                  = this.graficar_barras("Insumos  "+menu, "Clues: "+clues, datos_insumos);   
       
            this.options_insumos_tipo_medicamento = this.graficas_pastel("Insumos  "+menu, "Clues: "+clues, datos_pastel[1], datos_insumos[3]);    

            this.options_turnos                   = this.graficar_barras_turnos("Insumos  "+menu, "Clues: "+clues, datos_turnos);   
            this.options_servicios                = this.graficar_barras_turnos("Insumos  "+menu, "Clues: "+clues, datos_servicios);   
        
      },
      error => {
          this.cargando=false;
          console.log(error);
      }
    );
  }

  cargar_catalogo():void{
    this.reportesalidaService.catalogos().subscribe(
        response => {
           this.catalogo_turno = response.catalogo_turno;  
           this.catalogo_servicio = response.catalogo_servicio;  
           this.catalogo_clues = response.catalogo_clues;  
            
        },
        error => {
            this.cargando=false;
            console.log(error);
        }
      );
  }

  imprimirExcel()
  {
    var query = "token="+localStorage.getItem('token');
    
    query += "&desde="+this.filter.desde;
    query += "&hasta="+this.filter.hasta;
    query += "&clues="+this.filter.clues;
    query += "&orden="+this.filter.orden;
    window.open(`${environment.API_URL}/reporte-salida-reporte-excel/?${query}`);
  }

  seleccionaClues(seleccion:any)
  {
    this.showPrimerModal = false;
    this.filtroClues = seleccion.clues+" - "+seleccion.nombre;
    this.filtro(3, seleccion.clues);
  }

  filtro(tipo:number, valor:any)
  {

        switch (tipo) {
            case 1: this.filter.desde = valor; break;
            case 2: this.filter.hasta = valor; break;
            case 3: this.filter.clues = valor; break;
            case 4: this.filter.orden = valor; break;
        
            default:
            break;
        }
  }

  buscarClues(clues:String)
  {
        this.showPrimerModal = true;
        this.busquedaQuery = clues;
        //this.searchClue.nativeElement.focus();
  }
  
  borrar_clues()
  {
    this.filter.clues = "";
    this.filtroClues = "";
    this.showPrimerModal = false;
  }

  cargar_catalogo_pastel(obj:any):any{
      let grafica: any[] = [];
      let total:number = 0;
      let resultado: any[] = [];
      for(let i = 0; i < obj.length; i++)
      {
          total = total + parseFloat(obj[i].cantidad);
      }

      for(let i = 0; i < obj.length; i++)
      {
          /*obj[i].porcentaje = (parseFloat(obj[i].cantidad) / total) * 100;
          obj[i].porcentaje = parseFloat(obj[i].porcentaje.toFixed(2));*/
          obj[i].porcentaje = parseFloat(obj[i].cantidad);
      }
      
      for(let i = 0; i < obj.length; i++)
      {
          var serie = { name: obj[i].descripcion, y: obj[i].porcentaje, drilldown: obj[i].descripcion, total : total };
          grafica.push(serie);
      }

      resultado[0] = obj;
      resultado[1] = grafica;
      return resultado;
  }

  cargar_catalogo_barras(obj:any, mes:any):any{
    let grafica: any[] = [];
    let resultado: any[] = [];
    let total:number = 0;
    let total_causes:number = 0;
    let total_no_causes:number = 0;
    let total_material:number = 0;
    let pastel:any[] = [{descripcion:'Causes', cantidad:0}, {descripcion: 'No causes', cantidad:0}, {descripcion:'Material de Curacion', cantidad:0}];
    let indices: any = [];
    
    let causes:any[] = [];
    let no_causes:any[] = [];
    let material:any[] = []; 
    let drilldown:any =  [{ name: "Causes", id: "Causes", data: causes }, {name:"No causes", id:'No causes', data: no_causes}, {name:"Material de Curacion", id:'Material de Curacion', data: material}];
    
    

    for(let i = 0; i < obj.length; i++)
    {
      
        if(this.filter.orden == 1)
          obj[i].cantidad = obj[i].surtido;
        else
          obj[i].cantidad = obj[i].negado;
          
        total = total + parseFloat(obj[i].cantidad);
        if(obj[i].tipo == "ME")
        {
          if(obj[i].es_causes == 1)
          {
            total_causes = total_causes + parseFloat(obj[i].cantidad);
          }
          else
          {
            total_no_causes = total_no_causes + parseFloat(obj[i].cantidad);
          }
        }else if(obj[i].tipo == "MC")
        {
          total_material = total_material + parseFloat(obj[i].cantidad);
        }
        console.log(this.filter.orden+" -- "+obj[i].cantidad);
    }

    for(let i = 0; i < obj.length; i++)
    {
        indices.unshift( ( i+ 1 ));
        let valor:any; 
        var serie = { name: obj[i].descripcion, y:  parseFloat(obj[i].cantidad)   };
        grafica.unshift(serie);

        obj[i].porcentaje = (parseFloat(obj[i].cantidad) / total) * 100;
        obj[i].porcentaje = parseFloat(obj[i].porcentaje.toFixed(2));
        obj[i].cpm = parseFloat(obj[i].cantidad_anual) / parseInt(mes);
        obj[i].cpm = parseFloat(obj[i].cpm.toFixed(2));

        if(obj[i].tipo == "ME")
        {
          if(obj[i].es_causes == 1)
          {
            pastel[0].cantidad += parseFloat(obj[i].cantidad);
            var serie_drill_drown = [obj[i].descripcion, parseFloat(obj[i].cantidad)];
            causes.push(serie_drill_drown);
            
          }
          else
          {
            pastel[1].cantidad += parseFloat(obj[i].cantidad);
            var serie_drill_drown = [obj[i].descripcion, parseFloat(obj[i].cantidad)];
            no_causes.push(serie_drill_drown);
            
          }
        }else if(obj[i].tipo == "MC")
        {
          pastel[2].cantidad += parseFloat(obj[i].cantidad);
          var serie_drill_drown = [obj[i].descripcion, parseFloat(obj[i].cantidad)];
          material.push(serie_drill_drown);
        }

    }

    resultado[0] = obj;
    resultado[1] = [ { name: "Medicamentos", colorByPoint: true, data: grafica } ];
    resultado[2] = pastel;
    resultado[3] = drilldown;
    resultado[4] = indices;
    return resultado;
}

cargar_catalogo_barras_turnos(obj:any, mes:any):any{
  let grafica: any[] = [];
  let resultado: any[] = [];
  let total:number = 0;
 
  let indices: any = [];
  let arreglo_objetos:  any[] = [];
  
  let drilldown = { series: []}
  for(let i = 0; i < obj.length; i++)
  {
      if(this.filter.orden == 1)
          obj[i].cantidad = obj[i].surtido;
        else
          obj[i].cantidad = obj[i].negado;
      total = total + parseFloat(obj[i].cantidad);
  }

  for(let i = 0; i < obj.length; i++)
  {
      obj[i].porcentaje = (parseFloat(obj[i].cantidad) / total) * 100;
      obj[i].porcentaje = parseFloat(obj[i].porcentaje.toFixed(2));
      obj[i].cpm = parseFloat(obj[i].cantidad) / parseInt(mes);
      obj[i].cpm = parseFloat(obj[i].cpm.toFixed(2));
      var serie = { name: obj[i].modulo, y:  parseFloat(obj[i].cantidad), porcentaje: parseFloat(obj[i].porcentaje),cpm: parseFloat(obj[i].cpm),  drilldown: obj[i].modulo  };
      grafica.push(serie);

      var serie_drill = { id:obj[i].modulo, data:[] };
      let arreglo_drill:any[] = [];
      let arreglo: any[] = [];
      for(let j = 0; j < obj[i].drill.length; j++)
      {
       
        obj[i].drill[j].porcentaje = (parseFloat(obj[i].drill[j].cantidad) / parseFloat(obj[i].surtido)) * 100;
        obj[i].drill[j].porcentaje = parseFloat(obj[i].drill[j].porcentaje.toFixed(2));
        obj[i].drill[j].cpm = parseFloat(obj[i].drill[j].cantidad) / parseInt(mes);
        obj[i].drill[j].cpm = parseFloat(obj[i].drill[j].cpm.toFixed(2));

        var detalle = { name:  (j + 1)+".-"+obj[i].drill[j].descripcion, y:   parseFloat(obj[i].drill[j].cantidad), porcentaje: parseFloat(obj[i].drill[j].porcentaje),cpm: parseFloat(obj[i].drill[j].cpm) };
        serie_drill.data.push(detalle);
      }
      
      drilldown.series.push(serie_drill);

      
}

  drilldown.series.push(arreglo_objetos);
  resultado[0] = obj;
  resultado[1] = [ { name: "Medicamentos", colorByPoint: true, data: grafica } ];
  resultado[2] = drilldown;
  return resultado;
}
  
  graficas_pastel(titulo:String, subtitulo:String, serie_master:any[], drilldrown_master:any):object{
    
    var data = new Object();
    data['chart']       = {  type: 'pie',  plotBackgroundColor: null,plotBorderWidth: null, plotShadow: false/*, width:this.tamano*/ };
    data['title']       = { text: titulo  };
    data['subtitle']    = { text: subtitulo  };
    data['tooltip']     = { formatter: function () { return '<b>'+this.point.name+' </b>: <br> <b>' + this.y + '</b> ( '+this.percentage.toFixed(2)+" % ) "; } };
    data['plotOptions'] = { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, formatter: function () { return this.percentage.toFixed(2)+" % "; }}, showInLegend: false  } };
    data['series']      = [{ name: 'Insumo', colorByPoint: true, data: serie_master }];
    data['drilldown']   = { series: drilldrown_master };
    data['credits']     = { enabled: true, href:"http://saludchiapas.gob.mx", text: "Instituto de Salud del Estado de Chiapas", style: { fofontSize: '20px' } };      
    return data;
  }

  graficar_barras(titulo:String, subtitulo:String, arreglo_meses:any[]):object{
    var data = new Object();
    data['chart']       = {  type: 'column',  height: 500 , width:1000 };
    data['colors']      = this.colores;
    data['title']       = { text: titulo  };
    data['subtitle']    = { text: subtitulo  };
    data['xAxis']       = { type: 'category', categories: arreglo_meses[4]};
    data['yAxis']       = { min: 0, title: {  text: 'Cantidad de Cajas' }};
    data['legend']      = { align: 'left', verticalAlign: 'bottom', width: 20, useHTML: true };
    data['tooltip']     = { enabled: true, 
                            headerFormat: '<span style="font-size:10px"><b>{point.key}</b></span><table>',   
                            pointFormat: '<tr><td style="padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        };
    data['plotOptions'] = { column: { pointPadding: 0.2, borderWidth: 0 }, series: {  borderWidth: 0, dataLabels: { enabled: true, format: '{point.y:.0f}  ' }} };
    data['series']      = arreglo_meses[1];
    data['exporting']   = { showtable: true };                   
    data['credits']     = { enabled: true, href:"http://saludchiapas.gob.mx", text: "Instituto de Salud del Estado de Chiapas", style: { fofontSize: '20px' } };      
   
    return data;
  }

  graficar_barras_turnos(titulo:String, subtitulo:String, arreglo_meses:any[]):object{
    var data = new Object();
    data['chart']       = {  type: 'column',  height: 1000, width:1800  };
    data['colors']      = this.colores;
    data['title']       = { text: titulo  };
    data['subtitle']    = { text: subtitulo  };
    data['xAxis']       = { type: 'category'};
    data['yAxis']       = { min: 0, title: {  text: 'Cantidad' }};
    data['legend']      = { align: 'left', verticalAlign: 'bottom', width: 20, useHTML: true, cursor: "pointer" };
    data['tooltip']     = { enabled: true, 
                            headerFormat: '<span style="font-size:10px"><b>{point.key}</b></span><table>',   
                            pointFormat: '<tr><td style="padding:0">Cantidad: </td><td style="padding:0"><b>{point.y:.2f} </b></td>'+
                            '</tr><tr><td style="padding:0">Porcentaje: </td><td style="padding:0"><b>{point.porcentaje} </b></td></tr>'+
                            '</tr><tr><td style="padding:0">C.P.M.: </td><td style="padding:0"><b>{point.cpm} </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        };
    data['plotOptions'] = { column: { pointPadding: 0.2, borderWidth: 0 }, series: {  borderWidth: 0, dataLabels: { enabled: true, format: '{point.y:.2f}  ' }} };
    data['series']      = arreglo_meses[1];
    data['drilldown']   = arreglo_meses[2];
    
    data['dataLabels']  = { formatter: function () { return '<b>'+this.point.name+' </b>: <br> <b>' + this.y + '</b> ( '+this.percentage.toFixed(2)+" % ) "; } };                   
    data['exporting']   = { showtable: true };                   
    data['credits']     = { enabled: true, href:"http://saludchiapas.gob.mx", text: "Instituto de Salud del Estado de Chiapas", style: { fofontSize: '20px' } };  
    data['responsive']  = { rules: [{ condition: { maxWidth: 800 },  chartOptions: { legend: { align: 'center', verticalAlign: 'bottom', layout: 'horizontal' }, yAxis: { labels: { align: 'left', x: 0, y: -5 }, title: { text: null } }, subtitle: { text: null }, credits: { enabled: false } } }] }   
    

    
    return data;
  }
}
