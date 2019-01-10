import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';

import { CrudService } from '../../../crud/crud.service';
import { IniciarInventarioService } from '../iniciar-inventario.service';
import * as moment from 'moment';
import  * as FileSaver    from 'file-saver';
import { createAutoCorrectedDatePipe, createNumberMask } from 'text-mask-addons';

import { Mensaje } from '../../../mensaje';
import { NotificationsService } from 'angular2-notifications';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { error, inspect } from 'util';

@Component({
  selector: 'app-inicial-formulario',
  templateUrl: './formulario.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})

export class InicialComponent {
  /**
   * Variable que tiene un valor verdadero mientras cargan los datos del inventario.
   */
  cargarInventario = false;
  /**
   * Variable que contienen el total de la suma de los precios de los insumos más iva_importe.
   * @type {Number}
   */
  total_precio: Number = 0;
  /**
   * Variable que contienen el total del iva_importe de los insumos que son material de curación.
   * @type {Number}
   */
  total_iva: Number = 0;
  /**
   * Variable que contienen el total de la suma de los precios sin iva_importe.
   * @type {Number}
   */
  subtotal_precios: Number = 0;
  /**
   * Formulario reactivo que contiene los datos que se enviarán a la API.
   * @type {FormGroup}
   */
  dato: FormGroup;
  /**
   * Contiene los datos del modelo que se enviarán a la API.
   */
  form_dato;
  form_dato_auxiliar;

  programas_no_registrados:any[] = [];
  catalogo_programa;
  insumos_sin_clave:any[] = []; 
  catalogo_insumos_medicos:any[] = []; 
  bandera_subir:boolean = true;
  bandera_registros_a_subir:boolean = false;
  bandera_programas:boolean = false;
  bandera_insumos:boolean = false;
  bandera_importar:boolean = false;
  agregando_programa:boolean = false;
  busquedaQuery:String = '';
  showInsumos = false;
  obj_seleccionado:any = {};
  index_insumo_sin_clave:number = 0;
  restriccion_servidor = false;
  /**
   * Contiene la clave del programa elegido por el usuario, nos sirve para hacer comparaciones en caso
   * de que el usuario intente cambiar el programa cuando hay insumos capturados.
   * @type {any}
   */
  programa_elegido;
  /**
  * Contiene la información del insumo elegido por el usuario, y que posteriormente será agregado a la lista de insumos médicos
  * de la entrada estándar, los valores se asignan a los campos correspondientes del formulario reactivo.
  */
 insumo;
  /**
   * Contiene el index del lote a borrar.
   */
  index_borrar;
  /**
   * Contiene el index del insumo a borrar.
   */
  index_insumo;
  /**
   * Contiene el index del programa a borrar.
   */
  index_programa;
 /**
  * Variable que contiene un valor _true_ si el medicamento tiene valor unidosis y _false_ en caso contrario.
  * @type {boolean}
  */
 es_unidosis = false;
  /**
   * Contiene la lista de artículos restultados de la consulta a la API.
   */
  json_articulos;
  cat = [];

  /**
   * Variable que contiene un valor true si hay un proceso en ejecución o si está cargando datos.
   * @type {boolean}
   */
  cargando = false;
  /**
   * Calcula el tamaño de la pantalla
   */
  tamano = document.body.clientHeight;
  /**
   * Contiene los datos de inicio de sesión del usuario.
   * @type {any} */
  usuario;
  /**
   * Variable que contiene un valor _true_ o _false_.
   * @type {boolean}
   */
  time_cambio_cantidad_stoc;
  /**
   * Contiene la lista de programas
   * @type {any}
   */
  lista_programas= [];
  /**
   * Se tuvo que crear la variable debido a que se debe hacer referencia únicamente cuando se esté actualizando
   * el catálogo de programas y no cada vez que se esté cargando otros elementos.
   */
  cargandoCatalogo = false;
  /**
   * Contiene la URL donde se hace la búsqueda de insumos médicos, cuyos resultados posteriormente
   * se guarda en [res_busq_insumos]{@link FormularioComponent#res_busq_insumos}
   * @type {string} */
  public insumos_term = `${environment.API_URL}/insumos-auto?term=:keyword`;
  /**
   * Guarda el resultado de la búsqueda de insumos médicos.
   * @type {array} */
  res_busq_insumos= [];
  /**
   * Objeto que contiene la configuracion default para mostrar los mensajes,
   * mostrar barra de progreso, si pasa el mouse encima se mantiene el mensaje,
   * click para cerrar mensaje, tiempo 3 segundos.
   * @type {Object}
   */

  /*Variable que muestra el modal de carga de datos masiva */
  errores = {
		archivo: null
	}
	mostrarModalCarga: boolean = false;
	mostrarModalEditarRegistro: boolean = false;

	mensajeErrorSync: string = "";
	mensajeExito: string = "";
	archivo: File = null;
	archivoSubido: boolean = false;
	enviandoDatos: boolean = false;
	progreso: number = 0;

  /* Arreglo de datos de archivo */
  objeto = {
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 3000
  };
  /**
   * Objeto que contiene la configuracion default para mostrar los mensajes,
   * posicion abajo izquierda, tiempo 5 segundos.
   * @type {Object}
   */
  public options = {
    position: ['bottom', 'left'],
    timeOut: 5000,
    lastOnBottom: true
  };
  /**
   * Variable que muestra las notificaciones al usuario.
   * @type {Mensaje}
   */
  mensajeResponse: Mensaje = new Mensaje();
  guardado = false;
  error = false;

  /**
   * Contiene el valor de la tecla presionada por el usuario cuando se llama a la función handleKeyboardEvents(event: KeyboardEvent)
   */
  key;
  /**
   * Pipe que formate la fecha que ingresa el usuario
   * @type {any}
   */
  autoCorrectedDatePipe: any = createAutoCorrectedDatePipe('yyyy-mm-dd');
  /**
   * Se crea la máscara que contiene la configuración deseada.
   */
  numberMask: any = createNumberMask({
    prefix: '',
    includeThousandsSeparator: false,
    allowLeadingZeroes: false
  });
  /**
   * Máscara para validar la entrada de la fecha de caducidad con el formato siguiente AAAA-MM-DD
   * @type {array}
   */
  mask = [/[2]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  /**
   * Contiene __true__ cuando el formulario recibe el parámetro id, lo que significa que ha de mostrarse una salida por receta
   * existente. Cuando su valor es __false__ quiere decir que mostraremos la vista para crear una nueva salida.
   * @type {Boolean} */
  tieneid = false;
  /**
    * Contiene la fecha MÍNIMA que puede ingresar el usuario para la fecha que fue hecha la salida de almacen.
    * @type {Date} */
  MinDate = new Date();
  /**
    * Contiene la fecha MÁXIMA que puede ingresar el usuario para la fecha que fue hecha la salida de almacen.
    * @type {Date} */
  MaxDate = new Date();
  /**
   * Contiene la fecha del día de hoy y es la que automáticamente se asigna a la fecha del movimiento, aunque el usuario puede
   * cambiarla hay un límite de una fecha mínima [MinDate]{@link FormularioComponent#MinDate} y
   * fecha máxima [MaxDate]{@link FormularioComponent#MaxDate}
   * @type {Date} */
  fecha_actual;

  /**
   * Variable que contiene el id del programa a mostrar
   */
  i_programa;

  /**-------------------IMPRESION-------------------------- */
  /**
   * Objeto para los reportes con web Webworkers.
   * @type {Worker} */
  pdfworker: Worker;
  /**
   * Variable que vale true cuando se está cargando el PDF, false en caso contrario.
   * @type {boolean} */
  cargandoPdf = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificacion: NotificationsService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private iniciarInventarioService: IniciarInventarioService,
    private _ngZone: NgZone,
    private http: Http) { }

  ngOnInit() {
    // obtener los datos del usiario logueado almacen y clues
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
      

    //Configuracion de servidor principal
    if(this.usuario.almacen_activo.servidor_id == "0001")
      this.restriccion_servidor = false;
    else
      this.restriccion_servidor = true;  

    this.form_dato = {
      id: '',
      clues: this.usuario.clues_activa.clues,
      almacen_id:	this.usuario.almacen_activo.id,
      estatus	:	'NOINICIALIZADO',
      fecha_inicio: '',
      fecha_fin: '',
      observaciones: '',
      usuario_id: this.usuario.id,
      cantidad_programas: 0,
      cantidad_claves: 0,
      cantidad_insumos: 0,
      cantidad_lotes: 0,
      monto_total: 0,
      programas: []
    };

    this.cargarCatalogo('programa', 'lista_programas', 'estatus');
    // this.iniciarPrograma();

    let date = new Date();

    this.MinDate = new Date(date.getFullYear() - 1, 0, 1);
    this.MaxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // this.MinDateCaducidad = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();

    // si es nuevo poner la fecha actual si no poner la fecha con que se guardo
    if (this.form_dato.fecha_inicio === '') {
      this.fecha_actual = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
      this.form_dato.fecha_inicio = this.fecha_actual;
      this.form_dato.fecha_fin = this.fecha_actual;
    } else {
      // this.fecha_actual = this.form_dato.fecha_inicio;
      this.fecha_actual = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
      this.form_dato.fecha_fin = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
    }
    // Identificar si se reciben el parámetro ID
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
        this.cargarInventario = true;
        this.cargarDatos(params['id']);
      }
    });


    /* **********************IMPRIMIR******************************* */
        // Inicializamos el objeto para los reportes con web Webworkers
        this.pdfworker = new Worker('web-workers/inventario/inicializacion-inventario.js');

        // Este es un hack para poder usar variables del componente dentro de una funcion del worker
        var self = this;
        var $ngZone = this._ngZone;
    
        this.pdfworker.onmessage = function( evt ) {
          // Esto es un hack porque estamos fuera de contexto dentro del worker
          // Y se usa esto para actualizar alginas variables
          $ngZone.run(() => {
             self.cargandoPdf = false;
          });
          FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
        };
  }

  /**
   * Metodo que ssirve para agregar programa.
   */
  iniciarPrograma() {
        this.form_dato.programas.push({
            'id': '',
            'nombre': '',
            'clave': '',
            'insumos': []
    });
  }

  /* Importacion*/
  fileChange(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			this.archivo = fileList[0];
		}
  }
  
  cambiarArchivo() {
		this.errores = { archivo: null }
		this.mensajeErrorSync = "";
		this.mensajeExito = "";
		this.archivo = null;
		this.archivoSubido = false;
		this.enviandoDatos = false;
    this.progreso = 0;
    this.bandera_registros_a_subir = true;
    this.bandera_subir= true;
	}
	cerrarModalCarga() {
    this.mostrarModalCarga = false;
    this.bandera_subir= true;
    this.bandera_registros_a_subir = true;
    this.bandera_programas = false;
    this.bandera_importar = false;
    this.bandera_insumos = false;
    this.programas_no_registrados = [];
    this.insumos_sin_clave = [];
    this.form_dato_auxiliar = [];
    this.cambiarArchivo();
  }

  descargarFormato()
  {
    var query = "token=" + localStorage.getItem('token');
		window.open(`${environment.API_URL}/descargar-formato-inventario-inicial-excel?${query}`);
  }

  generar_reporte_insumos_faltantes()
  {
    let arreglo:any[] = [];
    
    for(var i in this.form_dato_auxiliar.programas)
    {
      let insumo = this.form_dato_auxiliar.programas[i].insumos;
        for(var j in insumo)
        {
            let lote_auxiliar = insumo[j].lotes;
            for(var k in lote_auxiliar)
            {
                if(insumo[j].clave_insumo_medico == null)
                {
                  let obj = { 'programa': this.form_dato_auxiliar.programas[i].nombre, 'clave_insumo_medico': insumo[j].clave_insumo_medico, 'descripcion': insumo[j].descripcion, 'lote': lote_auxiliar[k].lote, 'fecha': lote_auxiliar[k].fecha_caducidad, 'cantidad': lote_auxiliar[k].existencia };
                  arreglo.splice(0,0, obj);
                }
            }
        }
    }
    let insumos = { 'insumos' : arreglo};
    this.iniciarInventarioService.exportar_insumos(insumos).subscribe(
      resultado => {
        var query = "token="+localStorage.getItem('token');
        window.open(`${environment.API_URL}/descargar-insumos-sin-clave-excel/?${query}`);
        this.eliminar_insumos_sin_clave();
        
      }
    );
    /*let headers = new Headers();
    headers.delete('Content-Type');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    let arreglo:any[] = [];
    
    for(var i in this.form_dato_auxiliar.programas)
    {
      let insumo = this.form_dato_auxiliar.programas[i].insumos;
        for(var j in insumo)
        {
            let lote_auxiliar = insumo[j].lotes;
            for(var k in lote_auxiliar)
            {
                if(insumo[j].clave_insumo_medico == null)
                {
                  let obj = { 'programa': this.form_dato_auxiliar.programas[i].nombre, 'clave_insumo_medico': insumo[j].clave_insumo_medico, 'descripcion': insumo[j].descripcion, 'lote': lote_auxiliar[k].lote, 'fecha': lote_auxiliar[k].fecha_caducidad, 'cantidad': lote_auxiliar[k].existencia };
                  arreglo.splice(0,0, obj);
                }
            }
        }
    }
    let insumos = { 'insumos' : arreglo};
    this.http.post(`${environment.API_URL}/descargar-insumos-sin-clave-excel`, insumos, options)
        .subscribe(
          response => {
          }
    );
    //console.log(insumos);
    /*var query = "token="+localStorage.getItem('token');
    
    query += "&insumos="+JSON.stringify(insumos);
    window.open(`${environment.API_URL}/descargar-insumos-sin-clave-excel/?${query}`);
    this.eliminar_insumos_sin_clave();
    */
  }

  eliminar_insumos_sin_clave()
  {
    for(var i in this.form_dato_auxiliar.programas)
    {
      console.log(this.form_dato_auxiliar.programas[i]);
      console.log(this.form_dato_auxiliar.programas[i].insumos);
      console.log(this.form_dato_auxiliar.programas[i].insumos.length);
        let insumo = this.form_dato_auxiliar.programas[i].insumos;
        let tamano_insumo:number = (this.form_dato_auxiliar.programas[i].insumos.length -1);
        for(let j = 0; j <= tamano_insumo; j++)
        {
          let indice_insumo = tamano_insumo - j;
          if(insumo[indice_insumo].clave_insumo_medico == null)
          {
            this.form_dato_auxiliar.programas[i].insumos.splice(indice_insumo, 1);
          } 
        }
        /*for(let j in insumo)
        {
            let indice_insumo = tamano_insumo - parseInt(j);
            console.log(j);  
            //console.log(insumo[indice_insumo].clave_insumo_medico);
            if(insumo[indice_insumo].clave_insumo_medico == null)
            {
              //this.form_dato_auxiliar.programas[i].insumos.splice(indice_insumo, 1);
            }  
        }*/
       
    }
    //console.log(this.form_dato_auxiliar);
    let index_programas:number = (this.form_dato_auxiliar.programas.length - 1);
    for(let i =0; i<= index_programas; i++)
    {
      index_programas = index_programas - i;
      
      let insumo = this.form_dato_auxiliar.programas[index_programas].insumos;
      if(insumo.length == 0)
          this.form_dato_auxiliar.programas.splice(index_programas,1);
    }
    this.bandera_insumos = false;
    this.bandera_importar = true;
    this.insumos_sin_clave = [];
    
    if(this.form_dato_auxiliar.programas.length == 0)
      this.bandera_registros_a_subir = false;
    else
      this.bandera_registros_a_subir = true;
  }

  agregar_programas()
  {
      this.programas_no_registrados;
      this.agregando_programa = true;
      this.mensajeErrorSync = "";
      let headers = new Headers();
			headers.delete('Content-Type');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
      let options = new RequestOptions({ headers: headers });
      let programas:any[] = [];
      for( var i in this.programas_no_registrados)
      {
        let arreglo_programas = this.programas_no_registrados[i];
          let programa = { 'nombre': arreglo_programas.programa.nombre, 'estatus':1}
          programas.splice(0,0, programa);
      }
      
      let parametros = { 'programas': programas}
      this.http.post(`${environment.API_URL}/programa-inventario`, parametros, options)
          .subscribe(
            response => {
              this.agregando_programa = false;
              var data = response.json();
              this.catalogo_programa = data.data;
              this.relacionar_programa_nombre();
              this.bandera_insumos = true;
              
            },
            error => {
              if (error.status == 409) {
                this.mensajeErrorSync = "No se pudo subir el archivo, verifica que el archivo que tratas de subir sea correcto, que el nombre no haya sido modificado. Verifica que el archivo que intentas subir ya ha sido sincronizado previamente.";
              } else if (error.status == 401) {
                this.mensajeErrorSync = "El archivo que intentas subir ya ha sido sincronizado previamente";
              }else if (error.status == 500) {
                var data = error.json().data;
                //console.log(data);
                this.mensajeErrorSync = data;
              } else {
                this.mensajeErrorSync = "Hubo un problema al sincronizar, prueba recargar el sitio de lo contrario llama a soporte técnico.";
              }
              this.progreso = 100;
              this.enviandoDatos = false;
              this.agregando_programa = false;

            }
          );
  }


  guardar_programa_nuevo(index, obj)
  {
      this.agregando_programa = true;
      this.mensajeErrorSync = "";
      let headers = new Headers();
			headers.delete('Content-Type');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
			let options = new RequestOptions({ headers: headers });
      let programa = { 'nombre': obj.programa.nombre, 'estatus':1}
      this.http.post(`${environment.API_URL}/programa-inventario`, programa, options)
				.subscribe(
					response => {
            var data = response.json();
            this.catalogo_programa = data.data;
            
           this.relacionar_programa(index, data.id_programa);
           this.agregando_programa = false;
					},
					error => {
            this.progreso = 100;
            this.enviandoDatos = false;
            this.agregando_programa = false;
						if (error.status == 409) {
							this.mensajeErrorSync = "No se pudo subir el archivo, verifica que el archivo que tratas de subir sea correcto, que el nombre no haya sido modificado. Verifica que el archivo que intentas subir ya ha sido sincronizado previamente.";
						} else if (error.status == 401) {
							this.mensajeErrorSync = "El archivo que intentas subir ya ha sido sincronizado previamente";
						}else if (error.status == 500) {
              var data = error.json().data;
              //console.log(data);
							this.mensajeErrorSync = data;
						} else {
							this.mensajeErrorSync = "Hubo un problema al sincronizar, prueba recargar el sitio de lo contrario llama a soporte técnico.";
						}
						

					}
				);
  }

  eliminar_programa_no_registrado(index, obj)
  {
    this.programas_no_registrados.splice(index,1);
      
    if(this.programas_no_registrados.length == 0)
      this.verificar_claves();
  }

  relacionar_programa_nombre()
  {
    let index_programas = (this.programas_no_registrados.length -1);
    for(let i = 0; i <= index_programas; i++)
    {
      index_programas = index_programas - i;
      for(var j in this.catalogo_programa)
      {
        if(this.catalogo_programa[j].nombre == this.programas_no_registrados[index_programas].programa.nombre)
        {
          let catalogo = this.catalogo_programa[i];
          this.programas_no_registrados[index_programas].programa.id = catalogo.id;
          this.programas_no_registrados[index_programas].programa.clave = catalogo.clave;
          this.programas_no_registrados[index_programas].programa.nombre = catalogo.nombre;
          this.buscar_programa(this.catalogo_programa[i].id, index_programas);
        }
      }
      //this.programas_no_registrados.splice(index_programas,1);
    } 
    this.programas_no_registrados = [];
  }

  adjuntar()
  {
    //console.log(this.form_dato);
    //console.log(this.form_dato_auxiliar);
    for(var programa_excel in this.form_dato_auxiliar.programas)
    {
        let obj_programa_excel = this.form_dato_auxiliar.programas[programa_excel];
        let bandera_programa = 0;
        for(var programa_principal in this.form_dato.programas)
        {
          
          let obj_programa_principal = this.form_dato.programas[programa_principal];

          if(obj_programa_excel.id == obj_programa_principal.id)
          {
              //console.log("enrto programa");
              for(var insumo_excel in obj_programa_excel.insumos)
              {
                let bandera_insumo = 0;
                  let obj_insumo_excel = obj_programa_excel.insumos[insumo_excel];
                  for(var insumo_principal in obj_programa_principal.insumos)
                  {
                      let obj_insumo_principal = obj_programa_principal.insumos[insumo_principal];
                      if(obj_insumo_excel.clave_insumo_medico == obj_insumo_principal.clave_insumo_medico)
                      {
                        //console.log("enrto insumo");
                        
                        for(var lote_excel in obj_insumo_excel.lotes)
                        {
                            let bandera_lote = 0;
                            let obj_lote_excel = obj_insumo_excel.lotes[lote_excel];
                            for(var lote_principal in obj_insumo_principal.lotes)
                            {
                              let obj_lote_principal = obj_insumo_principal.lotes[lote_principal];
                              if(obj_lote_excel.fecha_caducidad == obj_lote_principal.fecha_caducidad && obj_lote_excel.lote == obj_lote_principal.lote)
                              {
                                //console.log("enrto lote");
                                this.form_dato.programas[programa_principal].insumos[insumo_principal].lotes[lote_principal].existencia = obj_lote_principal.existencia + obj_lote_excel.existencia;
                                bandera_lote = 1;
                              }
                              
                            }
                            if(bandera_lote == 0)
                            this.form_dato.programas[programa_principal].insumos[insumo_principal].lotes.splice(0,0, this.form_dato_auxiliar.programas[programa_excel].insumos[insumo_excel].lotes[lote_excel]);
                        }
                        bandera_insumo = 1;
                      }
                  }
                  if(bandera_insumo == 0)
                  {
                    this.form_dato.programas[programa_principal].insumo.splice(0,0, this.form_dato_auxiliar.programas[programa_excel].insumo[insumo_excel]);
                  }
              }
              
              bandera_programa = 1;
          }
          
        }
        //console.log(bandera_programa);
        if(bandera_programa == 0)
        this.form_dato.programas.push(this.form_dato_auxiliar.programas[programa_excel]);
    }
    //console.log(this.form_dato);
    //console.log(this.form_dato_auxiliar);
    for (var i_programa in this.form_dato.programas)
      {
        
        for (var i_insumo in this.form_dato.programas[i_programa].insumos)
        {
          for (var i_lote in this.form_dato.programas[i_programa].insumos[i_insumo].lotes)
          {
            let item = this.form_dato.programas[i_programa].insumos[i_insumo].lotes[i_lote];
            let evento = {key: 'tab'};
            this.cambio_cantidad_stock_key(evento, item, i_programa, i_insumo, i_lote); 
          }  
        }
      }
    this.cerrarModalCarga();
    
  }

  relacionar_programa(index, id_programa)
  {
    id_programa = parseInt(id_programa);
    for(var i in this.catalogo_programa)
    {
        if(this.catalogo_programa[i].id == id_programa)
        {
          let catalogo = this.catalogo_programa[i];
            this.programas_no_registrados[index].programa.id = catalogo.id;
            this.programas_no_registrados[index].programa.clave = catalogo.clave;
            this.programas_no_registrados[index].programa.nombre = catalogo.nombre;
            this.buscar_programa(id_programa, index);
        }
      }
      //console.log(this.form_dato_auxiliar);
      this.programas_no_registrados.splice(index,1);
      
      if(this.programas_no_registrados.length == 0)
        this.verificar_claves();
  }

  verificar_claves()
  {
    this.insumos_sin_clave = [];
    for(var x in this.form_dato_auxiliar.programas)
    {
        let programas = this.form_dato_auxiliar.programas[x];
        for(var y in programas.insumos)
        {
          let insumos_aux = programas.insumos[y];
          //console.log(insumos_aux); 
          if(!insumos_aux.clave_insumo_medico)
              this.bandera_insumos = true;
                  
            let obj_insumo = {id: y, indice_programa: x, nombre: insumos_aux.descripcion, programa: programas.id, id_insumo:0, nombre_programa: programas.nombre, lotes:[]};
            let tiene_precio = false;
            if (insumos_aux.precio_unitario) {
              tiene_precio = true;
            }
            if (insumos_aux.precio_unitario === null ) {
              tiene_precio = false;
            }

            let start_index = 0;
            let number_of_elements_to_remove = 0;
            for(var z in insumos_aux.lotes)
            {
              let lotes_temporales = insumos_aux.lotes[z];
              //console.log(lotes_temporales);
              
              obj_insumo.lotes.splice(start_index, number_of_elements_to_remove, lotes_temporales);
            }
            
            if(!insumos_aux.clave_insumo_medico)
            {
                obj_insumo.id_insumo = (this.form_dato_auxiliar.programas[x].insumos.length - 1);
                this.insumos_sin_clave.splice(0,0, obj_insumo);
            } 
        }
    }
    if(this.form_dato_auxiliar.programas.length == 0)
        this.bandera_registros_a_subir = false;
    else
      this.bandera_registros_a_subir = true;

    console.log(this.bandera_registros_a_subir);  
  
  }
  buscar_programa(id_programa, index)
  {
    //console.log(this.form_dato_auxiliar);   
    let bandera = 0;
      for(var i in this.form_dato_auxiliar.programas)
      {
          if(this.form_dato_auxiliar.programas[i].id == id_programa)
          {
            //console.log("entra");
              this.buscar_insumo_lote(i, index);
              bandera = 1;
          } 
      }
      if(bandera == 0)
      {
        this.programas_no_registrados[index].programa.insumos = this.crear_programa_nuevo(this.programas_no_registrados[index].programa);
        this.form_dato_auxiliar.programas.push(this.programas_no_registrados[index].programa);
      }
      //console.log(this.form_dato_auxiliar); 
  }

  buscarInsumo(obj, text, index)
  {
      this.index_insumo_sin_clave = index;
      this.obj_seleccionado = obj;
      this.showInsumos = true;
      //console.log(text);
      this.busquedaQuery = text;
  }


  crear_programa_nuevo(obj_programa)
  {
      let obj_insumos = [];
      for(var i in obj_programa.insumos)
      {
        let insumos = obj_programa.insumos[i];
        let ob_temporal = {
          clave_insumo_medico: insumos.clave_insumo_medico,
          descripcion: insumos.descripcion,
          nombre: insumos.nombre,
          es_causes: insumos.es_causes,
          es_unidosis: insumos.es_unidosis,
          cantidad_x_envase: insumos.cantidad_x_envase,
          tipo: insumos.tipo,
          precio_unitario: insumos.precio_unitario,
          subtotal: '',
          lotes: []
        };

        let tiene_precio = false;
        if (ob_temporal.precio_unitario) {
          tiene_precio = true;
        }
        if (ob_temporal.precio_unitario === null ) {
          tiene_precio = false;
        }

        let start_index = 0;
        let number_of_elements_to_remove = 0;

        //console.log(insumo_auxiliar);
        for(var z in insumos.lote)
        {
          let lotes_temporales = insumos.lote[z];
          
          let lote_temporal = {
            id: null,
            lote: lotes_temporales.no_lote,
            codigo_barras: '',
            fecha_caducidad: lotes_temporales.fecha,
            existencia: lotes_temporales.cantidad,
            precio_unitario: tiene_precio ? Number(ob_temporal.precio_unitario) : null,
            importe: 0,
            iva_importe: 0,
            exclusivo: 1,
            requerir_pu: tiene_precio ? false : true
          };

          ob_temporal.lotes.splice(start_index, number_of_elements_to_remove, lote_temporal);
        }
        obj_insumos.splice(start_index, number_of_elements_to_remove, ob_temporal);
      }
      return obj_insumos;
  }
  buscar_insumo_lote(index_con_programa, index_sin_programa)
  {
    let bandera = 0;
    let bandera_lote = 0;
    for(var i in this.programas_no_registrados[index_sin_programa].programa.insumos)
    {
      let insumo_no_programa = this.programas_no_registrados[index_sin_programa].programa.insumos[i];
      console.log(insumo_no_programa);
      for(var j in this.form_dato_auxiliar.programas[index_con_programa].insumos)
      {
        
            let insumo_programa = this.form_dato_auxiliar.programas[index_con_programa].insumos[j];
            console.log(insumo_programa);
            if(insumo_no_programa.clave_insumo_medico == insumo_programa.clave_insumo_medico && insumo_programa.clave_insumo_medico!= null && insumo_no_programa.clave_insumo_medico!= null)
            {
                for(var k in insumo_no_programa.lotes)
                {
                  let tiene_precio = false;
                  if (insumo_programa.precio_unitario) {
                    tiene_precio = true;
                  }
                  if (insumo_programa.precio_unitario === null ) {
                    tiene_precio = false;
                  }

                  let start_index = 0;
                  let number_of_elements_to_remove = 0;

                  for(var l in insumo_programa.lotes)
                  {
                      if(insumo_no_programa.lotes[k].fecha == insumo_programa.lotes[l].fecha_caducidad && insumo_no_programa.lotes[k].no_lote == insumo_programa.lotes[l].lote)
                      {
                        this.form_dato_auxiliar.programas[index_con_programa].insumos[j].lotes[l].cantidad = this.form_dato_auxiliar.programas[index_con_programa].insumos[j].lotes[l].cantidad + insumo_no_programa.lotes[k].cantidad;
                        bandera_lote = 1;
                      }
                  }
                  if(bandera_lote == 0)
                  {
                      let lote_temporal = {
                        id: null,
                        lote: insumo_no_programa.lotes[k].no_lote,
                        codigo_barras: '',
                        fecha_caducidad: insumo_no_programa.lotes[k].fecha,
                        existencia: insumo_no_programa.lotes[k].cantidad,
                        precio_unitario: tiene_precio ? Number(insumo_programa.precio_unitario) : null,
                        importe: 0,
                        iva_importe: 0,
                        exclusivo: 1,
                        requerir_pu: tiene_precio ? false : true
                      };

                      this.form_dato_auxiliar.programas[index_con_programa].insumos[j].lotes.splice(start_index, number_of_elements_to_remove, lote_temporal);
                  }
                }
                bandera = 1;  
            }
        }
        if(bandera == 0)
        {
            let ob_temporal = {
              clave_insumo_medico: insumo_no_programa.clave_insumo_medico,
              descripcion: insumo_no_programa.descripcion,
              nombre: insumo_no_programa.nombre,
              es_causes: insumo_no_programa.es_causes,
              es_unidosis: insumo_no_programa.es_unidosis,
              cantidad_x_envase: insumo_no_programa.cantidad_x_envase,
              tipo: insumo_no_programa.tipo,
              precio_unitario: insumo_no_programa.precio_unitario,
              subtotal: '',
              lotes: []
            };

            let tiene_precio = false;
            if (ob_temporal.precio_unitario) {
              tiene_precio = true;
            }
            if (ob_temporal.precio_unitario === null ) {
              tiene_precio = false;
            }

            let start_index = 0;
            let number_of_elements_to_remove = 0;

            for(var z in insumo_no_programa.lote)
            {
              let lotes_temporales = insumo_no_programa.lote[z];
              
              let lote_temporal = {
                id: null,
                lote: lotes_temporales.no_lote,
                codigo_barras: '',
                fecha_caducidad: lotes_temporales.fecha,
                existencia: lotes_temporales.cantidad,
                precio_unitario: tiene_precio ? Number(ob_temporal.precio_unitario) : null,
                importe: 0,
                iva_importe: 0,
                exclusivo: 1,
                requerir_pu: tiene_precio ? false : true
              };

              ob_temporal.lotes.splice(start_index, number_of_elements_to_remove, lote_temporal);
            }
            this.form_dato_auxiliar.programas[index_con_programa].insumos.splice(start_index, number_of_elements_to_remove, ob_temporal);
          
        }
    }
    
    //console.log(bandera);
  }

  seleccionInsumo(obj)
  {
    //this.obj_seleccionado;
    
    //onsole.log(this.obj_seleccionado);
    //console.log(this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa]);
    
    let bandera:number = 0;
    let index_borrar:number = 0;
    //obtenemos el index del insumo a ingresar dentro de la lista correcta
    for(let i in this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos)
    {
      let insumo_verificar = this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos[i];
        if(this.obj_seleccionado.nombre ==  insumo_verificar.descripcion && insumo_verificar.clave_insumo_medico == null)
        {
          index_borrar = parseInt(i);
        }
    }
    

    for(var i in this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos)
    {
       let insumo = this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos[i];

       if(insumo.clave_insumo_medico == obj.clave)
       {
         
          for(var lotes in this.obj_seleccionado.lotes)
          {
              let bandera_lote:number = 0;
              let var_lote = this.obj_seleccionado.lotes[lotes];
              for(var j in insumo.lotes)
              {
                  let lote_principal = insumo.lotes[j];
                  if(lote_principal.fecha_caducidad == var_lote.fecha_caducidad && var_lote.lote == lote_principal.lote)
                  {
                    let lote = this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos[i].lotes[j];
                    this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos[i].lotes[j].existencia = parseFloat(var_lote.existencia) + parseFloat(lote.existencia);
                    bandera_lote = 1;
                  }
              }
              if(bandera_lote == 0)
              {
                this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos[i].lotes.splice(0,0, var_lote);
              }
          }
          
          bandera = 1;
          this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos.splice(index_borrar,1);
         
       }
       
    }
    console.log(this.form_dato_auxiliar);
    if(bandera == 0)
    {
        let insumo_auxiliar = this.form_dato_auxiliar.programas[this.obj_seleccionado.indice_programa].insumos[this.obj_seleccionado.id_insumo];
        insumo_auxiliar.clave_insumo_medico= obj.clave;
        insumo_auxiliar.descripcion= obj.descripcion;
        insumo_auxiliar.nombre= obj.nombre;
        insumo_auxiliar.es_causes= obj.es_causes;
        insumo_auxiliar.es_unidosis= obj.es_unidosis;
        insumo_auxiliar.cantidad_x_envase= obj.cantidad_x_envase;
        insumo_auxiliar.tipo= obj.tipo;
        insumo_auxiliar.precio_unitario= obj.precio_unitario;
        
        for(var i in insumo_auxiliar.lotes)
        {
            let tiene_precio = false;
            if (insumo_auxiliar.precio_unitario) {
              tiene_precio = true;
            }
            if (insumo_auxiliar.precio_unitario === null ) {
              tiene_precio = false;
            }
          insumo_auxiliar.lotes[i].precio_unitario = tiene_precio ? Number(insumo_auxiliar.precio_unitario) : null;
          insumo_auxiliar.lotes[i].requerir_pu = tiene_precio ? false : true;
      }
    }
    this.showInsumos = false;
    this.busquedaQuery = "";
    this.insumos_sin_clave.splice(this.index_insumo_sin_clave, 1);
    
    if(this.insumos_sin_clave.length == 0)
    {
      this.bandera_insumos = false;
      if(this.form_dato_auxiliar.programas.length == 0)
        this.bandera_registros_a_subir = false;
      else
        this.bandera_registros_a_subir = true;
    }
  }

  subir() {
		if (this.archivo) {
			/*this.listaCargaMasiva = {
				medicamentos: { correctos: [], por_validar: [], errores: [] },
				material_curacion: { correctos: [], por_validar: [], errores: [] }
			}*/
			this.errores = {
				archivo: null
			}
			this.mensajeErrorSync = "";
			this.archivoSubido = false;
			this.enviandoDatos = true;

			let usuario = JSON.parse(localStorage.getItem("usuario"));

			let formData: FormData = new FormData();
			formData.append('archivo', this.archivo);
      
			let headers = new Headers();
			headers.delete('Content-Type');
			headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
			let options = new RequestOptions({ headers: headers });
      
      var responseHeaders: any;
			var contentDisposition: any;
			this.http.post(`${environment.API_URL}/cargar-inventario-inicial-excel`, formData, options)
				.subscribe(
					response => {
            var data = response.json().data;
            this.archivoSubido = true;
            this.enviandoDatos = false;
            this.bandera_subir = false;
						
						this.progreso = 100;
            this.archivo = null;

            
            if(data.sin_programa.length > 0)
              this.bandera_programas = true;
            
            this.catalogo_programa = data.programas;
            //this.catalogo_insumos_medicos = data.insumos_medicamentos;
            
            for(var i in data.insumos_medicamentos)
            {
              this.catalogo_insumos_medicos.splice(0,0, data.insumos_medicamentos[i]);
              //console.log(data.insumos_medicamentos[i]);
            }
            //console.log(this.catalogo_insumos_medicos);
            this.form_dato_auxiliar = {
              id: '',
              clues: this.usuario.clues_activa.clues,
              almacen_id:	this.usuario.almacen_activo.id,
              estatus	:	'NOINICIALIZADO',
              fecha_inicio: this.form_dato.fecha_inicio,
              fecha_fin: this.form_dato.fecha_fin,
              observaciones: '',
              usuario_id: this.usuario.id,
              cantidad_programas: 0,
              cantidad_claves: 0,
              cantidad_insumos: 0,
              cantidad_lotes: 0,
              monto_total: 0,
              programas: []
            };

            for(var i in data.insumos)
            {
                this.form_dato_auxiliar.programas.push({
                  'id': data.insumos[i].programa.id,
                  'nombre': data.insumos[i].programa.nombre,
                  'clave': data.insumos[i].programa.clave,
                  'insumos': []
                });
                let indice_programa = this.form_dato_auxiliar.programas.length;
                for(var j in data.insumos[i].programa.insumos)
                {
                  
                  let insumo_auxiliar = data.insumos[i].programa.insumos[j];
                  if(!insumo_auxiliar.clave_insumo_medico)
                    this.bandera_insumos = true;
                  
                  let obj_insumo = {id: j, indice_programa: (indice_programa -1), nombre: insumo_auxiliar.descripcion, programa: data.insumos[i].programa.id, id_insumo:0, nombre_programa: data.insumos[i].programa.nombre, lotes:[]};
                    
                  let ob_temporal = {
                    clave_insumo_medico: insumo_auxiliar.clave_insumo_medico,
                    descripcion: insumo_auxiliar.descripcion,
                    nombre: insumo_auxiliar.nombre,
                    es_causes: insumo_auxiliar.es_causes,
                    es_unidosis: insumo_auxiliar.es_unidosis,
                    cantidad_x_envase: insumo_auxiliar.cantidad_x_envase,
                    tipo: insumo_auxiliar.tipo,
                    precio_unitario: insumo_auxiliar.precio_unitario,
                    subtotal: '',
                    lotes: []
                  };

                  let tiene_precio = false;
                  if (ob_temporal.precio_unitario) {
                    tiene_precio = true;
                  }
                  if (ob_temporal.precio_unitario === null ) {
                    tiene_precio = false;
                  }

                  let start_index = 0;
                  let number_of_elements_to_remove = 0;

                  //console.log(insumo_auxiliar);
                  for(var z in insumo_auxiliar.lote)
                  {
                    let lotes_temporales = insumo_auxiliar.lote[z];
                    
                    let lote_temporal = {
                      id: null,
                      lote: lotes_temporales.no_lote,
                      codigo_barras: '',
                      fecha_caducidad: lotes_temporales.fecha,
                      existencia: lotes_temporales.cantidad,
                      precio_unitario: tiene_precio ? Number(ob_temporal.precio_unitario) : null,
                      importe: 0,
                      iva_importe: 0,
                      exclusivo: 1,
                      requerir_pu: tiene_precio ? false : true
                    };

                    ob_temporal.lotes.splice(start_index, number_of_elements_to_remove, lote_temporal);
                    
                    obj_insumo.lotes.splice(start_index, number_of_elements_to_remove, lote_temporal);                      
                    
                  }
                  
                  this.form_dato_auxiliar.programas[indice_programa-1].insumos.splice(start_index, number_of_elements_to_remove, ob_temporal);

                  
                  if(!insumo_auxiliar.clave_insumo_medico)
                  {
                      obj_insumo.id_insumo = (this.form_dato_auxiliar.programas[indice_programa-1].insumos.length - 1);
                      this.insumos_sin_clave.splice(0,0, obj_insumo);
                  }
                      
                }
            }
            
            this.programas_no_registrados = data.sin_programa;
            
            this.mensajeExito = "El archivo no contiene ningun error y se encuentra listo para subir";
            

					},
					error => {
						if (error.status == 409) {
							this.mensajeErrorSync = "No se pudo subir el archivo, verifica que el archivo que tratas de subir sea correcto, que el nombre no haya sido modificado. Verifica que el archivo que intentas subir ya ha sido sincronizado previamente.";
						} else if (error.status == 401) {
							this.mensajeErrorSync = "El archivo que intentas subir ya ha sido sincronizado previamente";
						}else if (error.status == 500) {
              var data = error.json().data;
              //console.log(data);
							this.mensajeErrorSync = data;
						} else {
							this.mensajeErrorSync = "Hubo un problema al sincronizar, prueba recargar el sitio de lo contrario llama a soporte técnico.";
						}
						this.progreso = 100;
						this.enviandoDatos = false;

					}
        );
        //console.log(this.form_dato_auxiliar);
    }
    
  }
  
  confirmar()
  {
      /*this.mensajeExito = "";
      this.mensajeErrorSync = "";
      this.mostrarModalCarga = false;*/
      this.form_dato = this.form_dato_auxiliar;
      for (var i_programa in this.form_dato_auxiliar.programas)
      {
        
        for (var i_insumo in this.form_dato_auxiliar.programas[i_programa].insumos)
        {
          for (var i_lote in this.form_dato_auxiliar.programas[i_programa].insumos[i_insumo].lotes)
          {
            let item = this.form_dato_auxiliar.programas[i_programa].insumos[i_insumo].lotes[i_lote];
            let evento = {key: 'tab'};
            this.cambio_cantidad_stock_key(evento, item, i_programa, i_insumo, i_lote); 
          }  
        }
      }
      this.cerrarModalCarga();
  }
  /* Importacion */
  /**
   * Función local para cargar el catalogo de programas, no se utilizó el cargarCatalogo del CRUD,
   * debido a que este catálogo no existen 'mis-programas', sino que es un catálogo general y se agregan
   * al arreglo únicamente aquellos programas que se encuentran activos (estatus = 1).
   * @param url Contiene la cadena con la URL de la API a consultar para cargar el catalogo del select.
   * @param modelo Contiene el nombre de la variable en la que se guardan los resultados de la consulta a la API.
   * @param estado Contiene el valor de la variable que representa el estado de cada item.
   */
  cargarCatalogo(url, modelo, estado) {
    this[modelo] = [];
    this.cargandoCatalogo = true;
    this.crudService.lista_general(url).subscribe(
      resultado => {
        this.cargandoCatalogo = false;
        let contador = 0;
        for (let item of resultado) {
          if (item[estado] === 1 || item[estado] === '1') {
            this[modelo].push(item);
          }
        }
      }
    );
  }

  /**
   * Método para inciar el formulario reactivo del array de insumos
   */
  arrayInsumos(): FormGroup {
    let temporal_cantidad_x_envase;
    if (this.insumo.cantidad_x_envase == null){
      temporal_cantidad_x_envase = 1;
    }else {
      temporal_cantidad_x_envase = this.insumo.cantidad_x_envase;
    }
    return this.fb.group({
      clave_insumo_medico: this.insumo.clave,
      descripcion: this.insumo.descripcion,
      nombre: this.insumo.nombre,
      es_causes: this.insumo.es_causes,
      es_unidosis: this.insumo.es_unidosis,
      tipo: this.insumo.tipo,
      cantidad_x_envase: temporal_cantidad_x_envase
    });
  }



  /**
   * Método para agregar programas al formulario
   */
  agregarInsumo(i): void {
    let existe = false;

    for (let item of this.form_dato.programas[i].insumos) {
      if (item.clave_insumo_medico === this.insumo.clave) {
        existe = true;
        break;
      }
    }

    /*** Forma para agregar a modelo ***/
    let ob_temporal = {
      clave_insumo_medico: this.insumo.clave,
      descripcion: this.insumo.descripcion,
      nombre: this.insumo.nombre,
      es_causes: this.insumo.es_causes,
      es_unidosis: this.insumo.es_unidosis,
      cantidad_x_envase: this.insumo.cantidad_x_envase,
      tipo: this.insumo.tipo,
      precio_unitario: this.insumo.precio_unitario,
      subtotal: '',
      lotes: []
    };

    if (!existe) {
      let start_index = 0;
      let number_of_elements_to_remove = 0;
      this.form_dato.programas[i].insumos.splice(start_index, number_of_elements_to_remove, ob_temporal);
    }
  }
  /**
   * Se crea la variable para que exclusivamente se envíe el index del programa en los modales.
   */
  programa_index;
  /**
   * Método con el que comprobamos la lista de insumos antes de cambiar de programa.
   * En caso de que la lista tenga datos, debe confirmar el cambio para eliminar los insumos capturados,
   * y que se capturen los insumos del programa al que corresponde.
   */
  comprobar_lista (i) {
    // const lista_insumos = <FormArray>this.dato.controls['insumos'];

    if (this.form_dato.programas[i].insumos.length > 0) {
      this.abrirModal('cambiarPrograma');
    } else {
      // this.programa_elegido = this.dato.controls.programa_id.value;
      this.programa_elegido = this.form_dato.programas[i].id;
    }
    this.programa_index = i;
  }

  /**
   * Método para asignar el valor del nuevo programa elegido o mantener el mismo programa.
   * @param respuesta Variable que contiene un valor _true_ si desea mantener el programa y  _false_ si el usuario desea cambiarlo.
   */
  mantenerPrograma (respuesta: boolean) {

    if (respuesta) {
      // this.dato.get('programa_id').patchValue(this.programa_elegido);
      this.form_dato.programas[this.programa_index].id = this.programa_elegido;
    } else {
      this.programa_elegido = this.form_dato.programas[this.programa_index].id;
      this.form_dato.programas[this.programa_index].insumos = [] ;
      this.subtotal_precios = 0;
      this.total_iva = 0;
      this.total_precio = 0;
      //this.dato.controls.insumos = this.fb.array([]);
    }
  }

  /**
   * Método que valida si la fecha de caducidad tiene un formato válido y si es mayor al periodo mínimo de caducidad (14 días).
   * @param fecha Variable que contiene la fecha de caducidad ingresada por el usuario para el insumo y lote correspondiente.
   * @param i Index de la posición del insumo al que corresponde la fecha de caducidad.
   */
  validar_fecha(fecha, i_programa, i_insumo, i_lote) {
    // const control = <FormArray>this.dato.controls['insumos'];
    // const ctrlLotes = <FormArray>control.controls[i];

    let fecha_hoy = moment();
    if (!moment(fecha, 'YYYY-MM-DD', true).isValid()) {
      this.notificacion.alert('Fecha inválida', 'Debe ingresar una fecha válida', this.objeto);
      this.form_dato.programas[i_programa].insumos[i_insumo].lotes[i_lote].fecha_caducidad = '';
      // ctrlLotes.controls['fecha_caducidad'].patchValue('');
    } else {
      if (moment(fecha, 'YYYY-MM-DD', true) <= fecha_hoy.add(14, 'days')) {
        // ctrlLotes.controls['fecha_caducidad'].patchValue('');
        this.form_dato.programas[i_programa].insumos[i_insumo].lotes[i_lote].fecha_caducidad = '';
        this.notificacion.alert('Fecha inválida', 'La fecha de caducidad debe ser mayor al ' +
         fecha_hoy.format('YYYY-MM-DD'), this.objeto);
      }
    }
  }

  /**
   * Este método permite que el focus del cursor vuelva al buscador de insumos una vez presionada la tecla enter
   * @param event Parametro que contiene el valor de la tecla presionada
   * @return void
   */
  handleKeyboardEvents(event: KeyboardEvent) {
    this.key = event.which || event.keyCode;
    if (event.keyCode === 13) {
      document.getElementById('buscarInsumo').focus();
      event.preventDefault();
      return false;
    }
  }


  /**
   * Seleccionar programa para cambiar la vista al usuario
   * @param id variable que contiene el id del programa
   */
  seleccionarPrograma(programa_id) {
    // let programa_id = (<HTMLInputElement>document.getElementById('programa_agregado')).value;
    for (let p = 0; p < this.form_dato.programas.length; p++) {
      if (String(this.form_dato.programas[p].id) === programa_id || Number(this.form_dato.programas[p].id) === programa_id) {
        this.i_programa = p;
        break;
      }
    }
  }

    /**
   * Método para asignar los datos del programa al formulario.
   * @param programa_id Objeto que contiene el id del programa seleccionado.
   */
  addPrograma() {
    let programa_id = (<HTMLInputElement>document.getElementById('seleccionar_programa')).value;
    let existe_programa = false, indice;
    for (let p = 0; p < this.form_dato.programas.length; p++) {
      if (String(this.form_dato.programas[p].id) === programa_id) {
        existe_programa = true;
        indice = p;
        break;
      }
    }
    if (!existe_programa) {
      for (let obj of this.lista_programas) {
        if (Number(obj.id) === Number(programa_id)) {
          this.form_dato.programas.push({
            'id': obj.id,
            'nombre': obj.nombre,
            'clave': obj.clave,
            'insumos': []
          });
          this.i_programa = this.form_dato.programas.length - 1;
          // this.seleccionarPrograma(this.form_dato.programas.length-1);
          break;
        }
      }
    }
  }
  /**
   * Metodo que calcula el preupuesto de cada CLUES.
   * @param i_programa Index del programa al que pertenece el insumo.
   * @param i_insumo Index del insumo al que pertenece el lote.
   * @param i_lote Index del lote al que pertenece el precio unitario a capturar.
   */
  validar_precio_unitario(i_programa, i_insumo, i_lote) {
    if (isNaN(this.form_dato.programas[i_programa].insumos[i_insumo].lotes[i_lote].precio_unitario)) {
      this.form_dato.programas[i_programa].insumos[i_insumo].lotes[i_lote].requerir_pu = true;
    } else {
      this.form_dato.programas[i_programa].insumos[i_insumo].lotes[i_lote].requerir_pu = false;
    }
  }
  /**
   * Método para asignar los datos del programa al formulario reactivo.
   * @param programa_id Objeto que contiene los datos del programa.
   * @param i Variable que contiene la posición del programa.
   */
  asignarPrograma(programa_id, i) {
    const control = <FormArray>this.dato.controls['programas'];
    for (let obj of this.lista_programas) {
      if (Number(obj.id) === Number(programa_id)) {
        this.form_dato.programas[i].clave = obj.clave;
        this.form_dato.programas[i].nombre = obj.nombre;
        this.form_dato.programas[i].id = obj.id;
    //     control.controls[i]['controls']['clave'].patchValue(obj.clave);
    //     control.controls[i]['controls']['nombre'].patchValue(obj.nombre);
      }
    }
  }

  /**
   * Método de búsqueda de insumos en la API.
   * @param keyword Contiene la palabra que se va a buscar.
   */
  enviarAutocomplete(keyword: any) {
    this.cargando = true;
    let cabecera = '';
    if (this.usuario.clues_activa) {
      cabecera += '&clues=' + this.usuario.clues_activa.clues;
    }
    if (this.usuario.almacen_activo) {
      cabecera += '&almacen=' + this.usuario.almacen_activo.id;
    }
    let url: string = '' + environment.API_URL + '/insumos-auto?term=' + keyword + cabecera;
    this.crudService.busquedaInsumos(keyword, 'insumos-auto').subscribe(
      resultado => {
        this.cargando = false;
        this.res_busq_insumos = resultado;
        if (this.res_busq_insumos.length === 0) {
          this.notificacion.warn('Insumos', 'No hay resultados que coincidan', this.objeto);
        }
      }
    );
  }  
  /**
  * Este método carga los datos de un elemento de la api con el id que se pase por la url
  * @param data json con los datos del objetop seleccionado del autocomplete
  * @return void
  */
 select_insumo_autocomplete(data, i) {
   this.cargando = true;
   this.insumo = data;
   this.agregarInsumo(i);
   (<HTMLInputElement>document.getElementById('buscarInsumo')).value = '';
   this.res_busq_insumos = [];
   this.es_unidosis = data.es_unidosis;
   this.cargando = false;
 }

  /**
   * Este método valida que en el campo de la existencia no pueda escribir puntos o signo negativo
   * @param event Parametro que contiene el valor de la tecla presionada
   * @return void
   */
  quitar_punto(event) {
    if (this.is_numeric(event.key ) ) {
      return true;
    }else {
      return false;
    }
  }

    /**
   * Método que evalúa las teclas presionadas en los campos de existencia y precio unitario para
   * mandar a llamar la función calcular_importes (item, pos) si son valores válidos.
   * @param event Parametro que contiene el valor de la tecla presionada.
   * @param item Variable que contiene el objeto del insumo al que pertenece el precio y la existencia.
   * @param pos Contiene la posición a la que pertenece el insumo.
   */
  cambio_cantidad_stock_key(event, item, i_prog, i_insumo, i_lote) {
      if (event.key == 'Backspace' || event.key == 'Delete') {
      this.calcular_importes(item, i_prog, i_insumo, i_lote);
      this.calcularSubtotal(i_prog, i_insumo);
    }
    if (event.key != 'Backspace'
      && event.key != 'Delete'
      && event.key != 'ArrowLeft'
      && event.key != 'ArrowRight'
      && event.key != 'ArrowUp'
      && event.key != 'ArrowDown'
      && event.key != '.') {
      // clearTimeout(this.time_cambio_cantidad_stoc);
      // this.time_cambio_cantidad_stoc = setTimeout(() => {
        this.calcular_importes(item, i_prog, i_insumo, i_lote);
        this.calcularSubtotal(i_prog, i_insumo);
      // }, 800);
    }
  }

    /**
   * Método para calcular subtotal del insumo.
   * @param item Variable que contiene el objeto del insumo al que pertenece el precio y la existencia.
   * @param pos Contiene la posición del arreglo a la que se agregará la existencia.
   */
  calcular_importes (item, i_prog, i_insumo, i_lote) {
    this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i_lote].existencia = Number(item.existencia);
    if (isNaN(item.precio_unitario)) {
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i_lote].importe = 0;
    } else if (item.precio_unitario === '' || item.precio_unitario == null || isNaN(item.precio_unitario)) {
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i_lote].importe = 0;
    } else if (item.existencia  === '' || item.existencia == null || item.existencia === 0) {
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i_lote].importe = 0;
    } else {
      let temporal = Number(item.existencia) * Number(item.precio_unitario);
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i_lote].importe = temporal;
    }
  }

  calcularSubtotal(i_prog, i_insumo) {
    let temporal_total_iva = 0, temporal_subtotal_precios = 0, total_insumo = 0;

    for (let i = 0; i < this.form_dato.programas[i_prog].insumos[i_insumo].lotes.length; i++) {
      temporal_subtotal_precios = temporal_subtotal_precios + Number(this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i].importe);
      if (this.form_dato.programas[i_prog].insumos[i_insumo].tipo === 'MC') {
        this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i].iva_importe = Number(this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i].importe) * .16;
        temporal_total_iva = Number(temporal_total_iva) + ( Number(this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i].importe) * .16);
      }
    }
      this.form_dato.programas[i_prog].insumos[i_insumo].subtotal  = Number(temporal_subtotal_precios) + Number(temporal_total_iva);
    
    this.sumaTotal();
  }

  /**
   * Método en el que se hace la suma de los precios de los insumos, debemos sacar el iva_importe en caso de que sea Material de Curación
   * y sumar todo para obtener el total de la factura.
   */
  sumaTotal() {

    let suma_insumo = 0, iva_insumos = 0, cantidad_claves = 0, cantidad_lotes = 0, cantidad_insumos = 0;

    for (let p = 0; p < this.form_dato.programas.length; p++) {
      for (let c = 0; c < this.form_dato.programas[p].insumos.length; c++) {
        for (let i = 0; i < this.form_dato.programas[p].insumos[c].lotes.length; i++) {
          suma_insumo = suma_insumo + Number(this.form_dato.programas[p].insumos[c].lotes[i].importe);
          if (this.form_dato.programas[p].insumos[c].tipo === 'MC') {
            iva_insumos = Number(iva_insumos) + Number(this.form_dato.programas[p].insumos[c].lotes[i].iva_importe);
          }
          cantidad_insumos = cantidad_insumos + Number(this.form_dato.programas[p].insumos[c].lotes[i].existencia);
          cantidad_lotes++;
        }
        cantidad_claves++;
      }
    }

    this.subtotal_precios = Number(suma_insumo);
    this.total_iva        = iva_insumos;
    this.total_precio     = Number(this.subtotal_precios) + Number(this.total_iva);

    this.form_dato.cantidad_programas = this.form_dato.programas.length;
    this.form_dato.cantidad_claves    = cantidad_claves;
    this.form_dato.cantidad_insumos   = cantidad_insumos;
    this.form_dato.cantidad_lotes     = cantidad_lotes;
    this.form_dato.monto_total        = this.total_precio;
  }

  /**
   * Devuelve un valor Boolean que indica si existe o no un patrón en una cadena de búsqueda.
   * @param str Valor de la tecla presionada por el usuario.
   */
  is_numeric(str) {
    return /^\d+$/.test(str);
  }

  /**
   * Método con el que se agregan lotes al array.
   */
  agregarLote(i_prog, i_insumo) {
    let tiene_precio = false;
    if (this.form_dato.programas[i_prog].insumos[i_insumo].precio_unitario) {
      tiene_precio = true;
    }
    if (this.form_dato.programas[i_prog].insumos[i_insumo].precio_unitario === null ) {
      tiene_precio = false;
    }
      let lote_temporal = {
                            id: null,
                            lote: '',
                            codigo_barras: '',
                            fecha_caducidad: '',
                            existencia: '',
                            precio_unitario: tiene_precio ? Number(this.form_dato.programas[i_prog].insumos[i_insumo].precio_unitario) : null,
                            importe: 0,
                            iva_importe: 0,
                            exclusivo: 1,
                            requerir_pu: tiene_precio ? false : true
                          };

      let start_index = 0;
      let number_of_elements_to_remove = 0;
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes.splice(start_index, number_of_elements_to_remove, lote_temporal);
  }

  initLote() {
    return this.fb.group({
      lote: ['UNICO', [Validators.required]],
      fecha_caducidad: [''],
      existencia: ['', [Validators.required]],
      precio_unitario: ['']
    })
  }

  agregar_lote(i?: number) {
    const a: FormArray = <FormArray>this.dato.controls.movimientos_articulos;
    const control: FormArray = <FormArray>a.controls[i];
    let lote: FormArray = <FormArray>control.controls['lotes'];
    if (!lote.controls)
      lote = this.fb.array([]);
    lote.controls.push(this.initLote());
  }

  quitar_lote(i, i2) {
    const a: FormArray = <FormArray>this.dato.controls.movimientos_articulos;
    const control: FormArray = <FormArray>a.at(i).get('lotes');
    control.removeAt(i2);
  }

  /**
   * Método para recargar el formulario.
   */
  reset_form() {
    this.form_dato = {
      id: '',
      clues: this.usuario.clues_activa.clues,
      almacen_id:	this.usuario.almacen_activo.id,
      estatus	:	'NOINICIALIZADO',
      fecha_inicio: '',
      fecha_fin: '',
      observaciones: '',
      usuario_id: this.usuario.id,
      cantidad_programas: 0,
      cantidad_claves: 0,
      cantidad_insumos: 0,
      cantidad_lotes: 0,
      monto_total: 0,
      programas: []
    };
    return true;
  }
  /**
   * Este método quita un formgrupo a un formarray, para crear un formulario dinamico
   * ejemplo <code>(click)="ctrl.quitar_form_array(ctrl.dato.controls.almacen_tipos_movimientos, i)"</code>
   * @param modelo Nombre del modelo donde se guarda el dato obtenido
   * @param i Posicion del elemento a eliminar
   * @return void
   */
  quitar_form_array(modelo, i: number, insumo?) {
    modelo.splice(i, 1);

    this.sumaTotal();

    if (insumo !== undefined && insumo && insumo !== '') {
      this.calcularSubtotal(this.i_programa, insumo);
    }
  }
  /**
   * Este método abre una modal
   * @param id identificador del elemento de la modal
   * @return void
   */
  abrirModal(id, programa?, insumo?, index?) {
    if (index !== undefined && index !== '' && index !== null) {
      this.index_borrar = index;
      this.index_insumo = insumo;
      this.index_programa = programa;
    }
    if (insumo !== undefined && insumo !== '' && insumo !== null) {
      this.index_insumo = insumo;
      this.index_programa = programa;
    }
    document.getElementById(id).classList.add('is-active');
  }

  /**
   * Este método cierra una modal.
   * @param id Identificador del elemento de la modal
   * @return void
   */
  cancelarModal(id) {
    document.getElementById(id).classList.remove('is-active');
    if (id === 'guardarMovimiento') {
      this.dato.controls.estatus.patchValue('NOINICIALIZADO');
    }
  }
  /**
   * Método que nos ayuda a comprobar que todos los campos de inicialización seean válidos, y a confirmar que se inicialice.
   */
  inicializar () {

    let txt;
    let person;
    let error_detener_envio = false;
    if (this.form_dato.clues === '' || this.form_dato.clues == null || this.form_dato.clues === undefined) {
      this.mensajeResponse.texto = 'Formulario no enviado';
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'warning';
      error_detener_envio = true;
    }
    if (this.form_dato.almacen_id === '' || this.form_dato.almacen_id == null || this.form_dato.almacen_id === undefined) {
      this.mensajeResponse.texto = 'Formulario no enviado';
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'warning';
      error_detener_envio = true;
    }
    if (this.form_dato.estatus === '' || this.form_dato.estatus == null || this.form_dato.estatus === undefined) {
      this.mensajeResponse.texto = 'Formulario no enviado';
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'warning';
      error_detener_envio = true;
    }
    if (this.form_dato.fecha_inicio === '' || this.form_dato.fecha_inicio == null || this.form_dato.fecha_inicio === undefined) {
      this.mensajeResponse.texto = 'Formulario no enviado';
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'warning';
      this.mensaje(2);
      error_detener_envio = true;
    }
    if (this.form_dato.fecha_fin === '' || this.form_dato.fecha_fin == null || this.form_dato.fecha_fin === undefined) {
      this.mensajeResponse.texto = 'Formulario no enviado. Completar la Fecha de fin ' + this.form_dato.fecha_fin;
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'warning';
      this.form_dato.fecha_fin = '';
      this.mensaje(2);
      error_detener_envio = true;
    }
    if (this.form_dato.usuario_id === '' || this.form_dato.usuario_id == null || this.form_dato.usuario_id === undefined) {
      this.mensajeResponse.texto = 'Formulario no enviado';
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'warning';
      this.mensaje(2);
      error_detener_envio = true;
    }
    if (this.form_dato.programas.length === 0) {
      this.mensajeResponse.texto = 'Debe agregar por lo menos un programa.';
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'warning';
      this.mensaje(2);
      error_detener_envio = true;
    }

    for (let p = 0; p < this.form_dato.programas.length; p++) {
      if (this.form_dato.programas[p].insumos.length === 0) {
        this.mensajeResponse.texto = 'Debe agregar por lo menos un insumo.';
        this.mensajeResponse.mostrar = true;
        this.mensajeResponse.clase = 'warning';
        this.mensaje(2);
        error_detener_envio = true;
        break;
      }
      for (let i = 0; i < this.form_dato.programas[p].insumos.length; i++) {
        if (this.form_dato.programas[p].insumos[i].lotes.length === 0) {
          this.mensajeResponse.texto = 'Debe agregar por lo menos un lote.';
          this.mensajeResponse.mostrar = true;
          this.mensajeResponse.clase = 'warning';
          this.mensaje(2);
          error_detener_envio = true;
          break;
        }
        for (let l = 0; l < this.form_dato.programas[p].insumos[i].lotes.length; l++) {
          if (this.form_dato.programas[p].insumos[i].lotes[l].lote === '' ||
          this.form_dato.programas[p].insumos[i].lotes[l].lote == null ||
          this.form_dato.programas[p].insumos[i].lotes[l].lote === undefined) {
            this.mensajeResponse.texto = 'Error en ' + `<strong> lote </strong>` + ' del insumo: '
                                        + `<strong> ` + this.form_dato.programas[p].insumos[i].clave_insumo_medico + ` </strong>` 
                                        + this.form_dato.programas[p].insumos[i].descripcion
                                        + '. Del programa ' + `<strong> ` + this.form_dato.programas[p].nombre + `</strong> `;
            this.mensajeResponse.mostrar = true;
            this.mensajeResponse.clase = 'warning';
            this.mensaje(2);
            error_detener_envio = true;
            break;
          }
          if (this.form_dato.programas[p].insumos[i].lotes[l].fecha_caducidad === '' ||
              this.form_dato.programas[p].insumos[i].lotes[l].fecha_caducidad == null ||
              this.form_dato.programas[p].insumos[i].lotes[l].fecha_caducidad === undefined) {
                this.mensajeResponse.texto = 'Error en ' + `<strong> fecha de caducidad </strong>` + ' del insumo: '
                                              + this.form_dato.programas[p].insumos[i].descripcion
                                              +  '. Del programa ' + `<strong> ` + this.form_dato.programas[p].nombre + `</strong> `;
                this.mensajeResponse.mostrar = true;
                this.mensajeResponse.clase = 'warning';
                this.mensaje(2);
                error_detener_envio = true;
                break;
          }
          if (this.form_dato.programas[p].insumos[i].lotes[l].existencia === '' ||
              this.form_dato.programas[p].insumos[i].lotes[l].existencia == null ||
              this.form_dato.programas[p].insumos[i].lotes[l].existencia === 0 ||
              this.form_dato.programas[p].insumos[i].lotes[l].existencia === undefined) {
                this.mensajeResponse.texto = 'Error en existencia del insumo: ' + this.form_dato.programas[p].insumos[i].descripcion +
                  '. Del programa ' + `<strong> ` + this.form_dato.programas[p].nombre + `</strong> `;
                this.mensajeResponse.mostrar = true;
                this.mensajeResponse.clase = 'warning';
                this.mensaje(2);
                error_detener_envio = true;
                break;
          }
          if (this.form_dato.programas[p].insumos[i].lotes[l].precio_unitario === '' ||
              this.form_dato.programas[p].insumos[i].lotes[l].precio_unitario == null ||
              this.form_dato.programas[p].insumos[i].lotes[l].precio_unitario === undefined ||
              isNaN(this.form_dato.programas[p].insumos[i].lotes[l].precio_unitario)) {
                this.mensajeResponse.texto = 'Error en precio unitario del insumo: ' + this.form_dato.programas[p].insumos[i].descripcion +
                  '. Del programa ' + this.form_dato.programas[p].nombre;
                this.mensajeResponse.mostrar = true;
                this.mensajeResponse.clase = 'warning';
                this.mensaje(2);
                error_detener_envio = true;
                break;
          }

        }
      }
    }
    if (error_detener_envio === true) {
      this.mensajeResponse.texto = 'Completar los datos requeridos';
      this.mensajeResponse.mostrar = true;
      this.mensajeResponse.clase = 'error';
      this.mensaje(3);
    } else {
      person = prompt('Por favor ingresa la palabra INICIALIZAR, para continuar:', '');
      if (person === 'INICIALIZAR') {
        // Si es válido, igualar
        this.form_dato.estatus = 'INICIALIZADO';  // y llamar a la función
        this.enviar();
          txt = 'User cancelled the prompt.';
      } else {
        this.mensajeResponse.texto = 'Formulario no enviado';
        this.mensajeResponse.mostrar = true;
        this.mensajeResponse.clase = 'warning';
      }
    }
  }


  /**
   * Método para refrescar la pagina y si tiene id, hace la peticion a la API, para cargar los datos.
   */
  actualizar() {
    if (this.tieneid){
      this.cargarDatos(this.form_dato.id);
    }
  }

  /**
   * Método para enviar el modelo a la API según si es para crear un nuevo registro o para actualizarlo.
   */
  enviar() {
    if (this.form_dato.id) {
      this.actualizarDatos(this.form_dato.id);
    } else {
      this.guardarDatos();
    }
  }
  /**
   * Metodo que envia la peticion a la API para crear un nuevo registro.
   */
  guardarDatos() {
    let editar = '/inventario/iniciar-inventario';
    this.cargando = true;
    this.crudService.crear(this.form_dato, 'inicializar-inventario-me').subscribe(
      resultado => {
        this.cargando = false;

        this.form_dato.id = resultado.id;
        if (this.form_dato.estatus === 'NOINICIALIZADO') {
            this.router.navigate(['/inventario/iniciar-inventario/editar', resultado.id]);
            this.cargarDatos(resultado.id);
        }

        this.mensajeResponse.texto = 'Se han guardado los cambios.';
        this.mensajeResponse.mostrar = true;
        this.mensajeResponse.clase = 'success';
        this.mensaje(2);

      },
      error => {
        this.form_dato.estatus = 'NOINICIALIZADO';
        this.cargando = false;
        if (error.status === 500) {
            this.form_dato.estatus = 'NOINICIALIZADO';
            this.mensajeResponse.texto = '500 (Error interno del servidor)';
            this.mensajeResponse.mostrar = true;
            this.mensajeResponse.clase = 'error';
            this.mensaje(3);
        }

        try {
            let e = error.json();
            if (error.status === 401) {
                this.mensajeResponse.texto = 'No tiene permiso para hacer esta operación.';
            }
            // Problema de validación
            if (error.status === 409) {
                try {
                    for (let input in e.error) {
                        if (e.error.hasOwnProperty(input)) {
                            for (let i in e.error[input]) {
                                if (e.error[input].hasOwnProperty(i)) {
                                    for (let a in e.error[input][i]) {
                                        if (e.error[input][i].hasOwnProperty(a)) {
                                            this.mensajeResponse.titulo = a;
                                            this.mensajeResponse.texto = e.error[input][i][a];
                                            this.mensajeResponse.clase = 'error';
                                            this.mensaje(3);
                                        } else {
                                            this.mensajeResponse.titulo = input;
                                            this.mensajeResponse.texto = e.error[input][i];
                                            this.mensajeResponse.clase = 'error';
                                            this.mensaje(3);
                                        }
                                    }
                                }
                            }
                        }
                        // Iteramos todos los errores
                        /* for (var i in e.error[input]) {
                            this.mensajeResponse.titulo = input;
                            this.mensajeResponse.texto = e.error[input][i];
                            this.mensajeResponse.clase = 'error';
                            this.mensaje(3);
                        }*/
                    }
                } catch (e) {
                    this.mensajeResponse.texto = 'Por favor verfique los campos marcados en rojo.';
                    this.mensajeResponse.clase = 'warning';
                    this.mensaje(8);
                }
            }
        } catch (e) {
            this.mensajeResponse.texto = 'No especificado.';
            this.mensajeResponse.mostrar = true;
            this.mensajeResponse.clase = 'error';
            this.mensaje(3);
            console.log(e);

            if (error.status == 500) {
                this.mensajeResponse.texto = '500 (Error interno del servidor)';
            } else {
                this.mensajeResponse.texto = 'No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.';
            }
        }

      }
    )
  }
  
  /**
     * Este método envia los datos para actualizar un elemento con el id
     * que se envia por la url
     * @return void
     */
    actualizarDatos(id) {
      let editar = '/inventario/iniciar-inventario';
      this.cargando = true;

      this.crudService.editar(id, this.form_dato, 'inicializar-inventario-me').subscribe(
           resultado => {
              this.reset_form();
              if (resultado.estatus === 'INICIALIZADO') {
                  this.router.navigate([editar]);
              }
              if (resultado.estatus === 'NOINICIALIZADO') {
                  this.router.navigate(['/inventario/iniciar-inventario/editar', resultado.id]);
                  this.cargarDatos(resultado.id);
              }
              this.cargando = false;

              this.mensajeResponse.texto = 'Se han guardado los cambios.';
              this.mensajeResponse.mostrar = true;
              this.mensajeResponse.clase = 'success';
              this.mensaje(2);
          },
          error => {
              this.cargando = false;

              this.form_dato.estatus = 'NOINICIALIZADO';
              this.mensajeResponse.texto = '500 (Error interno del servidor)';
              this.mensajeResponse.mostrar = true;
              this.mensajeResponse.clase = 'error';
              this.mensaje(2);
              try {
                  let e = error.json();
                  if (error.status == 401) {
                      this.mensajeResponse.texto = 'No tiene permiso para hacer esta operación.';
                      this.mensajeResponse.clase = 'error';
                      this.mensaje(2);
                  }
                  // Problema de validación
                  if (error.status == 409) {
                      this.mensajeResponse.texto = 'Por favor verfique los campos marcados en rojo.';
                      this.mensajeResponse.clase = 'error';
                      this.mensaje(8);
                      for (let input in e.error) {
                          // Iteramos todos los errores
                          for (let i in e.error[input]) {
                              this.mensajeResponse.titulo = input;
                              this.mensajeResponse.texto = e.error[input][i];
                              this.mensajeResponse.clase = 'error';
                              this.mensaje(3);
                          }
                      }
                  }
              } catch (e) {
                  if (error.status == 500) {
                      this.mensajeResponse.texto = '500 (Error interno del servidor)';
                  } else {
                      this.mensajeResponse.texto = 'No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.';
                  }
                  this.mensajeResponse.clase = 'error';
                  this.mensaje(2);
              }

          }
      );
  }

  /**
     * Este método carga los datos de un elemento de la api con el id que se pase por la url
     * en la api, abre una ventana modal para confirmar la acción
     * @return void
     */
    cargarDatos(id) {
      if (this.reset_form()) {
          try {
              this.cargando = true;

              this.crudService.ver(id, 'inicializar-inventario-me').subscribe(
                  resultado => {
                    this.form_dato = resultado;
                      this.cargando = false;
                      this.cargarInventario = false;

                      if (resultado.programas) {
                        if (resultado.programas.length > 0) {
                          this.i_programa = 0;
                          for ( let i = 0; i < resultado.programas.length; i++) {
                            if (resultado.programas[i].insumos.length > 0) {
                              for ( let j = 0; j < resultado.programas[i].insumos.length; j++) {
                                this.calcularSubtotal(i, j);
                                for ( let l = 0; l < resultado.programas[i].insumos[j].lotes.length; l++) {
                                  this.form_dato.programas[i].insumos[j].lotes[l].exclusivo = Number(this.form_dato.programas[i].insumos[j].lotes[l].exclusivo);
                                  if (this.form_dato.programas[i].insumos[j].lotes[l].existencia === 0 ||
                                      this.form_dato.programas[i].insumos[j].lotes[l].existencia === '0') {
                                      this.form_dato.programas[i].insumos[j].lotes[l].existencia = '';
                                  }
                                  if (this.form_dato.programas[i].insumos[j].lotes[l].fecha_caducidad === '0000-00-00') {
                                      this.form_dato.programas[i].insumos[j].lotes[l].fecha_caducidad = '';
                                  }
                                  if (this.form_dato.programas[i].insumos[j].lotes[l].precio_unitario === null) {
                                      this.form_dato.programas[i].insumos[j].lotes[l].requerir_pu = true;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      this.form_dato.fecha_fin = this.fecha_actual;
                            this.sumaTotal();

                      this.mensajeResponse.titulo = 'Modificar';
                      this.mensajeResponse.texto = 'Los datos se cargaron';
                      this.mensajeResponse.clase = 'success';
                      this.mensaje(2);
                  },
                  error => {
                      this.cargando = false;
                      this.cargarInventario = false;

                      this.mensajeResponse = new Mensaje(true);
                      this.mensajeResponse = new Mensaje(true);
                      this.mensajeResponse.mostrar;

                      try {
                          let e = error.json();
                          if (error.status == 401) {
                              this.mensajeResponse.texto = 'No tiene permiso para hacer esta operación.';
                              this.mensajeResponse.clase = 'success';
                              this.mensaje(2);
                          }

                      } catch (e) {

                          if (error.status == 500) {
                              this.mensajeResponse.texto = '500 (Error interno del servidor)';
                          } else {
                              this.mensajeResponse.texto = 'No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.';
                          }
                          this.mensajeResponse.clase = 'error';
                          this.mensaje(2);
                      }

                  }
              );
          } catch (e) {
              console.log(0, e);
          }
        }
  }
/**************************************NOTIFICATIONS******************************* */
/**
   * Este método muestra los mensajes resultantes de los llamados de la api
   * @param cuentaAtras numero de segundo a esperar para que el mensaje desaparezca solo
   * @param posicion  array de posicion [vertical, horizontal]
   * @return void
   */
  mensaje(cuentaAtras: number = 6, posicion: any[] = ['bottom', 'left']): void {
    let objeto = {
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: this.mensajeResponse.texto.length
    };

    this.options = {
        position: posicion,
        // timeOut: cuentaAtras * 1000,
        timeOut: 0,
        lastOnBottom: true
    };
    if (this.mensajeResponse.titulo === '') {
        this.mensajeResponse.titulo = 'Inicialización de inventario';
      }
    if (this.mensajeResponse.clase === 'alert') {
        this.notificacion.alert(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);
      }
    if (this.mensajeResponse.clase === 'success') {
        this.notificacion.success(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);
      }
    if (this.mensajeResponse.clase === 'info') {
        this.notificacion.info(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);
      }
    if (this.mensajeResponse.clase === 'warning' || this.mensajeResponse.clase === 'warn') {
        this.notificacion.warn(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);
      }
    if (this.mensajeResponse.clase === 'error' || this.mensajeResponse.clase === 'danger') {
        this.notificacion.error(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);
      }
  }

  /*************************************IMPRESION DE REPORTES******************************** */

  /**
   *  Método que permite imprimir la salida manual de medicamentos por PDF.
   */
  imprimir() {
    try {
      this.cargandoPdf = true;
      let impresion_inicializacion = {
        datos: this.form_dato,
        programas: this.form_dato.programas,
        usuario: this.usuario
      };
      this.pdfworker.postMessage(JSON.stringify(impresion_inicializacion));
    } catch (e) {
      this.cargandoPdf = false;
    }
  }

  base64ToBlob( base64, type ) {
      let bytes = atob( base64 ), len = bytes.length;
      let buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( var i = 0 ; i < len ; i++ )
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type: type } );
  }
}