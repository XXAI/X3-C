import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription }   from 'rxjs/Subscription';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';


import { PedidosService } from '../pedidos.service';
import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';

import { Pedido } from '../pedido';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'almacen-pedidos-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [PedidosService]
})
export class ListaComponent implements OnInit {
  usuario: any;
  cargando: boolean = false;
  cargandoPresupuesto: boolean = false;
  soloLectura: boolean = false;
  nuevaVersionPresupuesto: boolean = false;
  bandeja: boolean = false;

  almacenSeleccionado: string;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION

  // # SECCION: Lista
  pedidosOrdinariosBandeja:any [] = [];
  status: string;
  tipo:string = '';
  titulo: string = "Pedidos";

  icono = "fa-file";
  pedidos: Pedido[] = [];
  presupuesto:any = false;
  presupuestoActual:any = null;
  paginaActual = 1;
  resultadosPorPagina = 10;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = []
  // # FIN SECCION

  // # SECCION: Resultados de búsqueda
  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: Pedido[] = [];
  busquedaActivada:boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 10;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda:number[] = []
  // # FIN SECCION

  cambiarEntornoSuscription: Subscription;

  constructor(private title: Title, private router: Router, private route: ActivatedRoute, private pedidosService: PedidosService, private cambiarEntornoService:CambiarEntornoService) { }

  ngOnInit() {
    this.usuario =  JSON.parse(localStorage.getItem("usuario"));
    let nueva_version_presupuesto = localStorage.getItem("nuevaVersionPresupuesto");
    //console.log(nueva_version_presupuesto);
    this.nuevaVersionPresupuesto = nueva_version_presupuesto == "true";
    switch(this.route.snapshot.url[0].path){
      //case 'todos': this.status = "TODO"; this.titulo = "Todos"; this.icono = "fa-file"; break;
      case 'borradores': this.status = "BR"; this.titulo = "Borradores"; this.icono = "fa-pencil-square-o"; break;
      case 'solicitados': this.status = "SD"; this.titulo = "Solicitudes de transferencia"; this.icono = "fa-minus-circle"; break;
      case 'en-transito': this.status = "ET"; this.titulo = "En transito"; this.icono = "fa-clock-o"; break;
      case 'por-surtir': this.status = "PS"; this.titulo = "Por surtir"; this.icono = "fa-truck"; break;
      case 'expirados': this.status = "EX"; this.titulo = "Expirados"; this.icono = "fa-exclamation-circle"; break;
      case 'expirados-cancelados': this.status = "EX-CA"; this.titulo = "Expirados - Cancelados"; this.icono = "fa-times-circle"; break;
      case 'farmacia-subrogada': this.status = "EF"; this.titulo = "Farmacia Subrogada"; this.icono = "fa-building"; break;
      
      case 'finalizados': 
          this.status = "FI";
          this.icono = "fa-check-circle";
          if (this.route.snapshot.url.length > 1){
            if(this.route.snapshot.url[1].path == "completos"){
              this.titulo = "Finalizados (completos)";
            } else if(this.route.snapshot.url[1].path == "incompletos"){
              this.titulo = "Finalizados (incompletos)";
            } else if(this.route.snapshot.url[1].path == "cancelados"){
              this.titulo = "Finalizados (cancelados)";
            } else {
              this.titulo = "Finalizados";
            }
          } else {
            this.titulo = "Finalizados";
          }
      break;
      case 'alternos': this.titulo = "Alternos"; this.tipo= 'PALT'; this.icono = "fa-code-fork"; break;
      case 'ordinarios':
        if(!this.nuevaVersionPresupuesto){
          this.router.navigate(['/almacen/pedidos']);
        }
        this.tipo = 'PO';
        if(this.route.snapshot.url.length > 1){
          if(this.route.snapshot.url[1].path  == "bandeja"){
            this.titulo = "Pedidos ordinarios - Bandeja";
            this.bandeja = true;
          } else if(this.route.snapshot.url[1].path  == "borradores"){
            this.titulo = "Pedidos ordinarios - borradores";
            this.status = "BR";
          } else {
            this.titulo = "Pedidos ordinarios";
          }
        } else {
          this.titulo = "Pedidos ordinarios";
        }
      break;
      case 'extraordinarios':
        if(!this.nuevaVersionPresupuesto){
          this.router.navigate(['/almacen/pedidos']);
        }
        this.tipo = 'PXT';
        if(this.route.snapshot.url.length > 1){
          if(this.route.snapshot.url[1].path  == "aprobados"){
            this.titulo = "Pedidos extraordinarios - Borradores aprobados";
            this.status = "BRA";
          } else if(this.route.snapshot.url[1].path  == "por-aprobar"){
            this.titulo = "Pedidos extraordinarios - Por aprobar";
            this.status = "PA";
          } else if(this.route.snapshot.url[1].path  == "borradores"){
            this.titulo = "Pedidos extraordinarios - Borradores";
            this.status = "BR";
          } else {
            this.titulo = "Pedidos extraordinarios";
          }
        } else {
          this.titulo = "Pedidos ordinarios";
        }
      break;
      default: this.titulo = "Pedidos"; this.icono = "fa-file"; break;
    }
    //console.log('inicializar lista de pedidos');
    this.title.setTitle("Pedidos");

   // this.cargarPresupuestoAnual();

    this.cambiarEntornoSuscription = this.cambiarEntornoService.entornoCambiado$.subscribe(evento => {
      this.usuario =  JSON.parse(localStorage.getItem("usuario"));
      this.soloLectura = this.usuario.solo_lectura;
      this.almacenSeleccionado = this.usuario.almacen_activo;

      this.listar(1);
      this.cargarPresupuestoAnual();
    });

    this.soloLectura = this.usuario.solo_lectura;
    this.almacenSeleccionado = this.usuario.almacen_activo;

    //this.listar(1);
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    var self = this;

    var busquedaSubject = this.terminosBusqueda
    .debounceTime(300) // Esperamos 300 ms pausando eventos
    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
    .switchMap((term:string)  =>  { 
      console.log("Cargando búsqueda.");
      this.busquedaActivada = term != "" ? true: false;

      this.ultimoTerminoBuscado = term;
      this.paginaActualBusqueda = 1;
      this.cargando = true;
      return term  ? this.pedidosService.buscar(this.status,term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda, this.tipo, null, this.nuevaVersionPresupuesto) : Observable.of<any>({data:[]}) 
    }
      
    
    ).catch( function handleError(error){ 
     
      self.cargando = false;      
      self.mensajeError.mostrar = true;
      self.ultimaPeticion = function(){self.listarBusqueda(self.ultimoTerminoBuscado,self.paginaActualBusqueda);};//OJO
      try {
        let e = error.json();
        if (error.status == 401 ){
          self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
        }
      } catch(e){
        console.log("No se puede interpretar el error");
        
        if (error.status == 500 ){
          self.mensajeError.texto = "500 (Error interno del servidor)";
        } else {
          self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
        }            
      }
      // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
      return busquedaSubject
    
    });

    busquedaSubject.subscribe(
      resultado => {
        this.cargando = false;

        let parsed = resultado.data ;
        for(var i in parsed) {
          parsed[i].created_at = parsed[i].created_at.replace(" ","T");

        }

        this.resultadosBusqueda = parsed as Pedido[];
        this.totalBusqueda = resultado.total | 0;
        this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

        this.indicePaginasBusqueda = [];
        for(let i=0; i< this.paginasTotalesBusqueda; i++){
          this.indicePaginasBusqueda.push(i+1);
        }
        
        console.log("Búsqueda cargada.");
      }

    );

   
  }

