import { Component, OnInit, Input, NgZone } from '@angular/core';
import { CrudService } from '../../../crud/crud.service';
import  * as FileSaver    from 'file-saver';

@Component({
  selector: 'tabla-opciones',
  templateUrl: './opciones.component.html'
})

export class TablaOpcionesComponent {
  @Input() ctrl: any;
  @Input() nombre: any;
  /**
   * Contiene la ruta a la cual se hará la consulta a la API para imprimir el PDF.
   * @type {string} */
  @Input() ruta: string;
  /**
   * Contiene la ruta donde se encuentra el archvio javascript que genera el PDF.
   * @type {string} */
  @Input() ruta_pdf: string;

  private url_nuevo: string = '';
  private carpeta;
  private modulo;
  private controlador;
  private modulo_actual;

  /**
   * Contiene el resultado de la consulta de la lista general de programas.
   * @type {any} */
    lista_impresion;
  /**
   * Variable para la seccion de reportes.
   * @type {Worker} */
    pdfworker: Worker;
    /**
   * Variable que contiene un valor __true__ cuando está generando el pdf a imprimir
   * y __false__ cuando termina de generarlo.
   * @type {boolean} */
    cargandoPdf;

  /**
   * Este método inicializa la carga de las dependencias
   * que se necesitan para el funcionamiento del modulo
   */
  constructor(
    private _ngZone: NgZone,
    private crudService: CrudService) { }

  ngOnInit() {
    let url = location.href.split('/');
    this.carpeta = url[3];
    this.modulo = url[4];

    this.url_nuevo = '/' + this.carpeta + '/' + this.modulo + '/nuevo';
    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker('web-workers/' + this.ruta_pdf);

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
  }

  imprimir() {
    this.crudService.lista_general(this.ruta).subscribe(
      resultado => {
        this.lista_impresion = resultado;
        try {
          this.cargandoPdf = true;
          let imprimir = {
            lista: this.lista_impresion
          };
          this.pdfworker.postMessage(JSON.stringify(imprimir));
        } catch (e) {
          this.cargandoPdf = false;
        }
      },
      error => {
      }
    );
  }
  /**
   * Método que nos ayuda a convertir un archivo para poder guardarlo
   * @param base64 pendiente
   * @param type pendiente
   */
  base64ToBlob( base64, type ) {
      let bytes = atob( base64 ), len = bytes.length;
      let buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( let i = 0 ; i < len ; i++ ) {
        view[i] = bytes.charCodeAt(i) & 0xff;
      }
      return new Blob( [ buffer ], { type: type } );
  }
}
