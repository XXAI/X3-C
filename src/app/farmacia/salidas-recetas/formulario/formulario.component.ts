import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';
import { NotificationsService } from 'angular2-notifications';

import  * as FileSaver    from 'file-saver'; 

@Component({
  selector: 'salidas-recetas-formulario',
  templateUrl: './formulario.component.html',
  styles: ['ngui-auto-complete {z-index: 999999 !important}']
})

export class FormularioComponent {
  dato: FormGroup;
  form_insumos: any;
  form_movimiento_metadato: any;
  tab: number = 1;
  cargando = false;
  unidad_medida;
  presentacion_nombre;
  sum_cant_lotes = false;
  public insumos_term = `${environment.API_URL}/insumos-auto?term=:keyword`;


  MinDate = new Date();
  MaxDate = new Date();
  fecha_actual;
  mostrarCancelado = false;
  tieneid = false;

  fecha_receta;
  fecha_movimiento;

  // # SECCION: Reportes
  pdfworker: Worker;
  cargandoPdf = false;
  // # FIN SECCION

  tipos_recetas: any[] = [
                            { id: 1, nombre: 'Normal'},
                            { id: 2, nombre: 'Controlado'}
                          ];


  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  objeto = {
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 2000
  };
  mostrar_lote = [];

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private notificacion: NotificationsService,
    private _ngZone: NgZone) { }

  ngOnInit() {

    // obtener los datos del usiario logueado almacen y clues
    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario.clues_activa) {
      this.insumos_term += '&clues=' + usuario.clues_activa.clues;
    }
    if (usuario.almacen_activo) {
      this.insumos_term += '&almacen=' + usuario.almacen_activo.id;
    }

    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker('web-workers/farmacia/movimientos/receta.js')

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
      // open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
    };

    // inicializar el formulario reactivo
    this.dato = this.fb.group({
      id: [''],
      tipo_movimiento_id: ['5', [Validators.required]],
      status: ['FI'],
      fecha_movimiento: ['', [Validators.required]],
      observaciones: [''],
      cancelado: [''],
      observaciones_cancelacion: [''],
      movimiento_metadato: this.fb.group({
        turno_id: ['', [Validators.required]]
      }),
      receta: this.fb.group({
        id: [''],
        folio: ['', [Validators.required]],
        tipo_receta: [''],
        fecha_receta: ['', [Validators.required]],
        doctor: ['', [Validators.required]],
        paciente: ['', [Validators.required]],
        diagnostico: ['', [Validators.required]],
        imagen_receta: [''],
        servidor_id: [''],
        movimiento_id: [''],
        incremento: [''],
        tipo_receta_id: ['1', [Validators.required]],
        fecha_surtido: [''],
        folio_receta: [''],
        usuario_id: [''],
        receta_detalles: this.fb.array([])
      }),
      insumos: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });

    // variable para crear el array del formulario reactivo
    this.form_insumos = {
      tipo_movimiento_id: ['', [Validators.required]]
    };

    // inicializar el data picker minimo y maximo
    var date = new Date();

    this.MinDate = new Date(date.getFullYear() - 1, 0, 1);
    this.MaxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // si es nuevo poner la fecha actual si no poner la fecha con que se guardo
    if (!this.dato.get('fecha_movimiento').value) {
      this.fecha_actual = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
      this.dato.get('fecha_movimiento').patchValue(this.fecha_actual);
    } else {
      this.fecha_actual = this.dato.get('fecha_movimiento').value;
    }

    // Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById('catalogos').click();
  }

  /**
     * Este método abre una modal
     * @param id identificador del elemento de la modal
     * @return void
     */
  abrirModal(id) {
    document.getElementById(id).classList.add('is-active');
  }

  /**
     * Este método cierra una modal
     * @param id identificador del elemento de la modal
     * @return void
     */
  cancelarModal(id) {
    document.getElementById(id).classList.remove('is-active');
  }
  lotes_insumo;
  /**
     * Este método formatea los resultados de la busqueda en el autocomplte
     * @param data resultados de la busqueda 
     * @return void
     */
  autocompleListFormatter = (data: any) => {
    let html = `
    <div class="card">
      <div class="card-content">
        <div class="media">          
          <div class="media-content">
            <p class="title is-4">${data.descripcion}</p>
            <p class="subtitle is-6">
              <strong>Clave: </strong> ${data.clave}
              `;
    
              if(data.es_causes == 1)
              html += `<label class="tag is-success" ><strong>Cause </strong></label>`;
              if(data.es_causes == 0)
              html += `<label class="tag" style="background: #B8FB7E; border-color: #B8FB7E; color: rgba(0,0,0,0.7);" ><strong>No Cause </strong> </label>`; 
              if(data.es_unidosis == 1)                                                                 
              html += `<label class="tag is-warning" ><strong>Unidosis</strong> </label>`;
              
    html += `
            </p>
          </div>
        </div>
      </div>
    </div>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  insumo;
  es_unidosis = false;
  /**
     * Este método carga los datos de un elemento de la api con el id que se pase por la url
     * @param data json con los datos del objetop seleccionado del autocomplete
     * @return void
     */
  select_insumo_autocomplete(data) {

    var usuario = JSON.parse(localStorage.getItem('usuario'));
    this.cargando = true;
    // cargar los datos de los lotes del insumo seleccionado en el autocomplete
    this.crudService.lista(0, 1000, 'comprobar-stock?almacen=' + usuario.almacen_activo.id + '&clave=' + data.clave).subscribe(
      resultado => {

        this.lotes_insumo = resultado;
        this.insumo = data;

        //limpiar el autocomplete
        (<HTMLInputElement>document.getElementById('buscarInsumo')).value = '';

        //poner el titulo a la modal
        document.getElementById('tituloModal').innerHTML = ` ${data.descripcion} <br>
          <p aling="justify" style="font-size:12px">CANTIDAD POR ENVASE: ${data.cantidad_x_envase}</p> `;
        this.es_unidosis = data.es_unidosis;
        this.unidad_medida = data.unidad_medida;
        this.presentacion_nombre = data.presentacion_nombre;
        this.cargando = false;
        this.abrirModal('verLotes');
      },
      error => {
        this.cargando = false;
      }
    );
  }

  /**
     * Este método agrega los lostes del modal a el modelo que se envia a la api
     * @return void
     */
  agregarLoteIsumo() {
    //obtener el formulario reactivo para agregar los elementos
    const control = <FormArray>this.dato.controls['insumos'];

    //crear el json que se pasara al formulario reactivo tipo insumos
    var lotes = {
      'clave': this.insumo.clave,
      'nombre': this.insumo.nombre,
      'descripcion': this.insumo.descripcion,
      'es_causes': this.insumo.es_causes,
      'es_unidosis': this.insumo.es_unidosis,
      'cantidad': 1,
      'cantidad_x_envase': parseInt(this.insumo.cantidad_x_envase),
      'dosis': ['', [Validators.required]],
      'frecuencia': ['', [Validators.required]],
      'duracion': ['', [Validators.required]],
      'cantidad_recetada': ['', [Validators.required]],
      'cantidad_surtida': 1,
      'unidad_medida': this.unidad_medida,
      'presentacion_nombre': this.presentacion_nombre,
      'lotes': this.fb.array([])
    };

    // comprobar que el isumo no este en la lista cargada
    var existe = false;
    for (let item of control.value) {
      if (item.clave === this.insumo.clave) {
        existe = true;
        break;
      }
    }
    // si no esta en la lista agregarlo
    if (!existe) {
      control.push(this.fb.group(lotes));
    }

    // obtener la ultima posicion para que en esa se agreguen los lostes
    var posicion = control.length - 1;
    // obtener el control del formulario en la posicion para agregar el nuevo form array que corresponde a los lotes
    const ctrlLotes = <FormArray>control.controls[posicion];
    // Mostrar ocultar los lotes en la vista al hacer clic en el icono de plus
    this.mostrar_lote[posicion] = false;

    var objeto = {
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      maxLength: 2000
    };
    this.options = {
      position: ['top', 'right'],
      timeOut: 5000,
      lastOnBottom: true
    };
    //recorrer la tabla de lotes del modal para obtener la cantidad 
    for (let item of this.lotes_insumo) {
      //agregar unicamente aquellos que tiene cantidad
      if (item.cantidad > 0) {
        var existe_lote = false;

        //si existe el isnumo validar que el lote no exista
        if (existe) {
          for (let l of ctrlLotes.controls['lotes'].controls) {
            //si el lote existe agregar unicamente la cantidad nueva
            if (l.controls.id.value == item.id) {
              existe_lote = true;
              //agregar la cantida nueva al lote
              let cantidad_lote: number = l.controls.cantidad.value + item.cantidad;
              
              //Si es nuevo entonces igualar la cantidad a la existencia
              if(item.nuevo){
                item.existencia = item.cantidad * 1;
              }

              //validar que la cantidad escrita no sea mayor que la existencia si no poner la existencia como la cantidad maxima      
              if (cantidad_lote > l.controls.existencia.value && item.nuevo == 0) {
                this.notificacion.alert('Cantidad Excedida', 'La cantidad maxima es: ' + l.controls.existencia.value, objeto);
                cantidad_lote = l.controls.existencia.value * 1;
              }
              l.controls.cantidad.patchValue(cantidad_lote);
              break;
            }
          }
        }
        //si el lote no existe agregarlo
        if (!existe_lote) {
          //Si es nuevo entonces igualar la cantidad a la existencia
          if(item.nuevo){
            item.existencia = item.cantidad * 1;
          }

          //validar que la cantidad escrita no sea mayor que la existencia si no poner la existencia como la cantidad maxima        
          if (item.cantidad > item.existencia) {
            this.notificacion.alert('Cantidad Excedida', 'La cantidad maxima es: ' + item.existencia, objeto);
            item.cantidad = item.existencia * 1;
          }

          //agregar al formulario reactivo de lote
          ctrlLotes.controls['lotes'].push(this.fb.group(
            {
              id: item.id,
              nuevo: item.nuevo | 0,
              codigo_barras: item.codigo_barras ? item.codigo_barras : '' ,
              lote: item.lote,
              fecha_caducidad: item.fecha_caducidad,
              existencia: item.nuevo ? item.cantidad : item.existencia,
              cantidad: item.cantidad
            }
          ));
        }
      }
    }
    //sumamos las cantidades de los lotes
    let cantidad: number = 0;
    for (let l of ctrlLotes.controls['lotes'].value) {
      cantidad = cantidad + l.cantidad;
    }
    //agregar la cantidad surtida
    ctrlLotes.controls['cantidad_surtida'].patchValue(cantidad);
    this.cancelarModal('verLotes');
    this.sum_cant_lotes = false;
  }
  /**
     * Este método agrega una nueva fila para los lotes nuevos
     * @param posicion Posicion a mostrar el detalle de lotes
     * @return void
     */
  ver_lotes_asignados(posicion) {
    this.mostrar_lote[posicion] = !this.mostrar_lote[posicion];
  }
  /**
     * Este método agrega una nueva fila para los lotes nuevos
     * @return void
     */
  agregarNuevoLote() {
    this.lotes_insumo.push({ 
      id: '' + Math.floor(Math.random() * (999)) + 1, 
      codigo_barras: '', lote: '', fecha_caducidad: '', existencia: '', 
      cantidad: '', nuevo: 1, existencia_unidosis: '', cantidad_unidosis: '' });
  }

  /**
     * Este método elimina los lotes nuevos que se agregaron a la lista de lotes
     * @return void
     */
  eliminarLote(index: number) {
    this.lotes_insumo.splice(index, 1);
  }

  /**
     * Este método quita un lote del la lista de insumos
     * @param i Posicion del insumo en la lista
     * @param val Object con los datos del lote
     * @param i2 Posicion del lote en la lista de lotes
     * @return void
     */
  quitar_lote_insumo(i, val, i2) {

    const control = <FormArray>this.dato.controls['insumos'];
    const ctrlLotes = <FormArray>control.controls[i];

    const ctrlLotesLote = <FormArray>ctrlLotes.controls['lotes'];

    ctrlLotesLote.removeAt(i2);

    var cantidad = ctrlLotes.controls['cantidad_surtida'].value - val.cantidad;
    ctrlLotes.controls['cantidad_surtida'].patchValue(cantidad);
  }

  /**
     * Este método valida que la cantidad escrita en el lote por listado de isnumos sea menor que la existencia
     * @param i Posicion del insumo en la lista
     * @param val Object con los datos del lote
     * @param i2 Posicion del lote en la lista de lotes
     * @return void
     */
  validar_cantidad_lote(i, val, i2) {
    if (val.controls.cantidad.value > val.controls.existencia.value && val.nuevo == 0) {
      var objeto = {
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 2000
      };
      this.notificacion.alert('Cantidad Excedida', 'La cantidad maxima es: ' + val.controls.existencia.value, objeto);
      val.controls.cantidad.patchValue(val.controls.existencia.value * 1);
    }
    //sumamos las cantidades de los lotes
    const control = <FormArray>this.dato.controls['insumos'];
    const ctrlLotes = <FormArray>control.controls[i];
    let cantidad: number = 0;
    for (let l of ctrlLotes.controls['lotes'].value) {
      cantidad = cantidad + l.cantidad;
    }
    ctrlLotes.controls['cantidad_surtida'].patchValue(cantidad);
  }

  comprobar_cant_lotes() {
    let cantidad = 0;
    for (let l of this.lotes_insumo) {
      if (l.cantidad)
        cantidad = Number(cantidad) + Number(l.cantidad);
    }
    if (cantidad > 0) {
      this.sum_cant_lotes = true;
    }else {
      this.sum_cant_lotes = false;
    }
  }

  quitar_punto(event) {
    if (this.is_numeric(event.key )) {
      return true;
    }else {
      return false;
    }
  }

  is_numeric(str) {
    return /^\d+$/.test(str);
  }

  guardar_movimiento() {
    // obtener el formulario reactivo para agregar los elementos
    const control = <FormArray>this.dato.controls['insumos'];
    console.log(control.value);
    if (control.length === 0) {
      this.notificacion.warn('Insumos', 'Debe agregar por lo menos un insumo', this.objeto);
    }else {
      document.getElementById('guardarMovimiento').classList.add('is-active');
    }
  }


  /***************************************IMPRESION DE REPORTES*************************************************/

  imprimir() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    try {
      this.cargandoPdf = true;
      var entrada_imprimir = {
        datos: this.dato.value,
        lista: this.dato.value.insumos,
        usuario: usuario
      };
      this.pdfworker.postMessage(JSON.stringify(entrada_imprimir));
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
}