  actualizarListaPedidos(){
    let nueva_version_presupuesto = localStorage.getItem("nuevaVersionPresupuesto");    
    this.nuevaVersionPresupuesto = nueva_version_presupuesto == "true";

    if(this.route.snapshot.url[0].path == "ordinarios" && !this.nuevaVersionPresupuesto){
      this.router.navigate(['/almacen/pedidos']);
    }
    this.listar(1);
    this.cargarPresupuestoAnual();
  }

  setPresupuesto(data){
    if(data){
      this.presupuesto.insumos_modificado = +data.insumos_modificado;
      this.presupuesto.insumos_comprometido = +data.insumos_comprometido;
      this.presupuesto.insumos_devengado = +data.insumos_devengado;
      this.presupuesto.insumos_disponible = +data.insumos_disponible;

      this.presupuesto.no_causes_modificado = +data.no_causes_modificado;
      this.presupuesto.no_causes_comprometido = +data.no_causes_comprometido;
      this.presupuesto.no_causes_devengado = +data.no_causes_devengado;
      this.presupuesto.no_causes_disponible = +data.no_causes_disponible;
    }else{
      this.presupuesto.insumos_modificado = 0;
      this.presupuesto.insumos_comprometido = 0;
      this.presupuesto.insumos_devengado = 0;
      this.presupuesto.insumos_disponible = 0;

      this.presupuesto.no_causes_modificado = 0;
      this.presupuesto.no_causes_comprometido = 0;
      this.presupuesto.no_causes_devengado = 0;
      this.presupuesto.no_causes_disponible = 0;
    }

    
    
    /*this.presupuesto.causes_modificado = +response.data.causes_modificado;
    this.presupuesto.causes_comprometido = +response.data.causes_comprometido;
    this.presupuesto.causes_devengado = +response.data.causes_devengado;
    this.presupuesto.causes_disponible = +response.data.causes_disponible;
    
    this.presupuesto.material_curacion_modificado = +response.data.material_curacion_modificado;
    this.presupuesto.material_curacion_comprometido = +response.data.material_curacion_comprometido;
    this.presupuesto.material_curacion_devengado = +response.data.material_curacion_devengado;
    this.presupuesto.material_curacion_disponible = +response.data.material_curacion_disponible;*/
  }

