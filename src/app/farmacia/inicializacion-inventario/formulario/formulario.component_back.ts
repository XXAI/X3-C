import { Component, OnInit, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location}           from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

import  * as FileSaver    from 'file-saver'; 

import { environment } from '../../../../environments/environment';

import { Inventario } from '../inventario';
import { Mensaje } from '../../../mensaje';

import { CambiarEntornoService } from '../../../perfil/cambiar-entorno.service';

import { AlmacenesService } from '../../../catalogos/almacenes/almacenes.service';
import { Almacen } from '../../../catalogos/almacenes/almacen';

import { InicializacionInventarioService } from '../inicializacion-inventario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  host: { '(window:keydown)' : 'keyboardInput($event)'}
})


export class FormularioComponent implements OnInit {

  cargando: boolean = false;
  guardando: boolean = false;
  cargandoAlmacenes: boolean = false;
  cargandoInsumos: boolean = false;
  cargandoPresupuestos: boolean = false;

  erroresEnInsumos:any = {lista:{}, errores:0};

  esPedidoJurisdiccional: boolean = false;
  esOficinaJurisdiccional: boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeAdvertencia: Mensaje = new Mensaje()
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion: any;
  // # FIN SECCION  

  meses:any = {0:'Sin seleccionar' ,1:'Enero', 2:'Febrero', 3:'Marzo', 4:'Abril', 5:'Mayo', 6:'Junio', 7:'Julio', 8:'Agosto', 9:'Septiembre', 10:'Octubre', 11:'Noviembre', 12:'Diciembre'};

  //Harima: para ver si el formulaior es para crear o para editar
  formularioTitulo:string = 'Nuevo';
  esEditar:boolean = false;
  
  //Harima: Estos totales solo te toman en cuenta cuando el pedido ya estuvo en Por Surtir, y recibio insumos, pero por alguna razon se regreso a Borrador, es para ajustar el presupuesto disponible
  totalMontoComprometidoCausesMaterial: number = 0;
  totalMontoComprometidoNoCauses: number = 0;

  // # SECCION: Modal Insumos
  mostrarModalInsumos = false;
  //Harima: Lista de claves agregadas al pedido, para checar duplicidad
  //listaClaveAgregadas: Array<string> = [];

  // Akira: Lo volvy tipo any en lugar de string porque en pedidos jurisdiccionales se agregan más datos :P
  listaClaveAgregadas: any[] = [];
  // # FIN SECCION

  // # SECCION: Pedido
  almacenes: Almacen[];
  private presupuesto:any = {causes_disponible:0,no_causes_disponible:0,material_curacion_disponible:0};
  private mes:number = 0;
  private subrogados: {} = {};
  es_almacen_subrogado: boolean = false;
  almacenSeleccionado: any = {};

  fechasValidas: any[] = [];

  // Harima: Se genera un unico pedido
  inventario: Inventario;
  proveedor: any = {};
  // # FIN SECCION

  // # SECCION: Reportes
  private pdfworker:Worker;
  private cargandoPdf:boolean = false;
  // # FIN SECCION

  // ######### PEDIDOS JURISDICCIONALES #########

  mostrarModalListaClues = false;
  loteSeleccionado: any = null;

  // ############################################

  private cambiarEntornoSuscription: Subscription;

  constructor(
    private title: Title, 
    private location: Location, 
    private router: Router,
    private route: ActivatedRoute,
    private _ngZone: NgZone, 
    private inicializacionInventarioService: InicializacionInventarioService,
    private almacenesService: AlmacenesService,
    private fb: FormBuilder,
    private cambiarEntornoService:CambiarEntornoService
  ) { }

