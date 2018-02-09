import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

import { CrudService } from '../../../crud/crud.service';
import * as moment from 'moment';
import  * as FileSaver    from 'file-saver';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';

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
  cargarInventario = true;
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

  cargando: boolean = false;
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
    private notificacion: NotificationsService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private _ngZone: NgZone) { }

  ngOnInit() {
    // obtener los datos del usiario logueado almacen y clues
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

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

    this.dato = this.fb.group({
      id:	[''],
      clues:	[this.usuario.clues_activa.clues, Validators.required],
      almacen_id:	[this.usuario.almacen_activo.id, Validators.required],
      estatus	:	['NOINICIALIZADO'],
      fecha_inicio: [''],
      fecha_fin: [''],
      observaciones: [''],
      usuario_id: [this.usuario.id, Validators.required],
      programas: this.fb.array([ ]),
      movimientos_articulos: this.fb.array([]),
    });
    this.cargarCatalogo('programa', 'lista_programas', 'estatus');
    this.agregarPrograma();
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
      this.fecha_actual = this.form_dato.fecha_inicio;
      this.form_dato.fecha_fin = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
    }
    this.cargarDatos();

    /* **********************IMPRIMIR******************************* */
        // Inicializamos el objeto para los reportes con web Webworkers
        this.pdfworker = new Worker('web-workers/inventario/lista-inicializacion.js');

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

  iniciarPrograma() {
        this.form_dato.programas.push({
            'id': '',
            'nombre': '',
            'clave': '',
            'insumos': []
    });
  }
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
   * Método para inciar el formulario reactivo del array de programas
   */
  arrayPrograma(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      insumos: this.fb.array([ ]),
    });
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
   * Método para agregar programas al formulario reactivo
   */
  agregarPrograma(): void {
    const programas = this.dato.get('programas') as FormArray;
    programas.push(this.arrayPrograma());
  }

  /**
   * Método para agregar programas al formulario reactivo
   */
  agregarInsumo(i): void {
    /*** Forma para agregar a reactivo ***/
    // const insumos = this.dato.controls.programas['controls'][0].get('insumos') as FormArray;
    // insumos.insert(0, this.arrayInsumos());
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
      subtotal: '',
      lotes: []
    };

    if (!existe) {
      let start_index = 0;
      let number_of_elements_to_remove = 0;
      this.form_dato.programas[i].insumos.splice(start_index, number_of_elements_to_remove, ob_temporal);
      // this.form_dato.programas[i].insumos.push(ob_temporal);
      // this.form_dato.programas[i].insumos.reverse();
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
  seleccionarPrograma() {
    let programa_id = (<HTMLInputElement>document.getElementById('programa_agregado')).value;
    for (let p = 0; p < this.form_dato.programas.length; p++) {
      if (String(this.form_dato.programas[p].id) === programa_id) {
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
          this.i_programa = this.form_dato.programas.length-1;
          // this.seleccionarPrograma(this.form_dato.programas.length-1);
          break;
        }
      }
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
      clearTimeout(this.time_cambio_cantidad_stoc);
      this.time_cambio_cantidad_stoc = setTimeout(() => {
        this.calcular_importes(item, i_prog, i_insumo, i_lote);
        this.calcularSubtotal(i_prog, i_insumo);
      }, 800);
    }
  }

    /**
   * Método para calcular subtotal del insumo.
   * @param item Variable que contiene el objeto del insumo al que pertenece el precio y la existencia.
   * @param pos Contiene la posición del arreglo a la que se agregará la existencia.
   */
  calcular_importes (item, i_prog, i_insumo, i_lote) {
    if (item.precio_unitario === '' || item.precio_unitario == null) {
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i_lote].importe = 0;
    } if (item.existencia  === '' || item.existencia == null) {
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes[i_lote].importe = 0;
    } else {
      let temporal = item.existencia * item.precio_unitario;
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
      let lote_temporal = {
                            id: null,
                            lote: '',
                            codigo_barras: '',
                            fecha_caducidad: '',
                            existencia: '',
                            precio_unitario: '',
                            importe: 0,
                            iva_importe: 0
                          };

      // this.form_dato.programas[i_prog].insumos[i_insumo].lotes.push(lote_temporal);
      // this.form_dato.programas[i_prog].insumos[i_insumo].lotes.reverse();

      let start_index = 0;
      let number_of_elements_to_remove = 0;
      this.form_dato.programas[i_prog].insumos[i_insumo].lotes.splice(start_index, number_of_elements_to_remove, lote_temporal);
  }

  /**
   * 
   * @param iniciar
   */
  cargarArticulos(iniciar = '') {
    this.reset_form();
    this.cargando = true;
    this.dato.controls.tipos_movimientos_id.patchValue(7);
    this.dato.controls.status_movimientos_id.patchValue(1);
    let url = 'articulos-stock-inicial';
    if (iniciar !== '') {
      url += '?iniciar';
    }
    this.json_articulos = [];
    document.getElementById('cerra_restablecer').click();
    this.crudService.lista(0, 0, url).subscribe(
      resultado => {
        let c = 0;
        this.json_articulos = resultado.data;
        this.json_articulos.forEach(element => {
          element.contador = c;
          let categorias = element.categorias;
          if (!element.categorias){
            categorias = { 'nombre': 'Sin categoria' };
          }
          element.categorias = categorias;
          this.cat[c] = false;
          c++;
        });
        c = 0;
        resultado.data.forEach(item => {
          item.precio_venta = '';
          item.contador = c;
          item.lotes = this.fb.array([]);

          const a: FormArray = <FormArray>this.dato.controls.movimientos_articulos;
          a.controls.push(this.fb.group(item));
          this.agregar_lote(c);
          c++;
        });

        this.cargando = false;
      },
      error => {
        this.cargando = false;
      }
    );
  }
  guardarDatos(regresar, reset_form) {

    this.cargando = true;
    this.guardado = false;
    this.error = false;
    let json = this.dato.getRawValue();
    this.crudService.crear(json, 'articulos-stock-inicial').subscribe(
      resultado => {
        this.guardado = true;
        setTimeout(()=> {
          this.guardado = false;
        }, 2500);
        this.cargarArticulos();
      },
      error => {
        this.error = true;
        setTimeout(()=> {
          this.error = false;
        }, 3000);
      }
    );
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

  reset_form() {
    this.dato.reset();
    for (let item in this.dato.controls) {
        const ctrl = <FormArray>this.dato.controls[item];
        if (ctrl.controls) {
            if (typeof ctrl.controls.length == 'number') {
                while (ctrl.length) {
                    ctrl.removeAt(ctrl.length - 1);
                }
                ctrl.reset();
            }
        }
    }
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
      this.dato.controls.estatus.patchValue('BR');
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
      this.mensajeResponse.texto = 'Formulario no enviado. Completar la Fecha de inicio ' + this.form_dato.fecha_fin;
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
            this.mensajeResponse.texto = 'Error en lote del insumo: ' + this.form_dato.programas[p].insumos[i].descripcion + '. Del programa ' + this.form_dato.programas[p].nombre;
            this.mensajeResponse.mostrar = true;
            this.mensajeResponse.clase = 'warning';
            this.mensaje(2);
            error_detener_envio = true;
            break;
          }
          if (this.form_dato.programas[p].insumos[i].lotes[l].fecha_caducidad === '' ||
          this.form_dato.programas[p].insumos[i].lotes[l].fecha_caducidad == null ||
          this.form_dato.programas[p].insumos[i].lotes[l].fecha_caducidad === undefined) {
            this.mensajeResponse.texto = 'Error en fecha de caducidad del insumo: ' + this.form_dato.programas[p].insumos[i].descripcion +
              '. Del programa ' + this.form_dato.programas[p].nombre;
            this.mensajeResponse.mostrar = true;
            this.mensajeResponse.clase = 'warning';
            this.mensaje(2);
            error_detener_envio = true;
            break;
          }
          if (this.form_dato.programas[p].insumos[i].lotes[l].existencia === '' ||
          this.form_dato.programas[p].insumos[i].lotes[l].existencia == null ||
          this.form_dato.programas[p].insumos[i].lotes[l].existencia === undefined) {
            this.mensajeResponse.texto = 'Error en existencia del insumo: ' + this.form_dato.programas[p].insumos[i].descripcion +
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
   * Metodo que envia la peticion a la API para crear un nuevo registro.
   */
  enviar() {
    this.cargando = true;
    this.crudService.crear(this.form_dato, 'inicializar-inventario-me').subscribe(
      resultado => {
        this.cargando = false;
        console.log(this.form_dato);
        this.form_dato.id = resultado.id;
        console.log(this.form_dato);
        // if (regresar) {
        //     this.location.back();
        // }
        // if (editar && json.estatus === 'BR') {
        //     this.router.navigate([editar, resultado.id]);
        // }
        // if (editar && json.estatus === 'FI') {
        //     this.router.navigate([editar]);
        // }

        this.mensajeResponse.texto = 'Se han guardado los cambios.';
        this.mensajeResponse.mostrar = true;
        this.mensajeResponse.clase = 'success';
        this.mensaje(2);

      },
      error => {
        this.cargando = false;
        if (error.status === 500) {
            this.mensajeResponse.texto = '500 (Error interno del servidor)';
            this.mensajeResponse.mostrar = true;
            this.mensajeResponse.clase = 'error';
            this.mensaje(3);
        }

        try {
            let e = error.json();
            if (error.status == 401) {
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
     * Este método carga los datos de un elemento de la api con el id que se pase por la url
     * en la api, abre una ventana modal para confirmar la acción
     * @return void
     */
    cargarDatos() {
          try {
              this.cargando = true;

              this.crudService.verIniciar('inicializar-inventario-me').subscribe(
                  resultado => {
                    this.form_dato = resultado;
                    console.log(this.form_dato);
                    console.log('Resultado', resultado);
                      this.cargando = false;
                      this.cargarInventario = false;

                      if (resultado.programas) {
                        if (resultado.programas.length > 0) {
                          this.i_programa = 0;
                          for ( let i = 0; i< resultado.programas.length; i++) {
                            if (resultado.programas[i].insumos.length > 0) {
                              for ( let j = 0; j< resultado.programas[i].insumos.length; j++) {
                                this.calcularSubtotal(i, j);
                              }
                            }
                          }
                        }
                      }
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
        timeOut: cuentaAtras * 1000,
        lastOnBottom: true
    };
    if (this.mensajeResponse.titulo === '') {
        this.mensajeResponse.titulo = 'Entradas de almacén';
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
      for ( var i=0 ; i < len ; i++ )
      view[i] = bytes.charCodeAt(i) & 0xff;
      return new Blob( [ buffer ], { type: type } );
  }
}