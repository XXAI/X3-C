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
  cargando:boolean = false;
  id:any;

  total_faltante:number = 0;
  total_liberar_presupuesto:number = 0;


  constructor(private title: Title,
    private router: Router,
    private route: ActivatedRoute,private apiService: PedidosOrdinariosService,  private http: Http) { }

  ngOnInit() {
    this.title.setTitle('Ver Pedido Ordinario');
    this.route.params.subscribe(params => {
      if(params['id']){
        this.cargando = true;
        this.id = params['id'];
        this.apiService.ver(this.id).subscribe(
          respuesta => {
            this.cargando = false;
            this.pedido_ordinario = respuesta;

            for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
              var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];
              
              
              if(item.status == 'FI'){
                if( item.causes_disponible > 0 ||  item.no_causes_disponible > 0){
                  this.total_liberar_presupuesto++;
                }
              } else if(item.status != 'EX'){
                if( item.causes_disponible - item.causes_capturado < 0 ||  item.no_causes_disponible - item.no_causes_capturado < 0){
                  this.total_faltante++;
                }
              }
              
            }

            console.log(respuesta);
          }, error => {
            console.log(error);
            this.cargando = false;
            this.router.navigate(['/administrador-central/pedidos-ordinarios']);    
          }
        )
      } else {
        this.router.navigate(['/administrador-central/pedidos-ordinarios']);
      }
    });
    //this.cargarPresupuesto();

    
  }
  aumentarExcedido(item:any = null, causes:boolean= true){
    //AKIRA PENDIENTE
    if(item != null){
      var key = prompt("Se aumentará el presupuesto del pedido ordinario de la unidad médica: \""+item.unidad_medica.clues+" - "+item.unidad_medica.nombre+"\" a la cantidad excedida, siempre y cuando posea más presupuesto. Para proceder, escriba: AUMENTAR")

      if(key == "AUMENTAR"){
       
        var obj = {
          causes: causes,
          no_causes: !causes,
          id: item.id
        }
        console.log(obj);
        this.apiService.aumentarPresupuesto(item.pedido_ordinario_id,obj).subscribe(
          respuesta => {
            console.log(respuesta);
          }, error => {
            console.log(error);
          }
        );      

      } else {
        alert("Palabra escrita incorrectamente");
      }
    } else {
      var key = prompt("Se aumentará el presupuesto del pedido ordinario a todas las  unidades médicas que hayan excedido la cantidad, siempre y cuando posea más presupuesto. Para proceder, escriba: AUMENTAR")
      if(key == "AUMENTAR"){
        console.log("aumentar a todas");      
        this.apiService.aumentarPresupuesto(item.pedido_ordinario_id,null).subscribe(
          respuesta => {
            console.log(respuesta);
          }, error => {
            console.log(error);
          }
        ); 
      } else {
        alert("Palabra escrita incorrectamente");
      }
    }
  }
  liberarPresupuesto(item:any = null, causes:boolean= true){
    console.log(item)
  }
  cancelar(item = null){
    var items:any[] = [];
    if(item != null){
      items.push(item.id);
    } else {
      for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
        var item = this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i];
        if(item.status != 'FI'){
          items.push(item.id);
        } 
        
      }
    }

    if(items.length > 0){
      var input = prompt("Va a cancelar "+items.length+" pedidos ordinarios, esta operación no se puede revertir debido al proceso de sincronización de las unidades medicas. Para proceder escriba: CANCELAR");
      if(input == "CANCELAR"){
        console.log(items);
        // Hacer petición
      } else {
        alert('Palabra incorrecta');
      }
      
    }
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
