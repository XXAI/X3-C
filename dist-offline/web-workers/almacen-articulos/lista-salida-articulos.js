var document = { 'createElementNS': function() { return {} } };
var window = this;
importScripts('../../../scripts/pdfmake.min.js', '../../../scripts/vfs_fonts.js');
importScripts('../logos.js');

(function() {
    'use strict';

    onmessage = function(evt) {
        let data = JSON.parse(evt.data)
        pdf(data);
    };

    function pdf(data) {
        var contadorLineasHorizontalesV = 0;
        var COLOR_CELDA = '#eaf1dd';
        var dd = {
            content: [{
                style: 'Movimiento',
                table: {
                    headerRows: 5,
                    dontBreakRows: true,
                    //widths: [ 35, 70, 'auto', 'auto', 40 , 45, 45],
                    widths: [90, 60, 'auto', 'auto', 50, 80,'auto'],
                    body: [
                        [{
                            image: 'header',
                            width: 500,
                            style: 'tableHeaderTop',
                            colSpan: 7,
                            alignment: 'center'
                        }, {}, {}, {}, {}, {},{}],
                        [{ text: 'SSADII', style: 'titulo', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],
                        [{ text: 'SALIDAS DE ARTÍCULOS GENERALES', style: 'tableHeaderTop', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],[
                            { text: 'CLUES', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.clues_activa.clues, style: 'tableHeader', alignment: 'left' }, 
                            { text: 'NOMBRE DE CLUES', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' }, 
                            {},
                            { text: data.usuario.clues_activa.nombre, style: 'tableHeader', colSpan: 2, alignment: 'left' }, 
                            {}
                        ],
                        [
                            { text: '', style: 'tableHeaderVerde', colSpan: 3, alignment: 'right' },
                            {},{},
                            { text: 'NOMBRE DE ALMACÉN', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.almacen_activo.nombre, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {}
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],                                            
                        [
                            { text: 'DESDE:', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' }, 
                            { },
                            { text: data.fecha_desde == "" ? '- -' : data.fecha_desde.substr(0,10), 
                              style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            { },
                            { text: 'HASTA:', style: 'tableHeaderVerde', alignment: 'right' }, 
                            { text: data.fecha_hasta == "" ? '- -' : data.fecha_hasta.substr(0,10), 
                              style: 'tableHeader',colSpan: 2, alignment: 'left' },
                            {}
                        ],
                        [
                            { text: 'UNIDAD MÉDICA DESTINO:', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            { }, 
                            { text: data.clues_destino == "" ? '- -' : data.clues_destino, style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            { },
                            { text: 'RECIBE:', style: 'tableHeaderVerde',  alignment: 'right' },
                            { text: data.persona_recibe, style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            {}
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'FOLIO', style: 'tableHeaderVerde',  alignment: 'center' },
                            { text: 'FECHA', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'UNIDAD MÉDICA DESTINO', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'RECIBE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'ARTÍCULOS', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'IMPORTE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'ESTATUS', style: 'tableHeaderVerde', alignment: 'center' }
                        ]
                        //Body -> insumos
                    ]
                },
                layout: {
                    paddingTop: function(i, node) { return 0; },
                    paddingBottom: function(i, node) { return 0; },
                    paddingLeft: function(i, node) { return 0; },
                    paddingRight: function(i, node) { return 0; },
                    hLineWidth: function(i, node) {
                        if (i < 3) { return 0; } else {
                            return 0.25
                        }
                        return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                    },
                    vLineWidth: function(i, node) {
                        /* Hack para las lineas verticales de la cabecera */
                        if (i == 0) {
                            contadorLineasHorizontalesV += 1
                        }
                        /*
                            El numero 4 es el que funciono, deberian ser 2 por ser 2 filas,
                            Si se agregan mas filas solo debemos aumentar este numero a modo de cuadrar
                            el encabezado
                        */
                        if (contadorLineasHorizontalesV > 5) {
                            return 0.5
                        } else {
                            return 0
                        }
                    },
                }
            }],
            pageSize: 'LETTER',
            compress: true,
            pageOrientation: 'portrait',
            footer: function(currentPage, pageCount) {
                return { style: 'piePagina', text: 'Página ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center' };
            },
            styles: {
                titulo: {
                    fontSize: 12,
                    bold: true,
                    color: 'black'
                },
                celdaEspacio: {
                    bold: true,
                    fontSize: 8,
                    //layout: 'noBorders',
                    fillColor: 'white'
                },
                tableHeaderTop: {
                    bold: true,
                    fontSize: 8,
                    color: 'black',
                    margin: [3, 3, 3, 3]
                },
                tableHeaderLeyenda: {
                    bold: false,
                    italics: true,
                    fontSize: 8,
                    color: 'black',
                    margin: [1, 1, 1, 1]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 6,
                    color: 'black',
                    margin: [3, 3, 3, 3]
                },
                tableHeaderVerde: {
                    bold: true,
                    fontSize: 6,
                    color: 'black',
                    fillColor: COLOR_CELDA,
                    margin: [3, 3, 3, 3]

                },
                tableHeaderData: {
                    bold: false,
                    fontSize: 6,
                    color: 'black',
                    margin: [3, 3, 3, 3]
                },
                tableRow: {
                    bold: false,
                    fontSize: 6,
                    color: 'black',
                    margin: [3, 3, 3, 3]
                },
                tableFooter: {
                    bold: true,
                    fontSize: 6,
                    color: 'black',
                    margin: [3, 3, 3, 3]
                },
                piePagina: {
                    fontSize: 6,
                    italics: true,
                    bold: false
                }
            },
            defaultStyle: { // alignment: 'justify'
            },
            images: {
                header: HEADER
            }
        };

        var suma_total_insumos = 0;

        for (var i in data.lista) {
            var movimiento = data.lista[i];
                dd.content[0].table.body.push([
                    { text: movimiento.id ? movimiento.id : 'No disponible', style: 'tableRow', alignment: 'center' },
                    { text: movimiento.fecha_movimiento ? movimiento.fecha_movimiento : 'No disponible', style: 'tableRow', alignment: 'center' },
                    { text: movimiento.movimiento_salida_metadatos_a_g ? movimiento.movimiento_salida_metadatos_a_g.clues_destino + ' - ' + movimiento.movimiento_salida_metadatos_a_g.unidad_medica.nombre : 'No disponible', style: 'tableRow', alignment: 'center' },
                    { text: movimiento.persona_recibe ? movimiento.persona_recibe : 'No disponible', style: 'tableRow', alignment: 'center' },
                    { text: movimiento.total_articulos == null ? 'No disponible' : 'Articulos: ' + movimiento.total_articulos, style: 'tableRow', alignment: 'center' },
                    { text: movimiento.total_importe == null ? 'No disponible' : ('$ ' + Number(movimiento.total_importe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' },
                    { text: !movimiento.status ? 'No disponible' : movimiento.status == 'FI' ? 'Finalizado' : movimiento.status == 'BR' ? 'Borrador' : 'No disponible', style: 'tableRow', alignment: 'center' }
                ]);
        }

        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'Lista_Salidas_Artículos.pdf', base64: base64 });
        });
    }

})();