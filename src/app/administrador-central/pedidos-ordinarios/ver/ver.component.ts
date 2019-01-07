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
  causes_sumado:number;
  no_causes_sumado:number;
  errores_carga:boolean
  errores:any = {};
  guardando:boolean;

   // # SECCION: Esta sección es para mostrar mensajes
   mensajeError: Mensaje = new Mensaje();
   mensajeExito: Mensaje = new Mensaje();
   ultimaPeticion: any;
   // # FIN SECCION

  cluesAgregadas:any[] = [];
  
  // Loaders
  cargandoPresupuesto:boolean = false;
  cargando:boolean = false;
  id:any;

  presupuesto:any = {}  

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
  }

  

  cargarPresupuesto(){
    this.cargandoPresupuesto = true;
    this.apiService.cargarPresupuesto().subscribe(
      respuesta => {
        this.presupuesto = respuesta;
        if(this.presupuesto.presupuesto_unidades_medicas){
          var factor_meses = this.presupuesto.factor_meses | 0;
          for(var i in this.presupuesto.presupuesto_unidades_medicas){
           
             var causes: Number  =  parseFloat( (this.presupuesto.presupuesto_unidades_medicas[i].causes_modificado / factor_meses).toFixed(2));
            if(causes > this.presupuesto.presupuesto_unidades_medicas[i].causes_disponible){
              causes =  parseFloat((this.presupuesto.presupuesto_unidades_medicas[i].causes_disponible).toFixed(2));
            }

            var no_causes  = parseFloat((this.presupuesto.presupuesto_unidades_medicas[i].no_causes_modificado / factor_meses).toFixed(2));
            if(no_causes > this.presupuesto.presupuesto_unidades_medicas[i].no_causes_disponible){
              no_causes =   parseFloat((this.presupuesto.presupuesto_unidades_medicas[i].no_causes_disponible).toFixed(2));
            }
            
            if(no_causes > 0 || causes > 0){
              var object = {
                clues: this.presupuesto.presupuesto_unidades_medicas[i].clues,
                unidad_medica: this.presupuesto.presupuesto_unidades_medicas[i].unidad_medica,
                causes_autorizado: causes,
                causes_modificado: causes,
                causes_disponible:  parseFloat((this.presupuesto.presupuesto_unidades_medicas[i].causes_disponible).toFixed(2)),
                no_causes_autorizado: no_causes,
                no_causes_modificado: no_causes,
                no_causes_disponible:  parseFloat((this.presupuesto.presupuesto_unidades_medicas[i].no_causes_disponible).toFixed(2))
              }
              this.cluesAgregadas.push(object.clues);
              this.pedido_ordinario.pedidos_ordinarios_unidades_medicas.push(object);
            }


           
          }
          
        }
        this.cargandoPresupuesto = false;
      }, error =>{
        console.log(error);
        this.cargandoPresupuesto = false;
      }
    )
  }

  agregarUnidadMedica(items:any[]){
    for(var i in items){
      var object = {
        clues: items[i].clues,
        unidad_medica: items[i],
        causes_autorizado: 0,
        causes_modificado: 0,
        no_causes_autorizado: 0,
        no_causes_modificado: 0
      }
      this.cluesAgregadas.push(object.clues);
      this.pedido_ordinario.pedidos_ordinarios_unidades_medicas.push(object);
    }
    console.log(this.pedido_ordinario);
  }

  eliminarUnidadMedica(item:any, index){
    
    for(var i = 0; i < this.cluesAgregadas.length; i++){
      if(item.clues == this.cluesAgregadas[i]){
        this.cluesAgregadas.splice(i,1);
        break;
      }
    }
    this.pedido_ordinario.pedidos_ordinarios_unidades_medicas.splice(index, 1);  
    this.calcularTotales();
  }


  checkNumber($value:any){
    $value = Number($value);
  }

  calcularTotales(){
    this.causes_sumado = 0;
    this.no_causes_sumado = 0;
    
    var con_errores = false;

    for(var i in this.pedido_ordinario.pedidos_ordinarios_unidades_medicas){
      if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error){
        con_errores = true;
        
        continue;
      }

     
      if(!isNaN(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].causes_autorizado)){
        if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].causes_autorizado> this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].causes_disponible ){
          con_errores = true;
          if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion == null){
            this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion = {};
          }
          this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion.causes_autorizado = "exceeded";
          
        }  else  if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion != null){
          this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion.causes_autorizado = "";    
          this.causes_sumado += Number(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].causes_autorizado);
        }

      
      } else {
        this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].causes_autorizado = 0;
      }

      if(!isNaN(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].no_causes_autorizado)){
        if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].no_causes_autorizado> this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].no_causes_disponible ){
          con_errores = true;
          if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion == null){
            this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion = {};
          }
          this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion.no_causes_autorizado = "exceeded";
        
        } else  if(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion != null){
          this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].error_validacion.no_causes_autorizado = ""; 
          this.no_causes_sumado += Number(this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].no_causes_autorizado);   
        }

       
      } else {
        this.pedido_ordinario.pedidos_ordinarios_unidades_medicas[i].no_causes_autorizado = 0;
      }
    }   
    this.errores_carga = con_errores
  }


  descargarFormato() {
		var query = "token=" + localStorage.getItem('token');
		window.open(`${environment.API_URL}/administrador-central/pedidos-ordinarios/formato-carga-pedido-ordinario-excel?${query}`);
  }

  mensajeErrorSync: string = "";
  archivo: File = null;
	archivoSubido: boolean = false;
	enviandoDatos: boolean = false;
	progreso: number = 0;
  mostrarModalCarga:boolean =  false;
  erroresArchivo = {
		archivo: null
  }

  erroresImportacion:any[] = [];
  
  
	cambiarArchivo() {
		this.errores = { archivo: null }
		this.mensajeErrorSync = "";
		this.archivo = null;
		this.archivoSubido = false;
		this.enviandoDatos = false;
		this.progreso = 0;
	}
	cerrarModalCarga() {
		this.mostrarModalCarga = false;
		this.cambiarArchivo();
  }

	fileChange(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			this.archivo = fileList[0];
		}
  }
  
  subir() {
		if (this.archivo) {
			this.erroresArchivo = {
				archivo: null
			}
			this.mensajeErrorSync = "";
			this.archivoSubido = false;
			this.enviandoDatos = true;

			let usuario = JSON.parse(localStorage.getItem("usuario"));

			let formData: FormData = new FormData();
      formData.append('archivo', this.archivo, this.archivo.name);

			let headers = new Headers();
			headers.delete('Content-Type');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
			let options = new RequestOptions({ headers: headers });
			//let options = new RequestOptions({ headers: headers });


			var responseHeaders: any;
			var contentDisposition: any;
			this.http.post(`${environment.API_URL}/administrador-central/pedidos-ordinarios/procesar-excel/`, formData, options)
				.subscribe(
					response => {
						this.archivoSubido = true;
						this.enviandoDatos = false;
						//this.mostrarModalSubirArchivoSQL = false;
						this.progreso = 100;
            this.archivo = null;
            
            var data = response.json().data;


           // this.pedido_ordinario.causes = data.causes;
           // this.pedido_ordinario.no_causes = data.no_causes;
            
            

            var con_errores = [];
            var correctos  = [];
            this.causes_sumado = 0;
            this.no_causes_sumado = 0;
            for(var i in data.pedidos_ordinarios_unidades_medicas){
              if(data.pedidos_ordinarios_unidades_medicas[i].error && data.pedidos_ordinarios_unidades_medicas[i].no_existe){
                con_errores.push(data.pedidos_ordinarios_unidades_medicas[i]);
              } else  if(data.pedidos_ordinarios_unidades_medicas[i].error){
                var um = data.pedidos_ordinarios_unidades_medicas[i];
                delete um.error;
                
                con_errores.push(um);
              }else{
                correctos.push(data.pedidos_ordinarios_unidades_medicas[i]);
                this.causes_sumado += Number(data.pedidos_ordinarios_unidades_medicas[i].causes_autorizado);
                this.no_causes_sumado += Number(data.pedidos_ordinarios_unidades_medicas[i].no_causes);
              }
            }

            this.pedido_ordinario.pedidos_ordinarios_unidades_medicas = con_errores.concat(correctos);
            

            if(data.con_errores){
              this.errores_carga = true;
              alert("1 o más unidades médicas en la importación no existen o no tienen presupuesto, elimine los registros marcados en rojo o corrija el archivo y vuelva a importar.")
            }

            if(this.erroresImportacion.length > 0 ){
              alert("Se ignoraron: " + this.erroresImportacion.length + " que contenian errores");
            }

            this.calcularTotales();
            
            this.cerrarModalCarga();

					},
					error => {
						if (error.status == 409) {
							this.mensajeErrorSync = "No se pudo subir el archivo, verifica que el archivo que tratas de subir sea correcto, que el nombre no haya sido modificado. Verifica que el archivo que intentas subir ya ha sido sincronizado previamente.";
						} else if (error.status == 401) {
							this.mensajeErrorSync = "El archivo que intentas subir ya ha sido sincronizado previamente";
						} else {
							this.mensajeErrorSync = "Hubo un problema al sincronizar, prueba recargar el sitio de lo contrario llama a soporte técnico.";
						}
						this.progreso = 100;
						this.enviandoDatos = false;

					}
				);
		}
  }

}
