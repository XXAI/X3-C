import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tabla-opciones',
  templateUrl: './opciones.component.html'
})

export class TablaOpcionesComponent {
  @Input() ctrl: any;
  @Input() nombre: any;

  private url_nuevo: string = '';
  private carpeta;
  private modulo;
  private controlador;
  private modulo_actual;
  ngOnInit() {
    var url = location.href.split("/");
    this.carpeta = url[3];
    this.modulo = url[4];

    this.url_nuevo = '/' + this.carpeta + '/' + this.modulo + '/nuevo';
  }

}