  cargarPresupuestoAnual(){

    this.cargandoPresupuesto = true;
    let presupuesto = +localStorage.getItem('presupuestoSeleccionado');
    

    if(this.nuevaVersionPresupuesto){
      this.pedidosService.pedidosStatsPresupuestoUnidadMedica(presupuesto).subscribe(
        response => {
          this.cargandoPresupuesto = false;
          //this.presupuesto = response.data;
          this.presupuesto = {};
          if(response.presupuesto){
            this.presupuestoActual = response.presupuesto;
          }
          this.setPresupuesto(response.data);
        },
        error => {
          this.cargandoPresupuesto = false;
          console.log(error);
        }
      );
    } else {
      this.pedidosService.presupuesto(0,0,'',presupuesto).subscribe(
        response => {
          this.cargandoPresupuesto = false;
          //this.presupuesto = response.data;
          this.presupuesto = {};
          if(response.presupuesto){
            this.presupuestoActual = response.presupuesto;
          }
          this.setPresupuesto(response.data);
        },
        error => {
          this.cargandoPresupuesto = false;
          console.log(error);
        }
      );
    }
    
  }

  obtenerDireccion(id:string, status:string): string{
    if(status == 'BR' || status == 'BRA'){
      return '/almacen/pedidos/editar/'+id;
    }else{
      return '/almacen/pedidos/ver/'+id;
    }
  }
  
  buscar(term: string): void {
    this.terminosBusqueda.next(term);
  }

  listarBusqueda(term:string ,pagina:number): void {
    this.paginaActualBusqueda = pagina;
    console.log("Cargando búsqueda.");
   
    let presupuesto = +localStorage.getItem('presupuestoSeleccionado');

    this.cargando = true;
    this.pedidosService.buscar(this.status, term, pagina, this.resultadosPorPaginaBusqueda, this.tipo,presupuesto, this.nuevaVersionPresupuesto).subscribe(
        resultado => {
          this.cargando = false;
          console.log("entro");
          let parsed = resultado.data;
          for(var i in parsed) {
            parsed[i].created_at = parsed[i].created_at.replace(" ","T"); // En safari fallan las fechas por eso se pone esto

          }

          this.resultadosBusqueda = parsed as Pedido[];

          this.totalBusqueda = resultado.total | 0;
          this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

          this.indicePaginasBusqueda = [];
          for(let i=0; i< this.paginasTotalesBusqueda; i++){
            this.indicePaginasBusqueda.push(i+1);
          }

          console.log("Búsqueda cargada.");
          
        },
        error => {
          this.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = function(){this.listarBusqueda(term,pagina);};
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }            
          }

        }
      );
  }

  listar(pagina:number): void {
    this.paginaActual = pagina;
    console.log("Cargando pedidos.");
    
    let presupuesto = +localStorage.getItem('presupuestoSeleccionado');

    this.cargando = true;

    if(this.bandeja){
      this.pedidosService.listaPedidosOrdinarios(pagina, this.resultadosPorPagina, presupuesto).subscribe(
        resultado => {
          this.cargando = false;
        

          this.pedidosOrdinariosBandeja = resultado;
          console.log(resultado);
        },
        error => {
          this.cargando = false;
          console.log(error);
        }
      );
    } else {
      this.pedidosService.lista(this.status, pagina,this.resultadosPorPagina, this.tipo, presupuesto, this.nuevaVersionPresupuesto).subscribe(
        resultado => {
          this.cargando = false;
         
          this.pedidos = resultado.data as Pedido[];

          this.total = resultado.data.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }

          console.log("Pedidos cargados.");
          
        },
        error => {
          this.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = this.listar;
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }            
          }

        }
      );
    }
    
  }

  eliminar(pedido: Pedido, index): void {
    pedido.cargando = true;
    if(confirm('Desea eliminar el pedido?')){
      this.pedidosService.eliminar(pedido.id).subscribe(
        data => {
          pedido.cargando = false;
          this.pedidos.splice(index, 1);  
          console.log("Se eliminó el elemento de la lista.");

          this.mensajeExito = new Mensaje(true)
          this.mensajeExito.mostrar = true;
          this.mensajeExito.texto = "Pedido eliminado";
          
        },
        error => {
          pedido.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = function(){
            this.eliminar(pedido, index);
          }
        
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }else{
              this.mensajeError.texto = e.error;
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }
          }
          
        }
      );
    }else{
      pedido.cargando = false;
    }
  }

  

  // # SECCION: Paginación
  paginaSiguiente():void {
    this.listar(this.paginaActual+1);
  }
  paginaAnterior():void {
    this.listar(this.paginaActual-1);
  }

  paginaSiguienteBusqueda(term:string):void {
    this.listarBusqueda(term,this.paginaActualBusqueda+1);
  }
  paginaAnteriorBusqueda(term:string):void {
    this.listarBusqueda(term,this.paginaActualBusqueda-1);
  }

  ngOnDestroy(){
    this.cambiarEntornoSuscription.unsubscribe();
  }

}
