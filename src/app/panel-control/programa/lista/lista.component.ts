import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from '../../../crud/crud.service';

@Component({
  selector: 'programa-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent {
  /**
   * Variable que contiene un valor __true__ cuando está ocurriendo un proceso,
   * y __false__ cuando no hay procesos realizándose.
   * @type {boolean} */
    cargando;
  /**
   * Contiene el resultado de la consulta de la lista general de programas.
   * @type {any} */
    lista_impresion;
  /**
   * Variable que contiene un valor __true__ cuando está generando el pdf a imprimir
   * y __false__ cuando termina de generarlo.
   * @type {boolean} */
    cargandoPdf;
  /**
     * Variable para la seccion de reportes.
     * @type {Worker} */
      pdfworker: Worker;
  /**
   * Este método inicializa la carga de las dependencias
   * que se necesitan para el funcionamiento del modulo
   */
  constructor(
    private _ngZone: NgZone,
    private crudService: CrudService) { }
  
  /**
   * Método que genera una lista general de los registros en formato PDF, con los filtros correspondientes
   * @returns archivo en formato PDF
   */
  imprimir() {
    this.crudService.lista_general('movimientos?tipo=1').subscribe(
      resultado => {
              this.cargando = false;
              this.lista_impresion = resultado;
              try {
                this.cargandoPdf = true;
                let entrada_imprimir = {
                  lista: this.lista_impresion.data
                };
                this.pdfworker.postMessage(JSON.stringify(entrada_imprimir));
              } catch (e) {
                this.cargandoPdf = false;
              }
            },
            error => {
            }
    );
  }
}