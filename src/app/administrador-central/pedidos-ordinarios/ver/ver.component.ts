import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PedidosOrdinariosService } from "../pedidos-ordinarios.service";
import { environment } from '../../../../environments/environment';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
  providers:[PedidosOrdinariosService]
})
export class VerComponent implements OnInit {

  pedido_ordinario:any = { pedidos_ordinarios_unidades_medicas:[]};


   // # SECCION: Esta sección es para mostrar mensajes
   mensajeError: Mensaje = new Mensaje();
   mensajeExito: Mensaje = new Mensaje();
   ultimaPeticion: any;
   // # FIN SECCION

  // Loaders
  mostrarModalEditar: boolean = false;
  mostrarModalCancelar: boolean = false;
  mostrarModalAumentarPresupuestoItem: boolean = false;


  guardando:boolean = false;
  modificandoPresupuesto: boolean = false;
  cancelando:boolean = false;
  anulandoCancelacion:boolean = false;
  regresandoACaptura:boolean = false;
  cargandoPedido:boolean = false;
  cargando:boolean = false;
  id:any;

  total_faltante:number = 0;
  total_liberar_presupuesto:number = 0;

  actions = [
    {key:1, text: "$ Ampliar presupuesto"},
    {key:2, text: "$ Liberar presupuesto"},
    {key:3, text: "Cancelar pedidos"},
    {key:4, text: "Anular cancelación"},
    {key:5, text: "Regresar a captura"}
  ]
  constructor(private title: Title,
    private router: Router,
    private route: ActivatedRoute,private apiService: PedidosOrdinariosService,  private http: Http) { }

  ngOnInit() {
    this.title.setTitle('Ver Pedido Ordinario');
    this.route.params.subscribe(params => {
      if(params['id']){

        this.id = params['id'];
        this.cargarPedidoOrdinario();
      } else {
        this.router.navigate(['/administrador-central/pedidos-ordinarios']);
      }
    });
    //this.cargarPresupuesto();


  }

