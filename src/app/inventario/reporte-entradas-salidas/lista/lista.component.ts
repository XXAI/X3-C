import { Component, OnInit, NgZone } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Mensaje } from '../../../mensaje';
import { ReporteEntradasSalidasService } from '../reporte-entradas-salidas.service';
import { environment } from '../../../../environments/environment';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';
import  * as FileSaver    from 'file-saver'; 
import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  tamano = (document.body.offsetWidth) * 0.95;
  
  busquedaQuery:String = '';
  fecha_desde:any;
  fecha_hasta:any;
  titulo:String = "Reporte de E/S";
  filtroInsumo:string = '';

  tabla_insumos:any = [];

  today:any = new Date();
  dia_actual:string = this.today.getFullYear() +"/"+(this.today.getMonth()+1)+"/"+this.today.getDate();
  filter:any = {desde: '', hasta: '', tipo:1, insumo: ''};
  archivo:string = ""; 

  //Registros Compensatorios
  cargando: boolean = false;
  cargando_insumos: boolean = false;
  cargando_reporte_pdf:boolean = false;
  busquedaActivada:boolean = false;
  showPrimerModal:boolean = false;
  catalogo_insumos:any[] = [];
  
  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  paginaActual = 1;
  resultadosPorPagina = 15;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = [];

  // # SECCION: Reportes
  pdfworker:Worker;
  pdfmovimiento:Worker;
  cargandoPdf:any = {};
  errorEnPDF:boolean = false;
  // # FIN SECCION

  cambiarEntornoSuscription: Subscription;

  constructor(
    private title: Title,
    private http: Http,
    private reporteEntradasSalidasService: ReporteEntradasSalidasService,
    private _ngZone: NgZone,
    private cambiarEntornoService:CambiarEntornoService
  ) { }

  ngOnInit() {
    this.configurar_date_picker();
    this.cargar_catalogo();
    this.listar(this.paginaActual);
    this.title.setTitle("Reporte de E/S");
    /* configuracion de calendario */
    
    /* fin configuracion */

    this.pdfworker = new Worker("web-workers/inventario/reporte-es.js");
    this.pdfmovimiento = new Worker("web-workers/inventario/reporte-movimientos.js");
    // Este es un hack para poder usar variables del componente dentro de una funcion del worker
    let self = this;    
    var $ngZone = this._ngZone;
    
    this.pdfworker.onmessage = function( evt ) {       
        // Esto es un hack porque estamos fuera de contexto dentro del worker
        // Y se usa esto para actualizar alginas variables
      $ngZone.run(() => {
        console.log(evt);
        self.cargandoPdf[evt.data.tipoPedido] = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
        //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
    };

    this.pdfworker.onerror = function( e ) {
      $ngZone.run(() => {
        console.log(e);
        self.errorEnPDF = true;
        //self.cargandoPdf[error.tipoPedido] = false;
      });
      //console.log(e)
    };

    this.pdfmovimiento.onmessage = function( evt ) {       
      // Esto es un hack porque estamos fuera de contexto dentro del worker
      // Y se usa esto para actualizar alginas variables
    $ngZone.run(() => {
      console.log(evt);
      self.cargandoPdf[evt.data.tipoPedido] = false;
    });

    FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
      //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
  };

  this.pdfmovimiento.onerror = function( e ) {
    $ngZone.run(() => {
      console.log(e);
      self.errorEnPDF = true;
      //self.cargandoPdf[error.tipoPedido] = false;
    });
    //console.log(e)
  };

  this.cambiarEntornoSuscription = this.cambiarEntornoService.entornoCambiado$.subscribe(evento => {
    //this.usuario =  JSON.parse(localStorage.getItem("usuario"));
    this.listar(1);
  });

  }
  listar(pagina:number = 1):void
  {
    this.cargando = true;
    this.paginaActual =pagina;

    var  parametros =  {
      page: this.paginaActual,
      per_page: this.resultadosPorPagina,
      desde: this.filter.desde,
      hasta: this.filter.hasta,
      tipo: this.filter.tipo,
      insumo: this.filter.insumo
    }
    

    this.reporteEntradasSalidasService.listar(parametros).subscribe(
      response => {
        this.cargando = false;
        //console.log(response.datos);
        let datos = response.datos;
        this.tabla_insumos = datos.data;
        this.total = response.datos.total | 0;
        this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

        this.indicePaginas = [];
        for(let i=0; i< this.paginasTotales; i++){
          this.indicePaginas.push(i+1);
        }
        
      }, error => {
        this.mensajeError = new Mensaje(true);
        this.mensajeError.mostrar = true;
        try {
          let e = error.json();
          if (error.status == 401 ){
            this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
          }
          if (error.status == 500 ){
            this.mensajeError.texto = e.error;
          } else {
            this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
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

    let actual = new Date();
    this.fecha_desde = actual;
    this.fecha_hasta = actual;

    
    let format_fecha = actual.getFullYear()+"-"+(actual.getMonth() + 1)+"-"+(actual.getDate());
    this.filter.desde = format_fecha;
    this.filter.hasta = format_fecha;
  }

  filtro(filtro_reporte, valor):void{
    switch(filtro_reporte)
    {
      case 1: this.filter.desde = valor; break;
      case 2: this.filter.hasta = valor; break;
      case 3: this.filter.tipo = valor; break;
      case 4: this.filter.insumo = valor; break;
    }
  }

  base64ToBlob( base64, type ) {
      var bytes = atob( base64 ), len = bytes.length;
      var buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( var i=0 ; i < len ; i++ )
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type: type } );
  }

 
  paginaSiguiente():void {
    console.log(this.paginaActual);
    this.listar(this.paginaActual+1);
  }
  paginaAnterior():void {
    this.listar(this.paginaActual-1);
  }

  imprimir(obj) {
    this.archivo = "descargar";
    try{
      this.reporteEntradasSalidasService.movimiento(obj.id, 2).subscribe(
        response => {
          //console.log(response);
          this.archivo = "";
          var movimiento_imprimir = {
            datos: response
          };
          this.pdfworker.postMessage(JSON.stringify(movimiento_imprimir));
        }, error => {
          this.archivo = "";
          this.mensajeError = new Mensaje(true);
          this.mensajeError.mostrar = true;
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
            if (error.status == 500 ){
              this.mensajeError.texto = e.error;
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            } 
            
          } catch(e){
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }            
          }
        });
    }catch(e)
    {
      this.archivo = "";
      console.log(e);
    }
  }

  imprimirMovimientos() {
    this.cargando_reporte_pdf = true;
    try{
      var  parametros =  {
        desde: this.filter.desde,
        hasta: this.filter.hasta,
        tipo: this.filter.tipo,
        insumo: this.filter.insumo, 
        tipo_movimiento: 1
      }
      this.reporteEntradasSalidasService.movimiento_es(parametros).subscribe(
        response => {
          console.log(response);
          this.cargando_reporte_pdf = false;
          this.archivo = "";
          var movimiento_imprimir = {
            datos: response.datos,
            almacen: response.almacen,
            parametro: parametros
          };
          //console.log(movimiento_imprimir);
          this.pdfmovimiento.postMessage(JSON.stringify(movimiento_imprimir));
        }, error => {
          this.archivo = "";
          this.mensajeError = new Mensaje(true);
          this.mensajeError.mostrar = true;
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
            if (error.status == 500 ){
              this.mensajeError.texto = e.error;
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            } 
            
          } catch(e){
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }            
          }
        });
    }catch(e)
    {
      console.log(e);
    }
  }

  buscarInsumo(insumo:String)
  {
        this.showPrimerModal = true;
        this.busquedaQuery = insumo;
        //this.searchClue.nativeElement.focus();
  }
  
  seleccionaInsumo(item:any)
  {
    this.showPrimerModal = false;
    this.filtroInsumo = item.clave;
    this.filtro(4, item.clave);
  }

  cargar_catalogo():void{
    this.cargando_insumos = true;
    this.reporteEntradasSalidasService.catalogos().subscribe(
        response => {
           console.log(response); 
           this.cargando_insumos = false;
           this.catalogo_insumos = response;
        },
        error => {
            this.cargando=false;
            console.log(error);
        }
      );
  }

  ngOnDestroy(){
    this.cambiarEntornoSuscription.unsubscribe();
  }

  imprimirMovimientosExcel(){

    var query = "token="+localStorage.getItem('token')+"&desde="+this.filter.desde+"&hasta="+this.filter.hasta+"&tipo="+this.filter.tipo+"&insumo="+this.filter.insumo;
    let usuario_actual = JSON.parse(localStorage.getItem('usuario'));
    query += '&almacen=' + usuario_actual.almacen_activo.id;
    

    window.open(`${environment.API_URL}/reporte-excel-movimiento-es?${query}`);
  }

  imprimirExcel(obj:any):void{

    var query = "token="+localStorage.getItem('token')+"&movimiento_id="+obj.id;
    let usuario_actual = JSON.parse(localStorage.getItem('usuario'));
    query += '&almacen=' + usuario_actual.almacen_activo.id;
  
    window.open(`${environment.API_URL}/reporte-excel-movimiento?${query}`);
  }
  
  
}
