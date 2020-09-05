var document = { 'createElementNS': function() { return {} } };
var window = this;
importScripts('../../../scripts/pdfmake.min.js', '../../../scripts/vfs_fonts.js');
importScripts('../../logos.js');

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
                    widths: [80, 'auto', 'auto', 'auto', 50, 50],
                    body: [
                        [{
                            image: 'header',
                            width: 550,
                            style: 'tableHeaderTop',
                            colSpan: 6,
                            alignment: 'center'
                        }, {}, {}, {}, {}, {}],
                        [{ text: 'SSADII', style: 'titulo', colSpan: 6, alignment: 'center' },
                            {}, {}, {}, {}, {}
                        ],
                        [{ text: 'RECETA', style: 'tableHeaderTop', colSpan: 6, alignment: 'center' },
                            {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'FOLIO', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.receta.folio, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {},
                            { text: 'TIPO', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.receta.tipo_receta_id == '1' ? 'Normal' : data.datos.receta.tipo_receta_id == '2' ? 'Controlado' : 'No disponible', style: 'tableHeader', colSpan: 2, alignment: 'left' }, {},
                        ],
                        [
                            { text: 'PACIENTE', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.receta.paciente, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {},
                            { text: 'DIAGNOSTICO', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.receta.diagnostico, style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            {}
                        ],
                        [
                            { text: 'PÓLIZA DE SEGURO POPULAR:', style: 'tableHeaderVerde', colSpan: 3, alignment: 'right' },
                            {}, {},
                            { text: data.poliza, style: 'tableHeader', colSpan: 3, alignment: 'left' },
                            {}, {}
                        ],
                        [
                            { text: 'USUARIO', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.usuario.nombre +' '+ data.usuario.apellidos, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {},
                            { text: 'FECHA', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.receta.fecha_receta, style: 'tableHeader',  colSpan: 2, alignment: 'left' },
                            {}
                        ],
                        [
                            { text: 'CLUES', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.usuario.clues_activa.clues, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {},
                            { text: 'NOMBRE DE CLUES', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.usuario.clues_activa.nombre, style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            {}
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 6, alignment: 'center' },
                            {}, {}, {}, {}, {}
                        ],
                        
                        [
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'DESCRIPCION', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'DATOS INSUMO', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'INDICACIONES', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CANTIDAD RECETADA', style: 'tableHeaderVerde',alignment: 'center' },
                            { text: 'CANTIDAD SURTIDA', style: 'tableHeaderVerde', alignment: 'center' },
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
            pageMargins: [ 30, 5, 5, 5 ],
            compress: true,
            pageOrientation: 'portrait',
            footer: function(currentPage, pageCount) {
                return { style: 'piePagina', text: 'Página ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center' };
            },
            styles: {
                titulo: {
                    fontSize: 16,
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
                    { text: "Lote:"+lote.lote + '\n' + "Caducidad:"+ lote.fecha_caducidad, style: 'tableRow', alignment: 'center' },
                    { text: "Dosis: "+insumo.dosis + '\n' + "Frecuencia: Cada "+insumo.frecuencia + " hrs.", style: 'tableRow', alignment: 'center' },
                    { text: insumo.cantidad_recetada, style: 'tableRow', alignment: 'center' },
                    { text: insumo.cantidad_surtida, style: 'tableRow', alignment: 'center' }
                ]);
            }

        }


        dd.content[0].table.body.push(
            // Footer
            [
                { text: "", style: 'tableHeader', colSpan: 6, alignment: 'center' },
                '', '', '', '', ''
            ],

            // Firmas
            [{
                table: {
                    widths: ['*', '*'],
                    body: [
                        [
                            { text: '\n\n\n\n' + '' + data.datos.receta.doctor, rowSpan: 2, style: 'tableRow' }, 
                            { text: "Observaciones", style: 'text' }
                        ],
                        [
                            '', 
                            { text: '\n' + data.datos.observaciones, rowSpan: 2, alignment: 'justify' }
                        ],
                        ['RESPONSABLE ', '']
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
                colSpan: 6,
                alignment: 'center',
            }, {}, {}, {}, {}, {}]
        );

        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'RECETA' + data.datos.id + '.pdf', base64: base64 });
        });
    }

})();