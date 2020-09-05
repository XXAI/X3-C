var document = { 'createElementNS': function() { return {} } };
var window = this;
importScripts('../../../scripts/pdfmake.min.js', '../../../scripts/vfs_fonts.js');
importScripts('../../logos.js');

(function() {
    'use strict';


    onmessage = function(evt) {
        let data = JSON.parse(evt.data);
        //console.log("entra");
        console.log(data);
        pdf(data);
    };

    function pdf(data) {
        var contadorLineasHorizontalesV = 0;
        var COLOR_CELDA = '#eaf1dd';

        var dd = {
            content: [{
                style: 'Movimiento',
                table: {
                    headerRows: 4,
                    dontBreakRows: true,
                    //widths: [ 35, 70, 'auto', 'auto', 40 , 45, 45],
                    widths: [80, 70, 'auto', 'auto', 'auto', 'auto','auto'],
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
                        [{ text: 'REPORTE ACUSE DE TRANSFERENCIA DE INSUMOS O MEDICAMENTOS', style: 'tableHeaderTop', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],
                        [{ text: 'FOLIO', style: 'tableHeaderVerde', colSpan: 1, alignment: 'center' },
                         { text: data.pedido.folio, style: 'tableHeaderTop', colSpan: 6, alignment: 'center' }, {}, {}, {}, {},{}
                        ],
                        [{ text: 'CLUES ORIGEN', style: 'tableHeaderVerde', colSpan: 1, alignment: 'center' },
                        { text:  data.pedido.clues+" - "+data.pedido.unidad_medica.nombre , style: 'tableHeader', colSpan: 6, alignment: 'left'}, {},{},{},{},{}
                        ],
                        [
                        { text: 'CLUES DESTINO', style: 'tableHeaderVerde', colSpan: 1, alignment: 'center' }, 
                        { text: data.pedido.clues_destino+" - "+data.pedido.unidad_medica_destino.nombre , style: 'tableHeader', colSpan: 6, alignment: 'left'}, {},{},{},{},{}
                        ]
                        ,
                        [
                            { text: 'FECHA DE IMPRESION', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.fecha, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {},
                            { text: 'FECHA DE CREACION', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.pedido.movimientos_transferencias_completo[0].fecha_movimiento, colSpan:3, style: 'tableHeader', alignment: 'left' }, {},{}
                        ],
                        [
                            { text: 'ELABORO', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.pedido.usuario.id + ": " + data.pedido.usuario.nombre + " " + data.pedido.usuario.apellidos, style: 'tableHeader', colSpan: 6, alignment: 'left' }, {}, {}, {}, {}, {}
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'DESCRIPCION DEL INSUMO', style: 'tableHeaderVerde', alignment: 'center', colSpan: 4 },
                            { },
                            {  },
                            {  },
                            { text: 'CANTIDAD TRANSFERIDA', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CANTIDAD ENTREGADA', style: 'tableHeaderVerde', alignment: 'center' },
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

        var lista = data.pedido.movimientos_transferencias_completo;
        for (var i in lista) {
            var insumo = lista[i];

            for (var j in insumo.insumos) {
                var insumos = insumo.insumos[j];
                dd.content[0].table.body.push([
                    { text: insumos.clave_insumo_medico, style: 'tableRow', alignment: 'center' },
                    { text: insumos.detalles.descripcion, style: 'tableRow', alignment: 'center', colSpan: 4 },
                    { },
                    { },
                    { },
                    { text: insumos.cantidad , style: 'tableRow', alignment: 'center' },
                    { text: '', style: 'tableRow', alignment: 'center' }
                ]);
            }

        }


        dd.content[0].table.body.push(
            // Footer
            [
                { text: "", style: 'tableHeader', colSpan: 7, alignment: 'center' },
                '', '', '', '', '', ''
            ],

            // Firmas
            [{
                table: {
                    widths: ['*', '*'],
                    body: [
                            [
                                { text: '\n\n\n\n'+ data.pedido.movimientos_transferencias_completo[0].entrega, rowSpan: 2, style: 'justify' },
                                { text: '\n\n\n\n'+ data.pedido.movimientos_transferencias_completo[0].recibe, rowSpan: 2, style: 'justify' }
                            ],
                            [
                                '',''
                            ],
                            [
                                'Persona que Entrega',
                                'Persona que Recibe'
                            ]
                        ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        if (i == 0 || i == 3) {
                            return 0;
                        }
                        return 0.5;
                    },
                    vLineWidth: function(i, node) {
                        if (i == 0 || i == 3) {
                            return 0;
                        }
                        return 0.5;
                    },
                },
                style: 'tableHeader',
                margin: [0, 0, 0, 0],
                colSpan: 7,
                alignment: 'center',
            }, {}, {}, {}, {}, {}, {}]
        );

        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'transferencia.pdf', base64: base64 });
        });
    }

})();