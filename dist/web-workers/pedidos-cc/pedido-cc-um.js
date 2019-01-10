var document = { 'createElementNS': function() { return {} } };
var window = this;
var fecha_optima, fecha_media, fecha_hoy;
importScripts(
    '../../../scripts/pdfmake.min.js',
    '../../../scripts/vfs_fonts.js',
    '../../../scripts/moment.min.js'
);
importScripts('../logos.js');

(function() {
    'use strict';

    onmessage = function(evt) {
        let data = JSON.parse(evt.data);
        console.log(data);
        pdf(data);
        fechas();
    };

    function fechas() {
        fecha_optima = moment().add(365, 'days').format('YYYY-MM-DD');
        fecha_media = moment().add(183, 'days').format('YYYY-MM-DD');
        fecha_hoy = moment().format('YYYY-MM-DD');
        moment.locale('es');
    };

    function pdf(data) {
        var contadorLineasHorizontalesV = 0;
        var COLOR_CELDA = '#eaf1dd';
        var COLOR_PROGRAMA = '#ddeaf1';
        var dd = [];
        dd = {
            content: [{
                style: 'Movimiento',
                table: {
                    headerRows: 15, // 10,
                    dontBreakRows: true,
                    widths: [60, 70, 'auto', 'auto', 'auto', 50, 'auto', 50, 'auto'],
                    body: [
                        [{
                            image: 'header',
                            width: 500,
                            style: 'tableHeaderTop',
                            colSpan: 9,
                            alignment: 'center'
                        }, {}, {}, {}, {}, {},{},{},{}],
                        [{ text: 'SIAL', style: 'titulo', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {},{},{}
                        ],
                        [{ text: 'PEDIDO UNIDAD MÉDICA', style: 'tableHeaderTop', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {},{}, {} 
                        ],
                        [
                            { text: 'UNIDAD MÉDICA', style: 'tableHeaderVerde', colSpan: 5, alignment: 'center' },
                            {},
                            {}, 
                            {},
                            {},
                            { text: 'FOLIO:', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' }, 
                            {},
                            { text: data.datos.id, style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            {} 
                        ],
                        [
                            { text: 'MONTO TOTAL DEL PEDIDO:', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.monto_total ? ('$   ' + data.monto_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan: 3, alignment: 'left' }, 
                            {},
                            {},
                            { text: 'FECHA', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.datos.fecha, style: 'tableHeader', colSpan: 2, alignment: 'left' }, 
                            {} 
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],
                        [{ text: 'DETALLES DEL PEDIDO', style: 'tableHeaderLeyenda', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],
                        [ 
                            { text: 'PROGRAMA:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right'},
                            {},
                            { text: data.datos.programa_id ? data.datos.programa_id : 'No disponible', style: 'tableHeader', colSpan:3, alignment: 'left' },
                            {},
                            {},
                            { text: 'ENTREGA EN:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            { },
                            { text: data.datos.metadato_compra_consolidada.lugar_entrega ? data.datos.metadato_compra_consolidada.lugar_entrega == 'UM' ? 'Unidad Médica' : 'Almacén estatal' : 'No disponible', style: 'tableHeader', colSpan:2, alignment: 'left' },
                            { },
                        ],
                        [ 
                            { text: 'PRESUPUESTO DE COMPRA:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right'},
                            { },
                            { text: data.datos.metadato_compra_consolidada.presupuesto_compra ? ('$   ' + data.datos.metadato_compra_consolidada.presupuesto_compra.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan:3, alignment: 'left' },
                            { },
                            { },
                            { text: 'FECHA LÍMITE DE CAPTURA:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            { },
                            { text: data.datos.metadato_compra_consolidada.fecha_limite_captura ? data.datos.metadato_compra_consolidada.fecha_limite_captura : 'No disponible', style: 'tableHeader', colSpan:2, alignment: 'left' },
                            { },
                        ],
                        [ 
                            { text: 'PRESUPUESTO:', style: 'tableHeaderVerde', alignment: 'center'},
                            { text: 'CAUSES', style: 'tableHeaderVerde', colSpan:4, alignment: 'center' },
                            { },
                            { },
                            { },
                            { text: 'NO CAUSES', style: 'tableHeaderVerde', colSpan:4, alignment: 'center' },
                            { },
                            { },
                            { }
                        ],
                        [ 
                            { text: 'AUTORIZADO:', style: 'tableHeaderVerde', alignment: 'center'},
                            { text: data.datos.metadato_compra_consolidada.presupuesto_causes || data.datos.metadato_compra_consolidada.presupuesto_causes == 0 ? ('$   ' +  data.datos.metadato_compra_consolidada.presupuesto_causes.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan:4, alignment: 'right'  },
                            { },
                            { },
                            { },
                            { text: data.datos.metadato_compra_consolidada.presupuesto_no_causes || data.datos.metadato_compra_consolidada.presupuesto_no_causes == 0 ? ('$   ' +  data.datos.metadato_compra_consolidada.presupuesto_no_causes.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan:4, alignment: 'right'  },
                            { },
                            { },
                            { }
                        ],
                        [ 
                            { text: 'ASIGNADO:', style: 'tableHeaderVerde', alignment: 'center'},
                            { text: data.datos.metadato_compra_consolidada.presupuesto_causes_asignado || data.datos.metadato_compra_consolidada.presupuesto_causes_asignado == 0 ? ('$   ' +  data.datos.metadato_compra_consolidada.presupuesto_causes_asignado.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan:4, alignment: 'right'  },
                            { },
                            { },
                            { },
                            { text: data.datos.metadato_compra_consolidada.presupuesto_no_causes_asignado || data.datos.metadato_compra_consolidada.presupuesto_no_causes_asignado == 0 ?  ('$   ' +  data.datos.metadato_compra_consolidada.presupuesto_no_causes_asignado.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan:4, alignment: 'right'  },
                            { },
                            { },
                            { }
                        ],
                        [ 
                            { text: 'DISPONIBLE:', style: 'tableHeaderVerde', alignment: 'center'},
                            { text: data.datos.metadato_compra_consolidada.presupuesto_causes_disponible || data.datos.metadato_compra_consolidada.presupuesto_causes_disponible == 0 ? ('$   ' +  data.datos.metadato_compra_consolidada.presupuesto_causes_disponible.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan:4, alignment: 'right'  },
                            { },
                            { },
                            { },
                            { text: data.datos.metadato_compra_consolidada.presupuesto_no_causes_disponible || data.datos.metadato_compra_consolidada.presupuesto_no_causes_disponible == 0 ? ('$   ' +  data.datos.metadato_compra_consolidada.presupuesto_no_causes_disponible.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan:4, alignment: 'right'  },
                            { },
                            { },
                            { }
                        ],


                        [{ text: ' ', style: 'celdaEspacio', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],
                        [
                            { text: 'NP', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'DESCRIPCION', style: 'tableHeaderVerde', colSpan: 4, alignment: 'center' },
                            { },
                            { },
                            { },
                            { text: 'PRECIO', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CANTIDAD', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'IMPORTE', style: 'tableHeaderVerde', alignment: 'center' },
                        ]
                        //Body -> pedido-compra consolidada- DAM
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
                tableHeaderAzul: {
                    bold: true,
                    fontSize: 6,
                    color: 'black',
                    fillColor: COLOR_PROGRAMA,
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

        fecha_optima = moment().add(365, 'days').format('YYYY-MM-DD');
        fecha_media = moment().add(183, 'days').format('YYYY-MM-DD');
        fecha_hoy = moment().format('YYYY-MM-DD');

            moment.locale('es');
            let i_insumo = 0;
                for (var j in data.lista) {
                    console.log(data.lista[j])
                    var insumo = data.lista[j];
                    dd.content[0].table.body.push(
                        [
                            { text: i_insumo + 1 , style: 'tableRow', alignment: 'center' },
                            { text: insumo.insumo_medico_clave ? insumo.insumo_medico_clave : 'No disponible' , style: 'tableRow', alignment: 'center' },
                            { text: insumo.info_insumo.descripcion ? insumo.info_insumo.descripcion : 'No disponible' , style: 'tableRow', colSpan:4, alignment: 'left' },
                            { },
                            { },
                            { },
                            { text: insumo.precio_unitario ?  ('$   ' + Number(insumo.precio_unitario).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible' , style: 'tableRow', alignment: 'center' },
                            { text: insumo.cantidad_solicitada ? insumo.cantidad_solicitada : 'No disponible' , style: 'tableRow', alignment: 'center' },
                            { text: insumo.monto_solicitado ? ('$   ' + Number(insumo.monto_solicitado).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible' , style: 'tableRow', alignment: 'center' }
                        ],
                    );
                    i_insumo++;
                }


        dd.content[0].table.body.push(
            // Footer
            [
                { text: "", style: 'tableHeader', colSpan: 9, alignment: 'center' },
                '', '', '', '', '', '', '', ''
            ],

            // Firmas
            [{
                table: {
                    widths: ['*', '*'],
                    body: [
                        [
                            { text: '\n\n\n\n' + '' + 'Nombre de responsables', rowSpan: 2, style: 'tableRow' }, 
                            { text: "Observaciones", style: 'text' }
                        ],
                        [
                            '', 
                            { text: '\n' + data.datos.observaciones, rowSpan: 2, alignment: 'justify' }
                        ],
                        ['RESPONSABLES ', '']
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
                colSpan: 9,
                alignment: 'center',
            }, {}, {}, {}, {}, {}]
        );

        
        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'Pedido_UM_'+ data.datos.fecha + '.pdf', base64: base64 });
        });
    }

})();