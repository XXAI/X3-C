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
        let data = JSON.parse(evt.data)
        pdf(data);
        fechas();
    };

    function fechas() {
        fecha_optima = moment().add(365, 'days').format('YYYY-MM-DD');
        fecha_media = moment().add(183, 'days').format('YYYY-MM-DD');
        fecha_hoy = moment().format('YYYY-MM-DD');
        moment.locale('es');
        // console.log(moment().format('llll'));
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
                    widths: [80, 70, 'auto', 'auto', 20, 'auto', 40, 40],
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
                        [{ text: 'LISTA DE CADUCIDADES', style: 'tableHeaderTop', colSpan: 8, alignment: 'center' },
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
                        [{ text: 'DETALLES DE CADUCIDADES', style: 'tableHeaderLeyenda', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}
                        ],

                        /**
                         * 
            clave_insumo: this.clave_insumo,
            tipo_controlado: this.tipo_controlado
                         */
                        [ 
                            { text: 'TIPO DE CADUCIDAD:', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: 
                                data.tipo_busqueda == null ? 'No disponible' : 
                                data.tipo_busqueda == 'OPTIMA' ? 'CADUCIDAD ÓPTIMA' : 
                                data.tipo_busqueda == 'MEDIA' ? 'CADUCIDAD MEDIA' : 
                                data.tipo_busqueda == 'PROXIMA' ? 'PRÓXIMA A CADUCAR' : 
                                data.tipo_busqueda == 'CADUCADO' ? 'CADUCADOS':  data.tipo_busqueda, style: 'tableHeader', alignment: 'left' },
                            { text: 'BUSCAR EN:', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: 
                                data.buscar_en == null ? 'No disponible' : 
                                data.buscar_en == 'TODAS_LAS_CLAVES' ? 'TODAS LAS CLAVES' : 
                                data.buscar_en == 'MIS_CLAVES' ? 'MIS CLAVES' : 'No disponible', style: 'tableHeader', alignment: 'left' },
                            { text: 'TIPOS DE INSUMO:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            { },
                            { text: 
                                data.tipo_insumo == null ? 'No disponible' : 
                                data.tipo_insumo == 'MC' ? 'MATERIAL DE CURACIÓN' : 
                                data.tipo_insumo == 'ME' ? 'MEDICAMENTOS' : data.tipo_insumo, style: 'tableHeader', colSpan:2, alignment: 'left' },
                            {}
                        ],
                        [ 
                            { text: 'TIPO DE CAUSES:', style: 'tableHeaderVerde', alignment: 'right'},
                            { text: data.tipo_causes !== null ? data.tipo_causes : 'No disponible', style: 'tableHeader', alignment: 'left' },
                            { text: 'TIPO DE CONTROLADOS:', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.tipo_controlado == null ? 'No disponible' : data.tipo_controlado == 'NO_CONTROLADOS' ? 'NO CONTROLADOS' : data.tipo_controlado, style: 'tableHeader', alignment: 'left' },
                            { text: 'CLAVE DE INSUMO:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            { },
                            { text: 
                                data.clave_insumo == null ? 'No disponible' :
                                data.clave_insumo == '' ? '--' : data.clave_insumo, style: 'tableHeader', colSpan:2, alignment: 'left' },
                            { },
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 8, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'DESCRIPCION', style: 'tableHeaderVerde', colSpan: 2, alignment: 'center' },
                            {},
                            { text: 'LOTE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CADUCIDAD', style: 'tableHeaderVerde', colSpan: 2, alignment: 'center' },
                            { },
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

        fecha_optima = moment().add(365, 'days').format('YYYY-MM-DD');
        fecha_media = moment().add(183, 'days').format('YYYY-MM-DD');
        fecha_hoy = moment().format('YYYY-MM-DD');

        for (var i in data.lista) {
            var movimiento = data.lista[i];
            /* Este if es cuando mandan en la última posicion datos que no son del listado]
            if(i == data.lista.length-1){
                break;
            }*/
            var color_circulo;  
            if (movimiento.fecha_caducidad > fecha_optima) {
                color_circulo = 'green';
            }
            if(movimiento.fecha_caducidad >= fecha_media && movimiento.fecha_caducidad < fecha_optima){
                color_circulo = 'yellow';
            }
            if(movimiento.fecha_caducidad >= fecha_hoy && movimiento.fecha_caducidad < fecha_media){
                color_circulo = 'red';
            }
            if(movimiento.fecha_caducidad < fecha_hoy){
                color_circulo = 'black';
            }
            moment.locale('es');
                dd.content[0].table.body.push([
                    { text: movimiento.clave_insumo_medico ? movimiento.clave_insumo_medico : 'No disponible' , style: 'tableRow', alignment: 'center' },
                    { text: movimiento.descripcion ? movimiento.descripcion : 'No disponible', style: 'tableRow', colSpan:2, alignment: 'left' },
                    {},
                    { text: movimiento.lote == null ? 'No disponible' : movimiento.lote, style: 'tableRow', alignment: 'left' },
                    { canvas: [{
                            type: 'ellipse',
                            x: 12, y: 6.5,
                            color: color_circulo,
                            fillOpacity: 0.5,
                            r1: 5, r2: 5,
                            lineColor: 'black'
                        }]},
                    { text: movimiento.fecha_caducidad ? moment(movimiento.fecha_caducidad).format('LL') : 'No disponible', style: 'tableRow', alignment: 'right' },
                    { text: movimiento.existencia == null ? 'No disponible' : movimiento.existencia, style: 'tableRow', alignment: 'right' },
                    { text: movimiento.existencia_unidosis  != null ? movimiento.existencia_unidosis : 'No disponible', style: 'tableRow', alignment: 'right' }
                ]);
        }
        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'CADUCIDADES_INSUMO_MEDICOS.pdf', base64: base64 });
        });
    }

})();