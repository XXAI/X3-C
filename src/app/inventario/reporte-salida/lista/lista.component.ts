import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Mensaje } from '../../../mensaje';
import { ReporteSalidaService } from '../reporte-salida.service';
import { environment } from '../../../../environments/environment';

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

  titulo:String = "Reporte de Salidas de Medicamento y Material de Curación";

  filter:any = {desde:1, hasta:1, clues:"", orden: 1};

  //Registros Compensatorios
  registros_ceros:any[] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  registros_grafica_ceros:any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  meses:any[] = ["Todos", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  cargando: boolean = false;
  busquedaActivada:boolean = false;
  colores:string[] =  ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

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
    
  }

  listar():void
  {
    this.cargando = true;

    this.tabla_insumos = [];
    this.options_insumos = {};

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
          let datos_turnos:any;
          let datos_servicios:any;
          datos_insumos = this.cargar_catalogo_pastel(response.salidas);
          datos_turnos = this.cargar_catalogo_pastel(response.turnos);
          datos_servicios = this.cargar_catalogo_pastel(response.servicios);
          this.tabla_insumos    = datos_insumos[0];
          this.tabla_turnos     = datos_turnos[0];
          this.tabla_servicios  = datos_servicios[0];
          var menu:string = "";
          
          if(this.filter.orden == 1)
            menu = "Salidas";
          else
            menu = "Salidas Negadas"

          if(this.filter.desde == this.filter.hasta)  
            menu += " de "+this.meses[this.filter.desde];  
          else if(this.filter.desde > this.filter.hasta) 
            menu += " de "+this.meses[this.filter.hasta]+" a "+this.meses[this.filter.desde];  
          else if(this.filter.hasta > this.filter.desde) 
            menu += " de "+this.meses[this.filter.desde]+" a "+this.meses[this.filter.hasta];   

          let clues = "";  
           if(this.filter.clues!='')
            clues = response.clues.clues+" - "+response.clues.nombre;
           else
            clues = "Todas"; 
        this.options_insumos    = this.graficas_pastel("Insumos por "+menu, "Clues: "+clues, datos_insumos[1]);    
        this.options_turnos     = this.graficas_pastel("(Turnos) Insumos por "+menu, "Clues: "+clues, datos_turnos[1]);    
        this.options_servicios  = this.graficas_pastel("(Servicios) Insumos por "+menu, "Clues: "+clues, datos_servicios[1]);    
          
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
      let tabla: any[] = [];
      let total:number = 0;
      let resultado: any[] = [];
      for(let i = 0; i < obj.length; i++)
      {
          total = total + parseFloat(obj[i].cantidad);
      }

      for(let i = 0; i < obj.length; i++)
      {
          obj[i].porcentaje = (parseFloat(obj[i].cantidad) / total) * 100;
          obj[i].porcentaje = parseFloat(obj[i].porcentaje.toFixed(2));

      }

      for(let i = 0; i < obj.length; i++)
      {
          var serie = { name: obj[i].descripcion, y: obj[i].porcentaje };
          grafica.push(serie);
      }

      resultado[0] = obj;
      resultado[1] = grafica;
      return resultado;
  }
  
  graficas_pastel(titulo:String, subtitulo:String, serie_master:any[]):object{
    var data = new Object();
    data['chart']       = {  type: 'pie',  plotBackgroundColor: null,plotBorderWidth: null, plotShadow: false, width:this.tamano };
    data['title']       = { text: titulo  };
    data['subtitle']    = { text: subtitulo  };
    data['tooltip']     = {
                          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                          pointFormat: '<span >{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
                        };
    data['plotOptions'] = { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '{point.y:.1f} %' }, showInLegend: false  } };
    data['series']      = [{ name: 'Insumo', colorByPoint: true, data: serie_master }];
   
    data['credits']     = { enabled: true, href:"http://saludchiapas.gob.mx", text: "Instituto de Salud del Estado de Chiapas", style: { fofontSize: '20px' } };      
    
    return data;
  }

  /*graficar_barras(titulo:String, subtitulo:String, arreglo_meses:any[], datos_grafica:any[]):object{

    var data = new Object();
    data['chart']       = {  type: 'column',  height: 500  };
    data['colors']      = this.colores;
    data['title']       = { text: titulo  };
    data['subtitle']    = { text: subtitulo  };
    data['xAxis']       = { categories: arreglo_meses, crosshair: true };
    data['yAxis']       = { min: 0, title: {  text: 'Cantidad' }};
    data['legend']      = { align: 'left', verticalAlign: 'bottom', width: 20, useHTML: true };
    data['tooltip']     = { enabled: true, 
                            headerFormat: '<span style="font-size:10px"><b>{point.key}</b></span><table>',   
                            pointFormat: '<tr><td style="padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        };
    data['plotOptions'] = { column: { pointPadding: 0.2, borderWidth: 0 } };
    data['series']      = datos_grafica;
    data['exporting']   = { showtable: true };                   
    data['credits']     = { enabled: true, href:"http://saludchiapas.gob.mx", text: "Instituto de Salud del Estado de Chiapas", style: { fofontSize: '20px' } };      
    
    if(datos_grafica.length > 20)
        data['tooltip'].shared = false ;                   
    
    return data;
  }*/

}