  seleccionarTodos(event){
    for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
      var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];
      item.seleccionado = event;
    }
  }
  aplicarAccionEnLote(event){
    console.log(event);
    switch(event){
      case "1": this.modificarPresupuesto(null, true, false); break;
      case "2": this.modificarPresupuesto(null, false, true); break;
      case "3": this.cancelar(); break;
      case "4": this.anularCancelacion(); break;
      case "5": this.regresarACaptura(); break;
      default: console.log("Acción no disponible");
    }
  }

  daysAgo(date1) {
    var dt1 = new Date(date1);
    var dt2 = new Date();
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  dateDiffInDays(date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  cargarPedidoOrdinario(){
    this.cargando = true;

    this.total_liberar_presupuesto = 0;
    this.total_faltante = 0;

    this.apiService.ver(this.id).subscribe(
      respuesta => {
        this.cargando = false;


        this.pedido_ordinario = respuesta;


        this.pedido_ordinario.dias_expiracion =  this.daysAgo(this.pedido_ordinario.fecha_expiracion);

        for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
          var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];


          if(item.status == 'FI'){
            if( item.causes_disponible > 0 ||  item.no_causes_disponible > 0){
              this.total_liberar_presupuesto++;
            }
          } else if(item.status != 'CA'){
            if( item.causes_disponible - item.causes_capturado < 0 ||  item.no_causes_disponible - item.no_causes_capturado < 0){
              this.total_faltante++;
            }
          }

        }

      }, error => {
        console.log(error);
        this.cargando = false;
        this.router.navigate(['/administrador-central/pedidos-ordinarios']);
      }
    )
  }

  itemPedidoOrdinarioSeleccionado: any = {}
  tabPresupuesto:boolean = false;
  tabPedidoCapturado:boolean = false;
  mostrarModalAumentarItem(item:any){
    this.tabPresupuesto = true;
    this.tabPedidoCapturado = false;
    this.mostrarModalAumentarPresupuestoItem = true;
    var presupuesto = {};
    for(var pum of this.pedido_ordinario.presupuesto.presupuesto_unidades_medicas){
      if(pum.clues == item.clues){
        presupuesto = pum;
      }
    }
    this.itemPedidoOrdinarioSeleccionado = {
      ...item,
      causes_nuevo:item.causes_capturado,
      no_causes_nuevo:item.no_causes_capturado,
      presupuesto: presupuesto
    }

    if(this.itemPedidoOrdinarioSeleccionado.pedido_id != null){
      this.cargandoPedido = true;
      this.apiService.verPedido(this.itemPedidoOrdinarioSeleccionado.pedido_id).subscribe(
        respuesta =>{
          this.cargandoPedido = false;
          console.log(respuesta)
          this.itemPedidoOrdinarioSeleccionado.pedido = respuesta;
        }, error => {
          this.cargandoPedido = false;
          console.log(error);
        }
      )
    }

    console.log(this.itemPedidoOrdinarioSeleccionado);
  }
  modificarPresupuesto(item:any = null, aumentar:boolean = false, liberar:boolean = false ){
    //AKIRA PENDIENTE
    if(item != null){

      var key = prompt("Se modificará el presupuesto del pedido ordinario de la unidad médica: \""+item.unidad_medica.clues+" - "+item.unidad_medica.nombre+"\". Para proceder, escriba: MODIFICAR")

      if(key == "MODIFICAR"){

        var obj = {
          causes_nuevo: this.itemPedidoOrdinarioSeleccionado.causes_nuevo,
          no_causes_nuevo: this.itemPedidoOrdinarioSeleccionado.no_causes_nuevo,
          id: item.id
        }

        this.modificandoPresupuesto = true;
        this.apiService.modificarPresupuesto(item.pedido_ordinario_id,obj).subscribe(
          respuesta => {
            console.log(respuesta);
            this.modificandoPresupuesto = false;
            this.mostrarModalAumentarPresupuestoItem = false;

            this.cargarPedidoOrdinario();
          }, error => {
            console.log(error);
            this.modificandoPresupuesto = false;
          }
        );

      } else {
        alert("Palabra escrita incorrectamente");
      }
    } else {
      var items= [];
      for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
        var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];
        if(item.seleccionado && item.status != 'CA'){
          if(liberar && item.status != "FI"){
            continue;
          }
          items.push(item.id);
        }
      }

      if(items.length > 0){
        var key = "";
        var message = "";

        if(aumentar){
          key = "AUMENTAR";
          message = "Se aumentará el presupuesto del pedido ordinario a "+items.length+"  unidades médicas, siempre que hayan excedido la cantidad autorizada y además posea más presupuesto. Para proceder, escriba: "+key;
        } else if(liberar){
          key = "LIBERAR";
          message = "Se liberará el presupuesto no utilizado del pedido ordinario a "+items.length+" unidades médicas, siempre y cuando hayan finalizado la captura. Para proceder, escriba: "+key;
        } else {
          return;
        }

        var keyPrompt = prompt(message);
        if(key == keyPrompt){
          this.modificandoPresupuesto = true;
          this.apiService.modificarPresupuesto(this.id,null, aumentar, liberar, items).subscribe(
            respuesta => {
              console.log(respuesta);
              this.mostrarModalAumentarPresupuestoItem = false;
              this.modificandoPresupuesto = false;
              this.cargarPedidoOrdinario();
            }, error => {
              console.log(error);
              this.modificandoPresupuesto = false;
            }
          );
        } else {
          alert("Palabra escrita incorrectamente");
        }
      } else {
        alert("No hay pedidos seleccionados o ninguno aplica para la acción.");
      }


      
    }
  }

  regresarACaptura(item = null){
    var items:any[] = [];
    if(item != null){
      items.push(item.id);
    } else {     
      for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
        var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];
        console.log(item.seleccionado);
        if(item.seleccionado && item.status == "FI"){
          items.push(item.id);
        }
      }
    }

    if(items.length > 0){
      var input = prompt("Va a regresar a captura "+items.length+" pedidos ordinarios. Para proceder escriba: REGRESAR A CAPTURA");
      if(input == "REGRESAR A CAPTURA"){
        console.log(items);
        this.regresandoACaptura = true;
        this.apiService.regresarACaptura(this.id, items).subscribe(
          respuesta => {
            this.mostrarModalAumentarPresupuestoItem = false;
            this.regresandoACaptura = false;
            this.cargarPedidoOrdinario();
          }, error => {
            console.log(error);
            this.regresandoACaptura = false;
          }
        );
      } else {
        alert('Palabra incorrecta');
      }

    } else {
      alert('No hay pedidos para regresar a captura.')
    }
  }

  cancelar( item = null){
    var items:any[] = [];
    if(item != null){
      items.push(item.id);
    } else {
     
      for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
        var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];
        console.log(item.seleccionado);
        if(item.seleccionado && item.status !="CA"){
          items.push(item.id);
        }
      }
    }

    if(items.length > 0){
      var input = prompt("Va a cancelar "+items.length+" pedidos ordinarios, siempre y cuando la recepción del pedido no esté finalizada. Para proceder escriba: CANCELAR");
      if(input == "CANCELAR"){
        console.log(items);


        this.cancelando = true;
        this.apiService.cancelar(this.id, items).subscribe(
          respuesta => {
            this.mostrarModalAumentarPresupuestoItem = false;
            this.cancelando = false;
            console.log(respuesta);
            this.mostrarModalCancelar = false;
           // this.mostrarModalAumentarPresupuestoItem = false;

            this.cargarPedidoOrdinario();
          }, error => {
            console.log(error);
            this.cancelando = false;
          }
        );

        // Hacer petición
      } else {
        alert('Palabra incorrecta');
      }
    } else {
      alert('No hay pedidos por cancelar.')
    }


  }
  anularCancelacion( item = null){
    var items:any[] = [];
    if(item != null){
      items.push(item.id);
    } else {
      for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
        var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];
        if(item.status == "CA" && item.seleccionado){
          items.push(item.id);
        }
      }
    }

    if(items.length > 0){
      var key = "ANULAR";
      var input = prompt("Va a anular la cancelación de "+items.length+" pedidos ordinarios. Para proceder escriba:"+key);
      if(input == key){
        console.log(items);
        this.anulandoCancelacion = true;
        this.apiService.anularCancelacion(this.id, items).subscribe(
          respuesta => {
            this.mostrarModalAumentarPresupuestoItem = false;
            this.anulandoCancelacion = false;
            console.log(respuesta);
            this.mostrarModalCancelar = false;
           // this.mostrarModalAumentarPresupuestoItem = false;

            this.cargarPedidoOrdinario();
          }, error => {
            console.log(error);
            this.anulandoCancelacion = false;
          }
        );

        // Hacer petición
      } else {
        alert('Palabra incorrecta');
      }
    } else {
      alert('No hay pedidos por cancelar.')
    }

  }

  pedido_datos:any = {}
  errores:any = {}
  abrirModalEditar(){
    this.mostrarModalEditar = true;
    console.log(this.pedido_ordinario.fecha_expiracion);
    var fecha = this.pedido_ordinario.fecha.split(" ");
    var fecha_expiracion = this.pedido_ordinario.fecha_expiracion.replace(" ","T");

   console.log(fecha);
    this.pedido_datos = {
      descripcion: this.pedido_ordinario.descripcion,
      fecha: fecha[0],
      fecha_expiracion:fecha_expiracion
    }
  }

 
  guardar(){
    this.errores = {};
    this.guardando = true;
    this.apiService.editar(this.id,this.pedido_datos).subscribe(
      respuesta => {
        this.guardando = false;
        this.mostrarModalEditar = false;
        this.cargarPedidoOrdinario();

      }, error => {
        this.guardando = false;

        try {
          let e = error.json();
          this.mensajeError = new Mensaje(true)
          switch (error.status) {
            case 401:
              this.mensajeError.texto = "No tiee permiso para realizar esta acción.";
              break;
            case 409:
              this.mensajeError.texto = "Verifique la información marcada de color rojo";
              for (var input in e.error) {
                // Iteramos todos los errores
                for (var i in e.error[input]) {
                  this.errores[input] = e.error[input][i];
                }
              }
              console.log(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas);
              break;
            case 500:
              this.mensajeError.texto = "500 (Error interno del servidor)";
              break;
            default:
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }
        } catch (e) {
          this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
        }
        this.mensajeError.mostrar = true;
        console.log(error);
      }
    );
  }


  generarExcel(){
    var query = "token="+localStorage.getItem('token');
    window.open(`${environment.API_URL}/pedidos-ordinarios/excel/${this.id}?${query}`);
    //window.open(environment.API_URL+"/generar-excel-pedido/"+this.pedido.id, "_blank");
  }
  generarExcelPedido(id){
    var query = "token="+localStorage.getItem('token');
    window.open(`${environment.API_URL}/generar-excel-pedido/${id}?${query}`);
    //window.open(environment.API_URL+"/generar-excel-pedido/"+this.pedido.id, "_blank");
  }

  /*
  guardar(){

    this.guardando = true;
    if(this.errores.pedidos_ordinarios_unidades_medicas !=  null){
      for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){

        if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion != null){
          this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion = null;
        }
      }
    }

    this.errores = {};
    console.log(this.pedido_ordinario);

    this.apiService.crear(this.pedido_ordinario).subscribe(
      respuesta => {
        this.guardando = false;
        this.router.navigate(['/administrador-central/pedidos-ordinarios/']);
      }, error => {
        this.guardando = false;

        try {
          let e = error.json();
          this.mensajeError = new Mensaje(true)
          switch (error.status) {
            case 401:
              this.mensajeError.texto = "No tiee permiso para realizar esta acción.";
              break;
            case 409:
              this.mensajeError.texto = "Verifique la información marcada de color rojo";
              for (var input in e.error) {
                // Iteramos todos los errores
                for (var i in e.error[input]) {
                  var object = input.split(".");

                  if(object.length > 1){
                    if(object[0] == "pedidos_ordinarios_unidades_medicas"){
                      if(this.errores[object[0]] == null){
                        this.errores[object[0]] = [];
                      }

                      var index = parseInt(object[1]);
                      console.log(object[2]);
                      if(object[2] == 'causes_autorizado'){
                        //this.presupuesto.pedidos_ordinarios_unidades_medicas.
                        this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[index].error_validacion = {};
                        this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[index].error_validacion.causes_autorizado = e.error[input][i];
                      }

                      if(object[2] == 'no_causes_autorizado'){
                        if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[index].error_validacion == null){
                          this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[index].error_validacion = {};
                        }
                        this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[index].error_validacion.no_causes_autorizado = e.error[input][i];
                      }

                      //this.errores[object[0]][object[1]][object[2]] = e.error[input][i];
                    } else {
                      if(this.errores[object[0]] == null){
                        this.errores[object[0]] = {};
                      }

                      this.errores[object[0]][object[1]] = e.error[input][i];
                    }


                  } else {
                    this.errores[input] = e.error[input][i];
                  }
                }
              }
              console.log(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas);
              break;
            case 500:
              this.mensajeError.texto = "500 (Error interno del servidor)";
              break;
            default:
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }
        } catch (e) {
          this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
        }
        this.mensajeError.mostrar = true;
        console.log(error);
      }
    );
  }*/





  checkNumber($value:any){
    $value = Number($value);
  }





}
