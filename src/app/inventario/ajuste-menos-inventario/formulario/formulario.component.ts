import { Component, OnInit, NgZone, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';
import { NotificationsService } from 'angular2-notifications';

import  * as FileSaver    from 'file-saver';

@Component({
  selector: 'app-ajuste-menos-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./../../../../../src/styles.css'],
  styles: ['ngui-auto-complete {z-index: 999999 !important}']
})

export class FormularioComponent {
  lotes_insumo;
  dato: FormGroup;
  form_insumos: any;
  modo = 'N';
  tab = 1;
  cant_solicitada_valida = false;
  unidad_medida;
  array_turnos;
  array_servicios;
  sum_cant_lotes = false;
  mostrar_lote = [];
  public insumos_term = `${environment.API_URL}/insumos-auto?term=:keyword`;

  MinDate = new Date();
  MaxDate = new Date();
  fecha_actual;
  tieneid = false;
  cargando = false;
  fecha_movimiento;
  mostrarCancelado;
  insumo;
  es_unidosis = false;
  // # SECCION: Reportes
    pdfworker: Worker;
    cargandoPdf = false;
  // # FIN SECCION

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private notificacion: NotificationsService,
    private _ngZone: NgZone) { }

  ngOnInit() {

    // obtener los datos del usiario logueado almacen y clues
    let usuario = JSON.parse(localStorage.getItem('usuario'));


    if (usuario.clues_activa) {
      this.insumos_term += '&clues=' + usuario.clues_activa.clues;
    }
    if (usuario.almacen_activo) {
      this.insumos_term += '&almacen=' + usuario.almacen_activo.id;
    }

    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker('web-workers/farmacia/movimientos/salida.js')

    // Este es un hack para poder usar variables del componente dentro de una funcion del worker
    let self = this;
    let $ngZone = this._ngZone;

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
      tipo_movimiento_id: ['6', [Validators.required]],
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
            <p class="title is-4"> <small>${data.descripcion}</small></p>
            <p class="subtitle is-6">
              <strong>Clave: </strong> ${data.clave}) 
              `;

              if(data.es_causes == 1)
              html += `<label class="tag is-success" ><strong>Cause </strong></label>`;
              if(data.es_causes == 0)
              html += `<label class="tag" style="background: #B8FB7E; border-color: #B8FB7E; color: rgba(0,0,0,0.7);"><strong>No Cause </strong> </label>`; 
              if(data.es_unidosis == 1)
              html += `<label class="tag is-warning" ><strong>Unidosis</strong></label>`;
              
    html += `
            </p>
          </div>
        </div>
      </div>
    </div>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  /**
     * Este método carga los datos de un elemento de la api con el id que se pase por la url
     * @param data json con los datos del objetop seleccionado del autocomplete
     * @return void
     */
  select_insumo_autocomplete(data) {

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    this.cargando = true;

    // cargar los datos de los lotes del insumo seleccionado en el autocomplete
    this.crudService.lista(0, 1000, 'comprobar-stock?almacen=' + usuario.almacen_activo.id + '&clave=' + data.clave).subscribe(
      resultado => {
        let unidosis_temporal: Number;
        let normal_temporal: Number;
        for (let item of this.dato.get('insumos').value){
          if (resultado.length === 0) {
            break;
          }
        }
        this.lotes_insumo = resultado;
        this.insumo = data;

        // limpiar el autocomplete
        (<HTMLInputElement>document.getElementById('buscarInsumo')).value = '';

        // poner el titulo a la modal
        document.getElementById('tituloModal').innerHTML = ` ${data.descripcion} <br>
          <p aling="justify" style="font-size:12px">${data.descripcion}</p> 
          <p aling="justify" style="font-size:16px"> CANTIDAD POR ENVASE: 
          ${data.cantidad_x_envase ? data.cantidad_x_envase : 'Sin especificar' }</p>`;
        this.es_unidosis = data.es_unidosis;
        this.unidad_medida = data.unidad_medida;

        this.cargando = false;
        this.abrirModal('verLotes');
      },
      error => {
        this.cargando = false;
      });
  }



  /**
     * Este método agrega los lostes del modal a el modelo que se envia a la api
     * @return void
     */
  agregarLoteIsumo() {
    // obtener el formulario reactivo para agregar los elementos
    const control = <FormArray>this.dato.controls['insumos'];

    // crear el json que se pasara al formulario reactivo tipo insumos
    let lotes = {
      'clave': this.insumo.clave,
      'nombre': this.insumo.nombre,
      'descripcion': this.insumo.descripcion,
      'es_causes': this.insumo.es_causes,
      'es_unidosis': this.insumo.es_unidosis,
      'cantidad': 1,
      'presentacion_nombre': this.insumo.presentacion_nombre,
      'unidad_medida': this.insumo.unidad_medida,
      'cantidad_x_envase': this.insumo.cantidad_x_envase ? parseInt(this.insumo.cantidad_x_envase) : 1,
      'cantidad_surtida': 1,
      'lotes': this.fb.array([])
    };

    // comprobar que el insumo no este en la lista cargada
    let existe = false;
    let existe_clave = false;
    let posicion_existe = 0;

    for (let item of control.value) {
      if (item.clave === this.insumo.clave) {
        existe_clave = true;
        existe = true;
        break;
      }
      posicion_existe++;
    }

    // si no existe el insumo en la lista agregarlo
    if (!existe) {
      control.push(this.fb.group(lotes));
    }

    // obtener la ultima posicion para que en esa se agreguen los lotes
    let posicion = posicion_existe; // control.length - 1;
    // obtener el control del formulario en la posicion para agregar el nuevo form array que corresponde a los lotes
    const ctrlLotes = <FormArray>control.controls[posicion];
    // Mostrar ocultar los lotes en la vista al hacer clic en el icono de plus
    this.mostrar_lote[posicion] = false;

    let objeto = {
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
    let existencia_mayor_lote = false;
    // recorrer la tabla de lotes del modal para obtener la cantidad
    for (let item of this.lotes_insumo) {
      if (item.cantidad > item.existencia) {
        existencia_mayor_lote = true;
      }
    }
    for (let item of this.lotes_insumo) {
      // agregar unicamente aquellos que tiene cantidad normal o unidosis
      if (item.cantidad > 0 ) {
        let existe_lote = false;
        // si existe el insumo validar que el lote no exista
        if (existe) {
          for (let l of ctrlLotes.controls['lotes'].controls) {
            // si el lote existe agregar unicamente la cantidad nueva
            if (l.controls.id.value === item.id) {
              existe_lote = true;
              // agregar la cantida nueva al lote
              let cantidad_lote: number = l.controls.cantidad.value + item.cantidad;
              // agregar la cantida nueva al lote
              let cantidad_unidosis_lote: number = l.controls.cantidad.value + item.cantidad;

              // validar que la cantidad escrita no sea mayor que la existencia si no poner la existencia como la cantidad maxima
              if (cantidad_lote < l.controls.existencia.value) {
                this.notificacion.alert('Cantidad Inválida', 'La cantidad mínima es: ' + Number(l.controls.existencia.value) + 1, objeto);
                cantidad_lote = Number(l.controls.existencia.value) + 1;
              }
              l.controls.cantidad.patchValue(cantidad_lote);
              break;
            }
          }
        }
        // si el lote no existe agregarlo
        if (!existe_lote) {
          if (item.cantidad > item.existencia) {
            // validar que la cantidad escrita no sea mayor que la existencia si no poner la existencia como la cantidad maxima
            // Para Cantidad normal
            if (item.nuevo) {
              item.existencia = item.cantidad * 1;
            }

            // agregar al formulario reactivo de lote
            ctrlLotes.controls['lotes'].push(this.fb.group(
              {
                id: item.id,
                ajuste: 1,
                nueva_existencia: item.cantidad,
                nuevo: item.nuevo | 0,
                codigo_barras: item.codigo_barras,
                lote: item.lote,
                fecha_caducidad: item.fecha_caducidad,
                cantidad: item.cantidad,
                existencia: item.nuevo ? item.cantidad : item.existencia
              }
            ));
          }else {
            let existencia_minima = Number(item.existencia) + Number(1);
            this.notificacion.alert('Cantidad Inválida', 'La cantidad mínima de ' + item.lote +
            ' es: ' + existencia_minima, objeto);
            if (!existe && !existencia_mayor_lote) {
              control.removeAt(posicion);
            }
          }
        }
      }
    }

    // sumamos las cantidades de los lotes
    let cantidad = 0;
    let cantidad_unidosis = 0;
    for (let l of ctrlLotes.controls['lotes'].value) {
      cantidad = cantidad + l.cantidad;
      cantidad_unidosis = cantidad_unidosis + l.cantidad;
    }

    // agregar la cantidad surtida
    ctrlLotes.controls['cantidad_surtida'].patchValue(cantidad);
    this.cancelarModal('verLotes');
    this.cancelarModal('negarExistencia');
    this.cant_solicitada_valida = false;
    this.sum_cant_lotes = false;
    this.modo = 'N';
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
    this.lotes_insumo.push(
      { id: '' + Math.floor(Math.random() * (999)) + 1, codigo_barras: '', lote: '', fecha_caducidad: '',
        existencia: '', cantidad: '', nuevo: 1, existencia_unidosis: '', cantidad_unidosis: '' });
    // this.lotes_insumo.push({ id: "" + Math.floor(Math.random() * (999)) + 1, codigo_barras: "",
    // lote: "", fecha_caducidad: "", existencia: '', cantidad: '', nuevo: 1});
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

    let cantidad = ctrlLotes.controls['cantidad_surtida'].value - val.cantidad;
    ctrlLotes.controls['cantidad_surtida'].patchValue(cantidad);
  }

  /**
     * Este método valida que la cantidad escrita en el lote por listado de isnumos sea menor que la existencia
     * @param i Posicion del insumo en la lista
     * @param val Object con los datos del lote
     * @param i2 Posicion del lote en la lista de lotes
     * @return void
     */
  validar_cantidad_lote(i, val, i2, modo_salida) {
    if (modo_salida === 'N') {
      if (val.controls.cantidad.value < val.controls.existencia.value) {
        let objeto = {
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 2000
        };
        this.notificacion.alert('Cantidad Inválida', 'La cantidad mínima es: ' + Number(val.controls.existencia.value) + 1, objeto);
        let cantidad_lote = Number(val.controls.existencia.value) + 1;
        val.controls.cantidad.patchValue(cantidad_lote);
      }
    }
    // sumamos las cantidades de los lotes
    const control = <FormArray>this.dato.controls['insumos'];
    const ctrlLotes = <FormArray>control.controls[i];
    let cantidad = 0;
    for (let l of ctrlLotes.controls['lotes'].value) {
      cantidad = cantidad + l.cantidad;
    }
    ctrlLotes.controls['cantidad_surtida'].patchValue(cantidad);
  }

  comprobar_cant_lotes() {
    let cantidad = 0;
    for (let l of this.lotes_insumo) {
      if (l.cantidad) {
        cantidad = Number(cantidad) + Number(l.cantidad);
      }
    }
    if (cantidad > 0) {
      this.sum_cant_lotes = true;
    }else {
      this.sum_cant_lotes = false;
    }
  }

  comprobar_cant_solicitada(value) {
    if (value > 0) {
      this.cant_solicitada_valida = true;
    }else {
      this.cant_solicitada_valida = false;
    }
  }

  quitar_punto(event) {
    if (this.is_numeric(event.key)) {
      return true;
    }else {
      return false;
    }
  }

  is_numeric(str) {
    return /^\d+$/.test(str);
  }

  guardar_movimiento() {
    document.getElementById('guardarMovimiento').classList.add('is-active');
  }

  imprimir() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    let turno;
    for (let item of this.array_turnos.clues_turnos){
      if (this.dato.value.movimiento_metadato.turno_id === item.id) {
        turno = item;
        break;
      }
    };
    let servicio;
    for (let item of this.array_servicios.clues_servicios){
      if (this.dato.value.movimiento_metadato.servicio_id === item.id) {
        servicio = item;
        break;
      }
    };
    try {
      this.cargandoPdf = true;
      let entrada_imprimir = {
        datos: this.dato.value,
        lista: this.dato.value.insumos,
        turno: turno,
        servicio: servicio,
        usuario: usuario
      };
      this.pdfworker.postMessage(JSON.stringify(entrada_imprimir));
    } catch (e) {
      this.cargandoPdf = false;
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
