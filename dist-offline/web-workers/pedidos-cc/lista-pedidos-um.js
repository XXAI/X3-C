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
                    widths: [60, 'auto', 'auto', 'auto', 60, 'auto','auto', 'auto'],
                    body: [
                        [{
                            image: 'header',
                            width: 500,
                            style: 'tableHeaderTop',
                            colSpan: 8,
                            alignment: 'center'
                        }, {}, {}, {}, {}, {},{},{}],
                        [{ text: 'SIAL', style: 'titulo', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {},{}
                        ],
                        [{ text: 'PEDIDOS DE UNIDAD MÉDICA', style: 'tableHeaderTop', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {},{}
                        ],
                        [
                            { text: 'CLUES', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.clues_activa.clues, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {},
                            { text: 'NOMBRE DE CLUES', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' }, {},
                            { text: data.usuario.clues_activa.nombre, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {}
                        ],
                        [
                            { text: '', style: 'tableHeaderVerde', colSpan: 4, alignment: 'right' },
                            {},{}, {},
                            { text: 'NOMBRE DE ALMACÉN', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.almacen_activo.nombre, style: 'tableHeader', colSpan: 2, alignment: 'left' }, {}
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [{ text: 'DETALLES DE LISTA INICIALIZACIONES', style: 'tableHeaderLeyenda', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'DESDE:', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' }, 
                            {},
                            { text: data.fecha_desde == "" ? '- -' : data.fecha_desde.substr(0,10), style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            {},
                            { text: 'HASTA:', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' }, 
                            {},
                            { text: data.fecha_hasta == "" ? '- -' : data.fecha_hasta.substr(0,10), style: 'tableHeader', colSpan: 2, alignment: 'left' },    
                            {}
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'FECHA', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'FOLIO', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'MONTO DE COMPRA', style: 'tableHeaderVerde', alignment: 'center', colSpan: 2 },
                            {},
                            { text: 'MONTO CAUSES', style: 'tableHeaderVerde', alignment: 'center' ,colSpan: 2 },
                            {},
                            { text: 'MONTO NO CAUSES', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'ESTATUS', style: 'tableHeaderVerde', alignment: 'center' }
                        ]
                        //Body -> Salidas estandar
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
            // if(i == data.lista.length-1){
            //     break;
            // }
                dd.content[0].table.body.push([
                    { text: movimiento.fecha ? movimiento.fecha : 'No disponible' , style: 'tableRow', alignment: 'center' },
                    { text: movimiento.id ? movimiento.id : 'No disponible', style: 'tableRow', alignment: 'center' },
                    { text: movimiento.metadato_compra_consolidada.presupuesto_compra == null ? 'No disponible' : ('$ ' + Number(movimiento.metadato_compra_consolidada.presupuesto_compra).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), colSpan: 2, style: 'tableRow', alignment: 'right' },
                    {},
                    // movimiento.metadato_compra_consolidada.presupuesto_causes == null ? 'No disponible' : ('$ ' + Number(movimiento.metadato_compra_consolidada.presupuesto_causes).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
                    { text: movimiento.metadato_compra_consolidada.presupuesto_causes == null ? 'No disponible' : ('$ ' + Number(movimiento.metadato_compra_consolidada.presupuesto_causes).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), colSpan: 2, style: 'tableRow', alignment: 'right' },
                    {},
                    // text: movimiento.metadato_compra_consolidada.presupuesto_no_causes == null ? 'No disponible' : ('$ ' + Number(movimiento.metadato_compra_consolidada.presupuesto_no_causes).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
                    { text: movimiento.metadato_compra_consolidada.presupuesto_no_causes == null ? 'No disponible' : ('$ ' + Number(movimiento.metadato_compra_consolidada.presupuesto_no_causes).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' },
                    { text: movimiento.estatus == null ? 'No disponible' :  movimiento.estatus == 'FI' ? 'Finalizado' : 'Borrador', style: 'tableRow', alignment: 'center' }
                ]);
        }

        pdfMake.createPdf(dd).getBase64(function(base64) {
            fecha_hoy = moment().format('YYYY-MM-DD');
            postMessage({ fileName: 'LISTA_PEDIDOS_UM_'+ fecha_hoy +'.pdf', base64: base64 });
        });
    }

})();