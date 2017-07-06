import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { Mensaje } from '../../mensaje'

import { AdministradorCentralService } from '../administrador-central.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  cargando: boolean = false;
  cargandoPresupuestos: boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  // # FIN SECCION
  
  // # SECCION: Filtro
  q:string = "";
  status:any[] = [];
  jurisdicciones:any[] = [];
  proveedores:any[] = [];

  statusSeleccionados:any[] = [];
  jurisdiccionesSeleccionadas:any[] = [];
  proveedoresSeleccionados:any[] = [];

  fecha_desde:Date = null;
  fecha_hasta:Date = null;
  sin_pedidos:boolean = false;

  ordenarCauses:string = '';
  ordenarNoCauses:string = '';
  ordenarMaterialCuracion:string = '';

  // # FIN SECCION

  // # SECCION: Resumen presupuesto
  presupuesto:any = {};
  // # FIN SECCION

  // # SECCION: Lista
  lista: any[] = [];
  paginaActual = 1;
  resultadosPorPagina = 10;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = [];
  showPedido:boolean = false;
  datos_pedido:any = {};
  recepciones:any[] = [];
  borrador:boolean = true;
  cargaRecepciones:boolean = false;
  // # FIN SECCION
  
  constructor(private title: Title, private apiService: AdministradorCentralService) { }

  ngOnInit() {
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();
    
    this.title.setTitle("Pedidos / Administrador central");
    this.listar(1);
    
    this.cargarJurisdicciones();
    this.cargarProveedores();

    this.status = [
      { id: 'BR', descripcion: 'Borradores'},
      { id: 'TR', descripcion: 'En Tránsito'},
      { id: 'PS', descripcion: 'Por surtir'},
      { id: 'FI', descripcion: 'Finalizados'},
      { id: 'EF', descripcion: 'En Farmacia'},
      { id: 'EX', descripcion: 'Expirados'},
      { id: 'EX-CA', descripcion: 'Cancelados'}
    ]
    
  }

  verInformacion(obj:any)
  {
    this.datos_pedido = obj;
    this.showPedido = true;
    this.borrador = true;
    this.apiService.verRecepciones(this.datos_pedido.pedido_id).subscribe(
      respuesta => {
          this.cargaRecepciones = true; 
          this.recepciones = respuesta.recepciones;
          if(respuesta.status == 'PS' && (respuesta.recepciones.length == 0 || respuesta.recepciones == null))
              this.borrador= false;
      }, error => {
        this.cargaRecepciones = false;
      }
    );

  } 

  regresarBorrador(id:string)
  {
    if(prompt("Para confirmar que desea regresar el pedido a borrador, ingrese BORRADOR PEDIDO") == "BORRADOR PEDIDO")
    {
      this.apiService.pedidoBorrador(id).subscribe(
        respuesta => {
          this.showPedido = false;
          this.mensajeExito.mostrar = true;
          this.mensajeExito.texto = "Se ha regresado correctamente el pedido a borrador";
          this.cargaRecepciones = true;
          this.listar(1);
           
        }, error => {
          this.cargaRecepciones = true;
        }
      );
    }
  }

  borrarRecepcion(id:string)
  {
    this.cargaRecepciones = false;
    this.apiService.recepcionBorrador(id).subscribe(
        respuesta => {
          //this.showPedido = false;
          this.mensajeExito.mostrar = true;
          this.mensajeExito.texto = "Se ha borrado correctamente la recepcion de medicamento";
          
          //this.listar(1);
          this.apiService.verRecepciones(respuesta.id).subscribe(
            respuesta => {
                this.cargaRecepciones = true;
                this.recepciones = respuesta.recepciones;
                if(respuesta.status == 'PS' && (respuesta.recepciones.length == 0 || respuesta.recepciones == null))
                    this.borrador= false;
            }, error => {
                this.cargaRecepciones = true;
            }
          );
        }, error => {
          this.cargaRecepciones = true;
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
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";           
          }
        }
      );
  }

  cargarJurisdicciones(){
    this.apiService.jurisdicciones().subscribe(
      respuesta => {
        this.jurisdicciones = respuesta;
      }, error => {

      }
    );
  }
  cargarProveedores(){
    this.apiService.proveedores().subscribe(
      respuesta => {
        //console.log(respuesta)
        this.proveedores = respuesta;
        //console.log(this.proveedores)
      }, error => {

      }
    );
  }


  cambioSeleccionJurisdiccion(id){
    if (id == -1){
      this.jurisdiccionesSeleccionadas = [];
    }
    this.agregarJurisdiccion(id);
  }
  cambioSeleccionProveedor(id){
    if (id == -1){
      this.proveedoresSeleccionados = [];
    }

    this.agregarProveedor(id);
  }

  cambioSeleccionStatus(id){
    if (id == -1){
      this.statusSeleccionados = [];
    }
    this.agregarStatus(id);
  }

  agregarProveedor(id:any){
    if (id == -1){
      return;
    }
    // Si existe en el filtro no la agregamos
    for(var i in this.proveedoresSeleccionados){
      if(this.proveedoresSeleccionados[i].id == id){
        return;
      }
    }

    for(var i in this.proveedores){
      if(this.proveedores[i].id == id){
        this.proveedoresSeleccionados.push(this.proveedores[i]);
        break;
      }
    }
    
  }
  agregarJurisdiccion(id:any){
    if (id == -1){
      return;
    }
    // Si existe en el filtro no la agregamos
    for(var i in this.jurisdiccionesSeleccionadas){
      if(this.jurisdiccionesSeleccionadas[i].id == id){
        return;
      }
    }

    for(var i in this.jurisdicciones){
      if(this.jurisdicciones[i].id == id){
        this.jurisdiccionesSeleccionadas.push(this.jurisdicciones[i]);
        break;
      }
    }
  }

  agregarStatus(id:any){
    if (id == -1){
      return;
    }
    // Si existe en el filtro no la agregamos
    for(var i in this.statusSeleccionados){
      if(this.statusSeleccionados[i].id == id){
        return;
      }
    }

    for(var i in this.status){
      if(this.status[i].id == id){
        this.statusSeleccionados.push(this.status[i]);
        break;
      }
    }
  }
  quitarProveedor(index){        
    this.proveedoresSeleccionados.splice(index,1);
  }
  quitarJurisdiccion(index){    
    this.jurisdiccionesSeleccionadas.splice(index,1);
  }
  quitarStatus(index){        
    this.statusSeleccionados.splice(index,1);
  }
  filtrarQuery(e: KeyboardEvent) {
    if(e.keyCode == 13){
      this.listar(1);
    }
  }





  toggleCauses(){
    switch(this.ordenarCauses){
      case '': this.ordenarCauses = 'ASC'; break;
      case 'ASC': this.ordenarCauses = 'DESC'; break;
      case 'DESC': this.ordenarCauses = ''; break;
      default: this.ordenarCauses = '';
    }
    this.ordenarNoCauses = '';
    this.ordenarMaterialCuracion = '';
    this.listar(1);
  }

  toggleNoCauses(){
    switch(this.ordenarNoCauses){
      case '': this.ordenarNoCauses = 'ASC'; break;
      case 'ASC': this.ordenarNoCauses = 'DESC'; break;
      case 'DESC': this.ordenarNoCauses = ''; break;
      default: this.ordenarNoCauses = '';
    }
    this.ordenarCauses = '';
    this.ordenarMaterialCuracion = '';
    this.listar(1);
  }
  toggleMaterialCuracion(){
    switch(this.ordenarMaterialCuracion){
      case '': this.ordenarMaterialCuracion = 'ASC'; break;
      case 'ASC': this.ordenarMaterialCuracion = 'DESC'; break;
      case 'DESC': this.ordenarMaterialCuracion = ''; break;
      default: this.ordenarMaterialCuracion = '';
    }
    this.ordenarCauses = '';
    this.ordenarNoCauses = '';
    this.listar(1);
  }

  listar(pagina:number): void {
    this.cargando = true;
    this.paginaActual = pagina;

    var proveedoresIds = [];
    for(var i in this.proveedoresSeleccionados){
      proveedoresIds.push(this.proveedoresSeleccionados[i].id);
    }


    var jurisdiccionesIds = [];
    for(var i in this.jurisdiccionesSeleccionadas){
      jurisdiccionesIds.push(this.jurisdiccionesSeleccionadas[i].id);
    }

    var statusIds = [];
    for(var i in this.statusSeleccionados){
      statusIds.push(this.statusSeleccionados[i].id);
    }

    var  parametros =  {
      q: this.q,
      proveedores: proveedoresIds,
      jurisdicciones: jurisdiccionesIds,
      status: statusIds,
      page: this.paginaActual,
      per_page: this.resultadosPorPagina,
      ordenar_causes: this.ordenarCauses,
      ordenar_no_causes: this.ordenarNoCauses,
      ordenar_material_curacion: this.ordenarMaterialCuracion,
      fecha_desde: this.fecha_desde,
      fecha_hasta: this.fecha_hasta
    }
    
    this.cargandoPresupuestos = true;
    this.apiService.presupuesto(parametros).subscribe(
      response => {
        this.cargandoPresupuestos = false;
        this.presupuesto = response.data;

        this.presupuesto.total_modificado = (+response.data.causes_modificado) + (+response.data.no_causes_modificado) + (+response.data.material_curacion_modificado);
        this.presupuesto.total_comprometido = (+response.data.causes_comprometido) + (+response.data.no_causes_comprometido) + (+response.data.material_curacion_comprometido);
        this.presupuesto.total_devengado = (+response.data.causes_devengado) + (+response.data.no_causes_devengado) + (+response.data.material_curacion_devengado);
        this.presupuesto.total_disponible = (+response.data.causes_disponible) + (+response.data.no_causes_disponible) + (+response.data.material_curacion_disponible);
      },
      error => {
        this.cargandoPresupuestos = false;
        console.log(error);
      }
    );
    
    this.apiService.pedidos(parametros).subscribe(
      respuesta => {
          this.cargando = false;
          this.lista = respuesta.data as any[];
          this.total = respuesta.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }

          console.log("Items cargados.");
      }, error => {
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
    )
  }
  
  exportar(){

    var query = "token="+localStorage.getItem('token')+"&ordenar_causes="+this.ordenarCauses+"&ordenar_no_causes="+this.ordenarNoCauses+"&ordenar_material_curacion="+this.ordenarMaterialCuracion;
    
    if(this.q!= ""){
      query += "&q="+this.q;
    }

    var lista_proveedores = "";
    for(var i in this.proveedoresSeleccionados){
      if(lista_proveedores != ""){
        lista_proveedores += ",";
      }
      lista_proveedores += ""+this.proveedoresSeleccionados[i].id;
    }

    if(lista_proveedores != ""){
      query += "&proveedores="+lista_proveedores;
    }
    

    var lista_jurisdicciones = "";
    for(var i in this.jurisdiccionesSeleccionadas){
      if(lista_jurisdicciones != ""){
        lista_jurisdicciones += ",";
      }
      lista_jurisdicciones += ""+this.jurisdiccionesSeleccionadas[i].id;
    }
    if(lista_jurisdicciones != ""){
      query += "&jurisdicciones="+lista_jurisdicciones;
    }

    var lista_status = "";
    for(var i in this.statusSeleccionados){
      if(lista_status != ""){
        lista_status += ",";
      }
      lista_status += ""+this.statusSeleccionados[i].id;
    }
    if(lista_status != ""){
      query += "&status="+lista_status;
    }

    if(this.fecha_desde != null){
      query += "&fecha_desde="+this.fecha_desde;
    }
    if(this.fecha_hasta != null){
      query += "&fecha_hasta="+this.fecha_hasta;
    }
    window.open(`${environment.API_URL}/administrador-central/pedidos-excel?${query}`);
   
    
    
  }

  imprimirExcelItem(id){
    var query = "token="+localStorage.getItem('token');
    window.open(`${environment.API_URL}/generar-excel-pedido/${id}?${query}`);
  }
  // # SECCION: Paginación
  paginaSiguiente():void {
    this.listar(this.paginaActual+1);
  }
  paginaAnterior():void {
    this.listar(this.paginaActual-1);
  }

}