  ngOnInit() {
    var usuario =  JSON.parse(localStorage.getItem("usuario"));
    
    this.title.setTitle('Inicialización Parcial/Total');

    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker("web-workers/farmacia/pedidos/imprimir.js")
    
    // Este es un hack para poder usar variables del componente dentro de una funcion del worker
    var self = this;    
    var $ngZone = this._ngZone;

    //Harima: Cargar el presupuesto del mes actual
    //this.cargarPresupuesto();
    this.cambiarEntornoSuscription = this.cambiarEntornoService.entornoCambiado$.subscribe(evento => {
      this.router.navigate(['/almacen/incializacion-inventario']);
    });

    this.pdfworker.onmessage = function( evt ) {       
      // Esto es un hack porque estamos fuera de contexto dentro del worker
      // Y se usa esto para actualizar alginas variables
      $ngZone.run(() => {
         self.cargandoPdf = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
      //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
    };

    this.pdfworker.onerror = function( e ) {
      $ngZone.run(() => {
         self.cargandoPdf = false;
      });
      console.log(e)
    };
    
    // Harima: Inicializamos el pedido
    this.inventario = new Inventario(true);
    
    this.route.params.subscribe(params => {
      //this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
      
      //Harima:calcular fechas validas
      let now = new Date();
      let dia = now.getDate();
      let mes = now.getMonth()+1;

      if(dia < 20){
        //Mes actual y siguiente, se agrega mes actual
        let day = ("0" + dia).slice(-2);
        let month = ("0" + mes).slice(-2);
        this.fechasValidas.push({fecha:now.getFullYear() + "-" + (month) + "-" + (day),descripcion: this.meses[mes] + " " + now.getFullYear()}); //fecha actual
      }
      //Mes siguiente
      let day = '01';
      let month = ("0" + (mes+1)).slice(-2);
      let anio = now.getFullYear();

      if(mes+1 == 13){
        let month = '01';
        let anio = now.getFullYear() + 1;
        mes = 0;
      }
      this.fechasValidas.push({fecha:anio + "-" + (month) + "-" + (day),descripcion: this.meses[mes+1] + " " + now.getFullYear()}); //fecha actual

      this.title.setTitle('Nuevo pedido');
      //this.cargarPresupuesto();

      //Harima:cargamos catalogos
      this.cargarAlmacenes();
      //this.cargarDatos();
    });
    //this.pedidos[0].nombre = "General";
    //this.pedidos[0].observaciones = null;
  }

  obtenerDireccion(): string{
    return '/almacen/inicializacion-inventario';
  }

  toggleModalInsumos(){
    this.mostrarModalInsumos = !this.mostrarModalInsumos
  }

  // # SECCION Funciones globales
  
  agregarItem(item:any = {}){
    let auxPaginasTotales = this.inventario.paginacion.totalPaginas;

    if(!this.esPedidoJurisdiccional){
      if(!item.cantidad_recibida){
        item.cantidad_recibida = 0;
      }
      item.monto = item.cantidad * item.precio;    
      this.inventario.lista.push(item);
    } 
    // ######### PEDIDOS JURISDICCIONALES #########
    else {
      let insumo = item.insumo;
      var existe = false;

      //var total
      for( var i in this.inventario.lista){

        var cantidad = 0;

        if(this.inventario.lista[i].clave == insumo.clave){
          existe = true;

          this.inventario.lista[i].lista_clues.push({
            clues:item.clues,
            nombre:item.nombre,
            cantidad: item.cantidad
          });

          //console.log(this.inventario.lista[i].lista_clues);
          for(var j in this.inventario.lista[i].lista_clues){
            cantidad += this.inventario.lista[i].lista_clues[j].cantidad;
          }
          this.inventario.lista[i].cantidad  = cantidad;
          this.inventario.lista[i].monto  = insumo.precio * cantidad;
        }
      }
      if(!existe){
        //insumo.monto = insumo.cantidad * insumo.precio;
        if(!insumo.lista_clues){
          insumo.lista_clues = [];
        }
        
        insumo.lista_clues.push( {
          clues:item.clues,
          nombre:item.nombre,
          cantidad: item.cantidad
        });
        insumo.cantidad_recibida = 0;
        insumo.cantidad = item.cantidad;
        insumo.monto = insumo.cantidad * insumo.precio;
        
        this.inventario.lista.push(insumo);
      }
    }
    // ############################################

    this.inventario.indexar();

    if(this.inventario.paginacion.lista.length == this.inventario.paginacion.resultadosPorPagina
        && this.inventario.paginacion.paginaActual == auxPaginasTotales
        && !this.inventario.filtro.activo){
          this.inventario.listar(this.inventario.paginacion.paginaActual + 1);
      } else {
        this.inventario.listar(this.inventario.paginacion.paginaActual);
      }
  }
  
  modificarItem(item:any = {}){
    item.monto = item.cantidad * item.precio;
    this.inventario.actualizarTotales();

    //quitamos el error si existe
    if(this.erroresEnInsumos.lista[item.clave]){
      delete this.erroresEnInsumos.lista[item.clave];
      this.erroresEnInsumos.errores -= 1;
    }

    //validamos la cantidad, para determinar si hay un error y agregarlo
    if(item.cantidad < item.cantidad_recibida || item.cantidad <= 0){
      this.erroresEnInsumos.lista[item.clave] = true;
      this.erroresEnInsumos.errores += 1;
    }

    console.log(this.erroresEnInsumos);
  }

  buscar(e: KeyboardEvent, input:HTMLInputElement, inputAnterior: HTMLInputElement,  parametros:any[]){
    
    let term = input.value;

    // Quitamos la busqueda
    if(e.keyCode == 27){
      e.preventDefault();
      e.stopPropagation();
      input.value = "";
      inputAnterior.value = "";

      this.inventario.filtro.activo = false;
      this.inventario.filtro.lista = [];

      return;      
    }

    //Verificamos que la busqueda no sea la misma que la anterior para no filtrar en vano
    if(inputAnterior.value == term){
      return
    }

    e.preventDefault();
    e.stopPropagation();

    inputAnterior.value = term;    

    if(term != ""){
      this.inventario.filtro.activo = true;
    } else {
      this.inventario.filtro.activo = false;
      this.inventario.filtro.lista = [];
      return;
    }

    var arregloResultados:any[] = []
    for(let i in parametros){

      let termino = (parametros[i].input as HTMLInputElement).value;
      if(termino == ""){
        continue;
      }
      
      let listaFiltrada = this.inventario.lista.filter((item)=> {   
        var cadena = "";
        let campos = parametros[i].campos;
        for (let l in campos){
          try{
            // Esto es por si escribieron algo como "objeto.propiedad" en lugar de: "propiedad"
            let prop = campos[l].split(".");            
            if (prop.length > 1){
              cadena += " " + item[prop[0]][prop[1]].toLowerCase();
            } else {
               cadena += " " + item[campos[l]].toLowerCase();
            }
           
          } catch(e){}
          
        }
        return cadena.includes(termino.toLowerCase())
      });

      arregloResultados.push(listaFiltrada)
    }
    
    if(arregloResultados.length > 1 ){
      // Ordenamos Ascendente

      arregloResultados = arregloResultados.sort( function(a,b){ return  a.length - b.length });
      
      var filtro = arregloResultados[0];
      var match: any[] = [];
      for(let k = 1; k <  arregloResultados.length ; k++){
        
        for(let i in arregloResultados[k]){
          for(let j in filtro){
            if(arregloResultados[k][i] === filtro[j]){
              match.push(filtro[j]);
            }
          }
        };
      }
      this.inventario.filtro.lista = match;
    } else {
      this.inventario.filtro.lista = arregloResultados[0];
    }
    this.inventario.filtro.indexar(false);
    this.inventario.filtro.paginacion.paginaActual = 1;
    this.inventario.filtro.listar(1); 
  }

  deshabilitarAlmacen(almacen):boolean{
    if(this.esPedidoJurisdiccional && this.inventario.lista.length > 0 && this.subrogados[almacen.id]){
      return true;
    }else if(this.esOficinaJurisdiccional && this.inventario.lista.length > 0 && !this.subrogados[almacen.id]){
      return true;
    }
    return false;
  }

  //Harima: necesitamos eliminar también de la lista de claves agregadas
  eliminarInsumo(item,index,filtro:boolean = false){
    //Harima: si el insumo tiene cantidad recibida mayor a cero, no podemos eliminarla
    if(item.cantidad_recibida > 0){
      return false;
    }

    //Harima: eliminar el elemento en la lista de claves agregadas, para poder agregarla de nuevo si se desea
    var i = this.listaClaveAgregadas.indexOf(item.clave);
    this.listaClaveAgregadas.splice(i,1);

    //Harima: si no es el filtro(busqueda), borrar de la lista principal de insumos
    if(!filtro){
      //this.inventarios[this.inventarioActivo].eliminarItem(item,index);
      this.inventario.eliminarItem(item,index);
    }else{
      //this.inventarios[this.inventarioActivo].filtro.eliminarItem(item,index);
      this.inventario.filtro.eliminarItem(item,index);
    }
    
    //Harima: si el insumo que estamos eliminando tiene un error, quitamos el error del arreglo
    if(this.erroresEnInsumos.lista[item.clave]){
      delete this.erroresEnInsumos.lista[item.clave];
      this.erroresEnInsumos.errores -= 1;
    }
  }

  mostrarFichaInformativa(e, clave: string){
    e.preventDefault();
    e.stopPropagation();

    // Mostrar el componente de Ficha Informativa
    // Falta hacerlo sumamiiiii :)
    alert(clave);
    //console.log(clave);
  }

  finalizar(){
    var validacion_palabra = prompt("Atención el pedido ya no podra editarse, para confirmar que desea concluir el pedido por favor escriba: CONCLUIR PEDIDO");
    if(validacion_palabra == 'CONCLUIR PEDIDO'){
      this.guardar(true);
    }else{
      if(validacion_palabra != null){
        alert("Error al ingresar el texto para confirmar la acción.");
      }
      return false;
    }
  }

  guardar(finalizar:boolean = false){
    return false;
    //this.guardando = true;
    var guardar_pedido;
    this.mensajeError.mostrar = false;
    /*var guardar_pedidos = [];
    for(var i in this.inventarios){
      guardar_pedidos.push(this.inventarios[i].obtenerDatosGuardar());
    }*/
    /*
    if(this.inventario.datos.invalid){
      this.inventario.datos.get('almacen_solicitante').markAsTouched();
      this.inventario.datos.get('descripcion').markAsTouched();
      this.inventario.datos.get('fecha').markAsTouched();
      this.guardando = false;
      return false;
    }
    */
    if(this.erroresEnInsumos.errores > 0){
      var insumos_errores = [];
      for(var i in this.erroresEnInsumos.lista){
        insumos_errores.push(i);
      }
      this.mensajeError = new Mensaje(false);
      this.mensajeError.texto = 'Se encontaron errores en los siguientes insumos: ' + insumos_errores.join(', ');
      this.mensajeError.mostrar = true;
      this.guardando = false;
      return false;
    }

    guardar_pedido = this.inventario.obtenerDatosGuardar();

    this.inicializacionInventarioService.inicializar(guardar_pedido).subscribe(
      pedido => {
        this.guardando = false;
        //console.log('Pedido creado');
        //console.log(pedido);
        this.router.navigate(['/almacen/pedidos/editar/'+pedido.id]);
        //hacer cosas para dejar editar
      },
      error => {
        this.guardando = false;
        console.log(error);
        this.mensajeError = new Mensaje(true);
        this.mensajeError.texto = 'No especificado';
        this.mensajeError.mostrar = true;

        try{
          let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
            // Problema de validación
            if (error.status == 409){
              this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
              /*for (var input in e.error){
                // Iteramos todos los errores
                for (var i in e.error[input]){

                  if(input == 'id' && e.error[input][i] == 'unique'){
                    this.usuarioRepetido = true;
                  }
                  if(input == 'id' && e.error[input][i] == 'email'){
                    this.usuarioInvalido = true;
                  }
                }                      
              }*/
            }
            if(error.status == 500){
              if(e.error){
                this.mensajeError.texto = e.error;
                this.mensajeError.cuentaAtras = 1000;
              }
            }
        }catch(e){
          if (error.status == 500 ){
            this.mensajeError.texto = "500 (Error interno del servidor)";
          } else {
            console.log(e);
            this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }
        }
      }
    );
  }

  cambioAlmacen(){
    let almacen_seleccionado = this.inventario.datos.get('almacen_id').value;
    if(this.subrogados[almacen_seleccionado]){
      this.es_almacen_subrogado = true;
    }else{
      this.es_almacen_subrogado = false;
    }
    //this.cargarPresupuesto(this.mes);

    this.almacenSeleccionado = {id:almacen_seleccionado,subrogado:this.es_almacen_subrogado};

    if(this.esOficinaJurisdiccional && !this.subrogados[almacen_seleccionado]){
      this.esPedidoJurisdiccional = true;
    }else{
      this.esPedidoJurisdiccional = false;
    }
  }

  cargarAlmacenes() {
    this.cargandoAlmacenes = true;

    // ######### PEDIDOS JURISDICCIONALES #########
    
    var subrogado = null;
    
    // ############################################
    
    this.almacenesService.catalogo(subrogado).subscribe(
        almacenes => {
          this.cargandoAlmacenes = false;
          this.almacenes = almacenes;

          for(let i in almacenes){
            if(almacenes[i].subrogado == 1 && almacenes[i].tipo_almacen == 'FARSBR'){
              this.subrogados[almacenes[i].id] = true;
            }
          }

          //Harima:Si no es editar, inicializamos el formulario
          if(!this.esEditar){
            let datos_iniciales:any = {}
            
            this.inventario.inicializarDatos(datos_iniciales);
          }
          
          console.log("Almacenes cargados.");

          if (this.almacenes.length == 0){
            this.mensajeAdvertencia = new Mensaje(true);
            this.mensajeAdvertencia.texto = `No hay almacenes registrados en el sistema, póngase en contacto con un administrador.`;
            this.mensajeAdvertencia.mostrar = true;
          }
        },
        error => {
          this.cargandoAlmacenes = false;
          
          this.mensajeError = new Mensaje(true);
          this.mensajeError.texto = "No especificado.";
          this.mensajeError.mostrar = true;

          try {

            let e = error.json();

            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para ver los almacenes.";
            }

            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los almacenes";
            }
          } catch(e){

            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor). No se pudieron cargar los almacenes";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.  No se pudieron cargar los almacenes";
            }          
          }

        }
      );
  }
  /*
  recargarPresupuesto(fecha:string){
    let fecha_valida = fecha.split('-');
    if(fecha_valida.length == 3){
      let mes:any = fecha_valida[1];
      if(mes.length == 2){
        mes = parseInt(mes);
        if(mes != this.mes && (mes > 0 && mes < 13)){
          this.cargarPresupuesto(mes);
        }
      }
    }
  }

  cargarPresupuesto(mes:number = 0){
    if(mes == 0){
      let now = new Date();
      mes = (now.getMonth() + 1);
    }
    this.mes = mes;
    let almacen_seleccionado = this.inventario.datos.get('almacen_solicitante').value;
    if(almacen_seleccionado){
      this.cargandoPresupuestos = true;
      this.inicializacionInventarioService.presupuesto(mes,almacen_seleccionado).subscribe(
        response => {
          this.cargando = false;
          if(response.data){
            this.presupuesto = response.data;
          }else{
            this.presupuesto.causes_disponible = 0;
            this.presupuesto.no_causes_disponible = 0;
            this.presupuesto.material_curacion_disponible = 0;
          }
          this.cargandoPresupuestos = false;
        },
        error => {
          this.cargando = false;
          this.cargandoPresupuestos = false;
          console.log(error);
        }
      );
    }
    
  }
  */
  // # SECCION: Eventos del teclado
  keyboardInput(e: KeyboardEvent) {
    
    if(e.keyCode == 32 &&  e.ctrlKey){ // Ctrl + barra espaciadora
      event.preventDefault();
      event.stopPropagation();
      
      this.mostrarModalInsumos = true;
    }

    // Cambiar página hacia adelante ctrl + shift + ->
    if (e.keyCode == 39 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey )){
      event.preventDefault();
      event.stopPropagation();

      if (!this.inventario.filtro.activo){
        this.inventario.paginaSiguiente();
      } else {
        this.inventario.filtro.paginaSiguiente();
      }
      
    }
    // Cambiar página hacia adelante ctrl + shift + <-
    if (e.keyCode == 37 && ((e.ctrlKey && e.shiftKey) || e.ctrlKey )){
      
      event.preventDefault();
      event.stopPropagation();

      if (!this.inventario.filtro.activo){
        this.inventario.paginaAnterior();
      } else {
        this.inventario.filtro.paginaAnterior();
      }
    }
    
        
  }

  // # SECCION - Webworkers

  imprimirExcel(){
    var query = "token="+localStorage.getItem('token');
    window.open(`${environment.API_URL}/generar-excel-pedido/${this.inventario.id}?${query}`); 
    //window.open(environment.API_URL+"/generar-excel-pedido/"+this.inventario.id, "_blank");
  }

  imprimir() {
    try {
      console.log(this.inventario);
      this.cargandoPdf = true;
      var pedidos_imprimir = {
        datos:{almacen:'solicitar',solicitante:'unidad',observaciones:'texto'},
        lista: this.inventario.lista
      };
      this.pdfworker.postMessage(JSON.stringify(pedidos_imprimir));
    } catch (e){
      this.cargandoPdf = false;
      console.log(e);
    }
    
  }

  base64ToBlob( base64, type ) {
      var bytes = atob( base64 ), len = bytes.length;
      var buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( var i=0 ; i < len ; i++ )
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type: type } );
  }

  ngOnDestroy(){
    this.cambiarEntornoSuscription.unsubscribe();
  }
}
