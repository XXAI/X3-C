import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';
import { NotificationsService } from 'angular2-notifications';

import  * as FileSaver    from 'file-saver'; 

@Component({
  selector: 'salidas-estandar-formulario',
  templateUrl: './formulario.component.html',
  styles: ['ngui-auto-complete {z-index: 999999 !important}']
})

export class FormularioComponent {
  dato: FormGroup;
  form_insumos: any;
  tab: number = 1;
  cargando = false;
  public insumos_term: string = `${environment.API_URL}/insumos-auto?term=:keyword`;
  constructor(
    private fb: FormBuilder, 
    private crudService: CrudService, 
    private route: ActivatedRoute, 
    private _sanitizer: DomSanitizer, 
    private notificacion: NotificationsService,
    private _ngZone: NgZone
    ) { }


  private MinDate = new Date();
  private MaxDate = new Date();
  private fecha_actual;
  private tieneid: boolean = false;

  // # SECCION: Reportes
  private pdfworker:Worker;
  private cargandoPdf:boolean = false;
  // # FIN SECCION

  ngOnInit() {

    //obtener los datos del usiario logueado almacen y clues
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario.clues_activa) {
      this.insumos_term += "&clues=" + usuario.clues_activa.clues;
    }
    if (usuario.almacen_activo) {
      this.insumos_term += "&almacen=" + usuario.almacen_activo.id;
    }

    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker("web-workers/farmacia/movimientos/imprimir-entrada.js")

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
      //open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF
    };

    //inicializar el formulario reactivo
    this.dato = this.fb.group({
      id: [''],
      tipo_movimiento_id: ['1', [Validators.required]],
      status: ['FI'],
      fecha_movimiento: ['', [Validators.required]],
      observaciones: [''],
      cancelado: [''],
      observaciones_cancelacion: [''],
      movimiento_metadato: this.fb.group({
        persona_recibe:['', [Validators.required]],
        servicio_id:[null],
        turno_id:[null],
      }),      
      insumos: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });

    //variable para crear el array del formulario reactivo
    this.form_insumos = {
      tipo_movimiento_id: ['', [Validators.required]]
    };

    //inicializar el data picker minimo y maximo
    var date = new Date();

    this.MinDate = new Date(date.getFullYear() - 1, 0, 1);
    this.MaxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    //si es nuevo poner la fecha actual si no poner la fecha con que se guardo
    if (!this.dato.get('fecha_movimiento').value) {
      this.fecha_actual = date.getFullYear() + '-' + ('00' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
      this.dato.get('fecha_movimiento').patchValue(this.fecha_actual);
    } else {
      this.fecha_actual = this.dato.get('fecha_movimiento').value;
    }

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();  
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
            <p class="title is-4">${data.nombre} <small>${data.descripcion}</small></p>
            <p class="subtitle is-6">
              <strong>Clave: </strong> ${data.clave}) 
              `;
    
              if(data.es_causes)
              html += `<label class="tag is-success" ><strong>Cause </strong></label>`;
              if(!data.es_causes)
              html += `<label class="tag is-success" ><strong>No Cause </strong> </label>`; 
              if(data.es_unidosis)                                                                 
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

    var usuario = JSON.parse(localStorage.getItem("usuario"));
    this.cargando = true;
    this.insumo = data;
    this.agregarLoteIsumo();
    (<HTMLInputElement>document.getElementById('buscarInsumo')).value = '';
    this.es_unidosis = data.es_unidosis;
    this.cargando = false;
    //cargar los datos de los lotes del insumo seleccionado en el autocomplete
    /*this.crudService.lista(0, 1000, 'comprobar-stock?almacen=' + usuario.almacen_activo.id + '&clave=' + data.clave).subscribe(
      resultado => {

        this.lotes_insumo = resultado;
        this.insumo = data;

        //limpiar el autocomplete
        (<HTMLInputElement>document.getElementById('buscarInsumo')).value = '';

        //poner el titulo a la modal
        document.getElementById('tituloModal').innerHTML = ` ${data.nombre} <br><p aling="justify" style="font-size:12px">${data.descripcion}</p> `;
        this.es_unidosis = data.es_unidosis;
        this.cargando = false;
        this.abrirModal('verLotes');
      },
      error => {
        this.cargando = false;
      }
    );*/
  }


  public options = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true
  };

  mostrar_lote = [];
  /**
     * Este método agrega los lostes del modal a el modelo que se envia a la api
     * @return void
     */
  agregarLoteIsumo() {
    //obtener el formulario reactivo para agregar los elementos
    const control = <FormArray>this.dato.controls['insumos'];

    //comprobar que el isumo no este en la lista cargada
    var existe = false;
    /*comentamos esta comprobacion porque se pueden agregar más de un insumo con la misma clave
    for (let item of control.value) {
      if (item.clave == this.insumo.clave) {
        existe = true;
        break;
      }
    }*/
    //crear el json que se pasara al formulario reactivo tipo insumos
    var temporal_cantidad_x_envase;
    if(this.insumo.cantidad_x_envase == null){
      temporal_cantidad_x_envase = 1;
    }else{
      temporal_cantidad_x_envase = this.insumo.cantidad_x_envase;
    }
    var lotes = {
      "clave": this.insumo.clave,
      "nombre": this.insumo.nombre,
      "descripcion": this.insumo.descripcion,
      "es_causes": this.insumo.es_causes,
      "es_unidosis": this.insumo.es_unidosis,
      "lote": ['', [Validators.required]],
      "codigo_barras": ['', [Validators.required]],
      "fecha_caducidad": ['', [Validators.required]],
      "cantidad": ['', [Validators.required]],
      "cantidad_x_envase": parseInt(temporal_cantidad_x_envase),     
      "cantidad_surtida": 1,
    };

    //si no esta en la lista agregarlo
    if (!existe)
      control.push(this.fb.group(lotes));

    
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
    this.lotes_insumo.push({ id: "" + Math.floor(Math.random() * (999)) + 1, codigo_barras: "", lote: "", fecha_caducidad: "", existencia: '', cantidad: '', nuevo: 1, existencia_unidosis: '', cantidad_unidosis: '' });
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

  imprimir() {
    
    var usuario = JSON.parse(localStorage.getItem("usuario"));
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