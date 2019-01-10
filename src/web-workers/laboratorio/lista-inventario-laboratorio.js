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
                    headerRows: 10,
                    dontBreakRows: true,
                    //widths: [ 35, 70, 'auto', 'auto', 40 , 45, 45],
                    widths: [80, 70, 'auto', 'auto', 'auto', 'auto', 40, 40],
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
                        [{ text: 'LISTA DE EXISTENCIAS DE LABORATORIO', style: 'tableHeaderTop', colSpan: 8, alignment: 'center' },
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
                        [{ text: 'DETALLES DE EXISTENCIA', style: 'tableHeaderLeyenda', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [ 
                            { text: 'EXISTENCIA:', style: 'tableHeaderVerde',    alignment: 'right' },
                            { text: data.seleccionar == "TODO" ? 'TODO' : data.seleccionar, colSpan: 3, style: 'tableHeader', alignment: 'left' },
                            {},
                            {},
                            { text: 'TIPO DE SUSTANCIA:', style: 'tableHeaderVerde',  alignment: 'right' },
                            { text: data.tipo_sustancia == "TODO" ? 'TODOS INSUMOS DE LABORATORIO' : 
                            data.tipo_sustancia == 1 || data.tipo_sustancia == '1' ? 'SUSTANCIAS QUÍMICAS' :
                            data.tipo_sustancia == 2 || data.tipo_sustancia == '2' ? 'MATERIAL' : 
                            data.tipo_sustancia == 3 || data.tipo_sustancia == '3' ? 'PRODUCTOS QUÍMICOS' :
                            data.tipo_sustancia == 4 || data.tipo_sustancia == '4' ? 'CONSUMIBLES' : 'No disponible', style: 'tableHeader', colSpan: 3, alignment: 'left' },
                            {},
                            // { text: 'BUSCAR EN:', style: 'tableHeaderVerde', alignment: 'right' },
                            // { text: '', style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            {},
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'DESCRIPCION', style: 'tableHeaderVerde', colSpan: 2, alignment: 'center' },
                            {},
                            { text: 'CPD', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CPS', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CPM', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'EXISTENCIA', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'EXISTENCIA UNIDOSIS', style: 'tableHeaderVerde', alignment: 'center' },
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
            /* Este if es cuando mandan en la última posicion datos que no son del listado]
            if(i == data.lista.length-1){
                break;
            }*/
                dd.content[0].table.body.push([
                    { text: movimiento.clave_insumo_medico ? movimiento.clave_insumo_medico : 'No disponible' , style: 'tableRow', alignment: 'center' },
                    { text: movimiento.descripcion ? movimiento.descripcion : 'No disponible', style: 'tableRow', colSpan:2, alignment: 'left' },
                    {},
                    { text: movimiento.movimiento_metadato == null ? 'No disponible' : movimiento.movimiento_metadato.turno.nombre, style: 'tableRow', alignment: 'center' },
                    { text: movimiento.numero_claves == null || movimiento.numero_insumos == null ? 'No disponible' : 'Claves: ' + movimiento.numero_claves + '\n Insumos: ' + movimiento.numero_insumos, style: 'tableRow', alignment: 'center' },
                    { text: movimiento.movimiento_metadato == null ? 'No disponible' :  movimiento.movimiento_metadato.persona_recibe, style: 'tableRow', alignment: 'center' },
                    { text: movimiento.existencia == null ? 'No disponible' : movimiento.existencia, style: 'tableRow', alignment: 'center' },
                    { text: movimiento.existencia_unidosis  != null ? movimiento.existencia_unidosis : 'No disponible', style: 'tableRow', alignment: 'center' }
                ]);
        }
        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'Existencia_insumos_laboratorio.pdf', base64: base64 });
        });
    }

})();