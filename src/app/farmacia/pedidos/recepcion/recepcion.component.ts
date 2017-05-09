import { Component, OnInit, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import  * as FileSaver    from 'file-saver'; 

import { PedidosService } from '../../pedidos/pedidos.service';
import { RecepcionService } from './recepcion.service';
import { StockService } from '../../stock/stock.service';

import { Pedido } from '../../pedidos/pedido';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit {
  id: string;
  folio: string;
  cargando: boolean = false;
  cargandoStock: boolean = false;
  capturarStock: boolean = false;

  statusRecepcion: string = 'BR';

   // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeAdvertencia: Mensaje = new Mensaje()
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion: any;
  // # FIN SECCION  

  //private marcas = [{id:1,nombre:'Sin Especificar'}];
  private formStock: any = {};
  pedido: Pedido; 
  private lotesSurtidos:any[] = [];
  private listaStock: any[] = [];  
  private claveInsumoSeleccionado:string = null;
  private claveNoSolicitada:boolean = false;
  private itemSeleccionado: any = null;
  
  constructor(private title: Title, private route:ActivatedRoute, private pedidosService:PedidosService, private recepcionService:RecepcionService, private stockService:StockService) { }

  ngOnInit() {
    this.title.setTitle('Surtir pedido / Almacén');

    /*if(this.marcas.length == 1){
      this.formStock.marca = this.marcas[0];
    }*/

    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number
      //this.cargarDatos();
    });

    this.cargando = true;
    //this.pedidosService.ver(this.id).subscribe(
    this.recepcionService.verRecepcionPedido(this.id).subscribe(
          pedido => {
            this.cargando = false;
            this.pedido = new Pedido(true);
            this.pedido.paginacion.resultadosPorPagina = 10;
            this.pedido.filtro.paginacion.resultadosPorPagina = 10;
            this.folio = pedido.folio;

            let recepcion_insumos = {};

            if(pedido.status == 'FI'){
              this.statusRecepcion = 'FI';
            }            

            if(pedido.recepciones.length == 1){
              let recepcion_insumos_guardados = pedido.recepciones[0].entrada_abierta.insumos;
              for(var i in recepcion_insumos_guardados){
                let insumo = recepcion_insumos_guardados[i];
                if(!recepcion_insumos[insumo.stock.clave_insumo_medico]){
                  recepcion_insumos[insumo.stock.clave_insumo_medico] = {
                    cantidad:0,
                    stock:[]
                  };
                }
                recepcion_insumos[insumo.stock.clave_insumo_medico].cantidad += +insumo.cantidad;
                insumo.stock.cantidad = insumo.cantidad;
                recepcion_insumos[insumo.stock.clave_insumo_medico].stock.push(insumo.stock);
              }
            }

            for(let i in pedido.insumos){
              let dato = pedido.insumos[i];
              let insumo = dato.insumos_con_descripcion;
             
              insumo.cantidad = +dato.cantidad_solicitada;
              insumo.cantidad_recibida = +dato.cantidad_recibida;
              insumo.monto = +dato.monto_solicitado;
              insumo.precio = +dato.precio_unitario;
              insumo.totalStockAsignado = +dato.cantidad_recibida;

              if(recepcion_insumos[insumo.clave]){
                insumo.listaStockAsignado = [];
                insumo.totalStockAsignado += recepcion_insumos[insumo.clave].cantidad;
                for(let j in recepcion_insumos[insumo.clave].stock){
                  let stock = recepcion_insumos[insumo.clave].stock[j];
                  insumo.listaStockAsignado.push({
                    codigo_barras: stock.codigo_barras,
                    //marca: stock.marca,
                    lote: stock.lote,
                    fecha_caducidad: stock.fecha_caducidad,
                    cantidad: stock.cantidad,
                  });
                }
              }

              this.pedido.lista.push(insumo);
            }

            pedido.insumos = undefined;

            this.pedido.datosImprimir = pedido;
            this.pedido.indexar();
            this.pedido.listar(1);
          },
          error => {
            this.cargando = false;

            this.mensajeError = new Mensaje(true);
            this.mensajeError = new Mensaje(true);
            this.mensajeError.mostrar;

            try {
              let e = error.json();
              if (error.status == 401 ){
                this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
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

  seleccionarItem(item){  
    this.itemSeleccionado = item; 
    this.capturarStock = true;
    this.formStock = {};
    /*if(this.marcas.length == 1){
      this.formStock.marca = this.marcas[0];
    }*/
    //this.buscarStockApi(null,item.clave)
  }

  buscar(e: KeyboardEvent, input:HTMLInputElement, inputAnterior: HTMLInputElement,  parametros:any[]){
    
    let term = input.value;

    // Quitamos la busqueda
    if(e.keyCode == 27){
      e.preventDefault();
      e.stopPropagation();
      input.value = "";
      inputAnterior.value = "";

      this.pedido.filtro.activo = false;
      this.pedido.filtro.lista = [];      

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
      this.pedido.filtro.activo = true;      
    } else {
      this.pedido.filtro.activo = false;
      this.pedido.filtro.lista = [];
      return;
    }

    var arregloResultados:any[] = []
    for(let i in parametros){

      let termino = (parametros[i].input as HTMLInputElement).value;
      if(termino == ""){
        continue;
      }
            
      let listaFiltrada = this.pedido.lista.filter((item)=> {   
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
      this.pedido.filtro.lista = match;
    } else {
      this.pedido.filtro.lista = arregloResultados[0];
    }


    this.pedido.filtro.indexar(false);
    
    this.pedido.filtro.paginacion.paginaActual = 1;
    this.pedido.filtro.listar(1); 

  }


  buscarStockApi(term:string, clave:string = null){
    this.cargandoStock = true;
    this.stockService.buscar(term, clave).subscribe(
        resultado => {
          this.cargandoStock = false;
          this.claveNoSolicitada = false;

          this.listaStock = resultado ;

          if(resultado.length>0){
            this.claveInsumoSeleccionado = resultado[0].clave_insumo_medico;


            var existeClaveEnPedido = false;

            for(var  i = 0; i < this.pedido.lista.length ; i++){
          
              if(this.pedido.lista[i].clave == this.claveInsumoSeleccionado){
                // Calculamos la pagina
                this.pedido.filtro.activo = false;
                let pag = Math.ceil((i + 1) /this.pedido.paginacion.resultadosPorPagina);
                this.pedido.listar(pag);
                this.itemSeleccionado = this.pedido.lista[i] ;
                existeClaveEnPedido = true;
              }
            }

            if(!existeClaveEnPedido){
              this.claveNoSolicitada = true;
              this.listaStock =[];
            } else {
              this.verificarItemsAsignadosStockApi();
            }

          } else {
            //
          }

          
          
          console.log("Stock cargado.");
          
        },
        error => {
          this.cargandoStock = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = function(){ /*this.listarBusqueda(term);*/ };
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

  guardar(finalizar:boolean = false){
    //console.log(this.pedido);
    let guardar_recepcion = {status:'BR', observaciones:'',stock:[]};

    if(finalizar){
      alert("Preguntar quién recibe, observaciones, etc. Y si quiere imprimir de una vez.");
      guardar_recepcion.status = 'FI';
    }

    for(var i in this.pedido.lista){
      let item = this.pedido.lista[i];
      if(item.totalStockAsignado > 0){
        for(var j in item.listaStockAsignado){
          var stock = {
            clave_insumo_medico: item.clave,
            lote: item.listaStockAsignado[j].lote,
            fecha_caducidad: item.listaStockAsignado[j].fecha_caducidad,
            cantidad: item.listaStockAsignado[j].cantidad,
            existencia: item.listaStockAsignado[j].cantidad,
            codigo_barras: item.listaStockAsignado[j].codigo_barras,
            precio_unitario: 0,
            precio_total: 0
          };
          guardar_recepcion.stock.push(stock);
        }
      }
    }

    this.recepcionService.guardarRecepcionPedido(this.pedido.datosImprimir.id,guardar_recepcion).subscribe(
      pedido => {
        this.cargando = false;
        if(guardar_recepcion.status == 'FI'){
          this.statusRecepcion = 'FI';
        }
        console.log('Recepción guardada');
        //console.log(pedido);
        //this.router.navigate(['/farmacia/pedidos/editar/'+pedido.id]);
        //hacer cosas para dejar editar
      },
      error => {
        this.cargando = false;
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
    console.log(guardar_recepcion);
  }

  buscarStock(e: KeyboardEvent, input:HTMLInputElement, term:string){
    if(e.keyCode == 13){
      e.preventDefault();
      e.stopPropagation();
      if (term == ""){
        return false;
      }      
      this.buscarStockApi(term);
      input.select();
      return false;
    }
    return false;
  }

  limpiarStock(){
    this.capturarStock = false;
    this.listaStock = [];
    this.itemSeleccionado = null;
  }

  eliminarStock(index): void {
    
    this.itemSeleccionado.listaStockAsignado.splice(index, 1);  
     
    this.calcularTotalStockItem();
    
    this.verificarItemsAsignadosStockApi();
  }

  asignarStock(){
    if( this.itemSeleccionado.listaStockAsignado == null ){
      this.itemSeleccionado.listaStockAsignado = [];
    }
    var acumulado = this.itemSeleccionado.cantidad_recibida;
    for(var i in this.itemSeleccionado.listaStockAsignado) {
      acumulado += this.itemSeleccionado.listaStockAsignado[i].cantidad;
    }
    acumulado += this.formStock.cantidad;

    if (acumulado <= this.itemSeleccionado.cantidad){
      this.itemSeleccionado.totalStockAsignado = acumulado;
      this.itemSeleccionado.listaStockAsignado.push({
        codigo_barras: this.formStock.codigo_barras,
        marca: this.formStock.marca,
        lote: this.formStock.lote,
        fecha_caducidad: this.formStock.fecha_caducidad,
        cantidad: this.formStock.cantidad,
      });
      this.resetearFormStock();
      this.calcularTotalStockItem()
    } else {
      //Ya no se puede asignar mas
    }
  }
  
  cancelarCapturaStock(){
    this.resetearFormStock(true);
  }

  resetearFormStock(completo:boolean = false){
    if(completo){
      this.formStock = {};
    }else{
      this.formStock.lote = undefined;
      this.formStock.fecha_caducidad = undefined;
      this.formStock.cantidad = undefined;
    }
    /*if(this.marcas.length == 1){
      this.formStock.marca = this.marcas[0];
    }*/
  }


  validarItemStock(item:any, setMaxVal:boolean = false){

   
    if(item.cantidad == null){
      if(setMaxVal){
        this.asignarMaximoPosible(item)
      }
      this.calcularTotalStockItem();
      return;
    }

    var cantidad = parseInt(item.cantidad);

    if(isNaN(cantidad)){
      this.asignarMaximoPosible(item)
      this.calcularTotalStockItem();
      return;
    }

    if(cantidad <= 0){
      this.asignarMaximoPosible(item)
      this.calcularTotalStockItem();
      return;
    }

    

    if( cantidad > item.existencia){
      item.cantidad = item.existencia;
    }

    if(!this.verificarTotalStockItem()){
      this.asignarMaximoPosible(item)
    }

    this.calcularTotalStockItem();
    
  }

  asignarMaximoPosible(item:any){
    var acumulado = 0;
    for(var i in this.itemSeleccionado.listaStockAsignado) {
      if(this.itemSeleccionado.listaStockAsignado[i] != item ){
        acumulado += this.itemSeleccionado.listaStockAsignado[i].cantidad;
      }
      
    }

    var faltante = this.itemSeleccionado.cantidad - acumulado;

    if(faltante >= item.existencia){
      item.cantidad = item.existencia;
    }
    if(faltante < item.existencia){
      item.cantidad = faltante;
    }
  }

  verificarItemsAsignadosStockApi(){
    
    for(var i in this.listaStock){
      this.listaStock[i].asignado = false;
      for(var j in this.itemSeleccionado.listaStockAsignado){
        if(this.itemSeleccionado.listaStockAsignado[j].id == this.listaStock[i].id){
          this.listaStock[i].asignado = true;
          break;
        } 
      }
    }

  }

  verificarTotalStockItem():boolean{
    var acumulado = 0;
    for(var i in this.itemSeleccionado.listaStockAsignado) {
      acumulado += this.itemSeleccionado.listaStockAsignado[i].cantidad;
    }
    return this.itemSeleccionado.totalStockAsignado <= this.itemSeleccionado.cantidad;
  }

  calcularTotalStockItem(){  
    var acumulado = this.itemSeleccionado.cantidad_recibida;
    for(var i in this.itemSeleccionado.listaStockAsignado) {
      acumulado += this.itemSeleccionado.listaStockAsignado[i].cantidad;
    }
    if (acumulado == 0){
      var indice = 0;
      for(var i  in this.lotesSurtidos) {
        if(this.lotesSurtidos[i].clave == this.itemSeleccionado.clave){
          
          this.lotesSurtidos.splice(indice,1);
        }
        indice++;
      }
    } else {
     
      var bandera = false;
      for(var i  in this.lotesSurtidos) {
        if(this.lotesSurtidos[i].clave == this.itemSeleccionado.clave){
          bandera = true;
          this.lotesSurtidos[i].cantidad = acumulado;
        }
      }
      if(!bandera){
        
        this.lotesSurtidos.push({ clave: this.itemSeleccionado.clave, cantidad:  acumulado});
      }
    }
    this.itemSeleccionado.totalStockAsignado = acumulado;
  }

  // # SECCION: Eventos del teclado
  keyboardInput(e: KeyboardEvent) {
    
    if(e.keyCode == 32 &&  e.ctrlKey){ // Ctrl + barra espaciadora
      event.preventDefault();
      event.stopPropagation();
    }     
  }
}
