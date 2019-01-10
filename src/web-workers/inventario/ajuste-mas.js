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
                    headerRows: 7,
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
                        [{ text: 'SIAL', style: 'titulo', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],
                        [{ text: 'AJUSTE MÁS DE INVENTARIO', style: 'tableHeaderTop', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'FOLIO', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.datos.id, style: 'tableHeader', colSpan: 3, alignment: 'left' }, 
                            {}, {},
                            { text: 'ALMACÉN', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.usuario.almacen_activo.nombre, style: 'tableHeader', alignment: 'left' }
                        ],
                        [
                            { text: 'CLUES', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.clues_activa.clues, style: 'tableHeader', colSpan: 3, alignment: 'left'},{}, {},
                            { text: 'NOMBRE DE CLUES', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.usuario.clues_activa.nombre, style: 'tableHeader', alignment: 'left' }
                        ],
                        [
                            { text: 'CAPTURÓ', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.nombre +' '+ data.usuario.apellidos, style: 'tableHeader', colSpan: 3, alignment: 'left' }, {}, {},
                            { text: 'FECHA DE CAPTURA', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: '- -', style: 'tableHeader', alignment: 'left' }
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 7, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'NOMBRE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'NO. DE LOTE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'FECHA DE CADUCIDAD', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CODIGO DE BARRAS', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'EXISTENCIA ANTERIOR', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'NUEVA EXISTENCIA', style: 'tableHeaderVerde', alignment: 'center' },
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
            var insumo = data.lista[i];

            for (var j in insumo.lotes) {
                var lote = insumo.lotes[j];
                dd.content[0].table.body.push([
                    { text: lote.clave_insumo_medico, style: 'tableRow', alignment: 'center' },
                    { text: insumo.descripcion, style: 'tableRow', alignment: 'center' },
                    { text: lote.lote, style: 'tableRow', alignment: 'center' },
                    { text: lote.fecha_caducidad ? lote.fecha_caducidad : '--' , style: 'tableRow', alignment: 'center' },
                    { text: lote.codigo_barras ? lote.codigo_barras : '--' , style: 'tableRow', alignment: 'center' },
                    { text: lote.existencia_anterior ? lote.existencia_anterior : "No disponible", style: 'tableRow', alignment: 'center' },
                    { text: lote.nueva_existencia ? lote.nueva_existencia : "--", style: 'tableRow', alignment: 'center' }
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
                        [{text: 'OBSERVACIONES', style:'tableHeaderVerde', colSpan: 2}, {}],
                        [{text: '\n' + data.datos.observaciones, colSpan: 2, alignment: 'justify'}, {}]
                    ],
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
            postMessage({ fileName: 'Ajuste_mas_' + data.datos.id + '.pdf', base64: base64 });
        });
    }

})();