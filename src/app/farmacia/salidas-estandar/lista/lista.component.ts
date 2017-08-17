import { Component, OnInit, NgZone, ViewChildren } from '@angular/core';
import { CrudService } from '../../../crud/crud.service';
import  * as FileSaver    from 'file-saver';

@Component({
  selector: 'salidas-recetas-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent implements OnInit {
  usuario;
  fecha_desde = "";
  fecha_hasta = "";
  turno = "";
  servicio = "";
  recibe = "";
  dato;

  // # SECCION: Reportes
  pdfworker:Worker;
  cargandoPdf = false;
  // # FIN SECCION

  @ViewChildren('tr') tr;
  @ViewChildren('sr') sr;
  constructor(
    private _ngZone: NgZone) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    // Inicializamos el objeto para los reportes con web Webworkers
    this.pdfworker = new Worker('web-workers/farmacia/movimientos/lista-salidas.js');

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

  export_pdf() {
    // crear el contenedor para guardar el elemento a imprimir
    var titulo = 'Salida Estandar';
    var turno = this.tr.first.nativeElement.options;
    var servicio = this.sr.first.nativeElement.options;
    turno = turno[turno.selectedIndex].text;
    servicio = servicio[servicio.selectedIndex].text;
    var exportData = "<table><tr><th colspan='7'><h1>" + titulo 
    +"</h1></th></tr><tr><th>Desde: "+this.fecha_desde+"</th><th>Hasta: "+this.fecha_hasta+"</th>"
    + '<th>Turno: ' + turno + "</th><th>Servicio: " + servicio + "</th><th>Recibe: " + this.recibe
    + '</th></tr><tr><th colspan=\'7\'></th></tr></table>';

    var exportData = exportData + document.getElementById("exportable").innerHTML;

    exportData = '<html lang="es">' + ' <head>' + ' <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' 
    + ' <meta name="charset" content="UTF-8">' + ' <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">' 
    + ' <meta name="apple-mobile-web-app-capable" content="yes">'
    + ' <title>PDF</title> <meta name="viewport" content="initial-scale=1" />'
    + ' <style>html { font-size: .9em;} body{font-size: .9em;} select::-ms-expand {display: none;}</style>'
    + ' </head>' + ' <body>'  + exportData + ' </body>' + ' </html>';
   
    var iframe = document.createElement('iframe');
    iframe.setAttribute("id", "printf");
    iframe.setAttribute("style", "display:none");
    document.body.appendChild(iframe);

    var mywindow = <HTMLSelectElement>document.getElementById('printf');
    mywindow.contentWindow.document.write(exportData);
    setTimeout(function () {
      // lanzar la sentencia imprimir
      mywindow.contentWindow.print();
    }, 500);
    setTimeout(function () {
      // remover el contenedor de impresión
      document.body.removeChild(iframe);
    }, 2000);
  }
  export_excel(){
    var titulo = "Salida Estandar";
    var turno = this.tr.first.nativeElement.options;
    var servicio = this.sr.first.nativeElement.options;
    turno = turno[turno.selectedIndex].text;
    servicio = servicio[servicio.selectedIndex].text;
    var exportData = "<table><tr><th colspan='7'><h1>" + titulo 
    +"</h1></th></tr><tr><th>Desde: "+this.fecha_desde+"</th><th>Hasta: "+this.fecha_hasta+"</th>"
    +"<th>Turno: "+turno+"</th><th>Servicio: "+servicio+"</th><th>Recibe: "+this.recibe+"</th></tr><tr><th colspan='7'></th></tr></table>";

    exportData += document.getElementById('exportable').innerHTML;
    var blob = new Blob([exportData], { type: "text/comma-separated-values;charset=utf-8" });
    saveAs(blob,  "salida_estandar.xls");
  }

  imprimir() {
    try {
      this.cargandoPdf = true;
      let entrada_imprimir = {
        lista: this.dato,
        usuario: this.usuario
      };
      this.pdfworker.postMessage(JSON.stringify(entrada_imprimir));
    } catch (e) {
      this.cargandoPdf = false;
    }
  }

  base64ToBlob( base64, type ) {
      let bytes = atob( base64 ), len = bytes.length;
      let buffer = new ArrayBuffer( len ), view = new Uint8Array( buffer );
      for ( let i = 0 ; i < len ; i++ ) {
        view[i] = bytes.charCodeAt(i) & 0xff;
      }
      return new Blob( [ buffer ], { type: type } );
  }
}
