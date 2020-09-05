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
        var COLOR_PROGRAMA = '#ddeaf1';
        var dd = {
            content: [{
                style: 'Movimiento',
                table: {
                    headerRows: 10,
                    dontBreakRows: true,
                    widths: [80, 70, 20, 'auto', 'auto', 40, 40, 'auto', 'auto'],
                    body: [
                        [{
                            image: 'header',
                            width: 500,
                            style: 'tableHeaderTop',
                            colSpan: 9,
                            alignment: 'center'
                        }, {}, {}, {}, {}, {},{},{},{}],
                        [{ text: 'SSADII', style: 'titulo', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {},{},{}
                        ],
                        [{ text: 'REPORTE DE INICIALIZACION DE INVENTARIO', style: 'tableHeaderTop', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {},{}, {} 
                        ],
                        [
                            { text: 'CLUES', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.clues_activa.clues, style: 'tableHeader', colSpan: 2, alignment: 'left' }, 
                            {},
                            { text: 'NOMBRE DE CLUES', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' }, 
                            {},
                            { text: data.usuario.clues_activa.nombre, style: 'tableHeader', colSpan: 3, alignment: 'left' }, 
                            {}, {} 
                        ],
                        [
                            { text: 'MONTO TOTAL DEL INVENTARIO', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.datos.monto_total ? ('$ ' + data.datos.monto_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : 'No disponible', style: 'tableHeader', colSpan: 2, alignment: 'left' }, 
                            {},
                            { text: 'NOMBRE DE ALMACÉN', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.almacen_activo.nombre, style: 'tableHeader', colSpan: 3, alignment: 'left' }, 
                            {}, {} 
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],
                        [{ text: 'DETALLES DE LA INICIALIZACION', style: 'tableHeaderLeyenda', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],

                        /**
                         * 
            clave_insumo: this.clave_insumo,
            tipo_controlado: this.tipo_controlado
                         */
                        [ 
                            { text: 'TOTAL DE PROGRAMAS:', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.cantidad_programas ? data.datos.cantidad_programas : 'No disponible', style: 'tableHeader', alignment: 'left' },
                            { text: 'TOTAL DE CLAVES:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            {},
                            { text: data.datos.cantidad_claves ? data.datos.cantidad_claves : 'No disponible', style: 'tableHeader', alignment: 'left' },
                            { text: 'TOTAL DE INSUMOS:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            { },
                            { text: data.datos.cantidad_insumos ? data.datos.cantidad_insumos : 'No disponible', colSpan:2,  style: 'tableHeader', alignment: 'left'  },
                            {}
                        ],
                        [ 
                            { text: 'TOTAL DE LOTES:', style: 'tableHeaderVerde', alignment: 'right'},
                            { text: data.datos.cantidad_lotes ? data.datos.cantidad_lotes : 'No disponible', style: 'tableHeader', alignment: 'left' },
                            { text: 'FECHA INICIO:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            {},
                            { text: data.datos.fecha_inicio ? data.datos.fecha_inicio : 'No disponible', style: 'tableHeader', alignment: 'left' },
                            { text: 'FECHA FINAL:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            { },
                            { text: data.datos.fecha_fin ? data.datos.fecha_fin : 'No disponible', style: 'tableHeader', colSpan:2, alignment: 'left' },
                            { },
                        ],
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],
                        [
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'LOTE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'CADUCIDAD', style: 'tableHeaderVerde', colSpan: 2, alignment: 'center' },
                            { },
                            { text: 'EXISTENCIA', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'EXISTENCIA UNIDOSIS', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'PRECIO UNITARIO', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'IMPORTE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'IVA', style: 'tableHeaderVerde', alignment: 'center' },
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

        for (var i in data.programas) {
            var programa = data.programas[i];
            
            dd.content[0].table.body.push([
                { text: programa.nombre ? ' PROGRAMA: ' + programa.nombre + '. CLAVE: ' + programa.clave  : 'No disponible', style: 'tableHeaderAzul', colSpan: 9, alignment: 'left' },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ]);
            moment.locale('es');
                for (var j in programa.insumos) {
                    var insumo = programa.insumos[j];
                    dd.content[0].table.body.push([
                        { text: insumo.clave_insumo_medico ? insumo.clave_insumo_medico : 'No disponible' , style: 'tableHeaderVerde', alignment: 'center' },
                        { text: insumo.descripcion ? insumo.descripcion : 'No disponible', style: 'tableHeaderVerde', colSpan:5, alignment: 'left' },
                        {},
                        {},
                        {},
                        {},
                        { text: insumo.subtotal == null ? 'No disponible' : '$ ' + insumo.subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeaderVerde', colSpan:3, alignment: 'right' },
                        {},
                        {}
                    ]);
                    
                    for (var l in insumo.lotes) {
                        var lote = insumo.lotes[l];
                        var color_circulo;  
                        if (lote.fecha_caducidad > fecha_optima) {
                            color_circulo = 'green';
                        }
                        if(lote.fecha_caducidad >= fecha_media && lote.fecha_caducidad < fecha_optima){
                            color_circulo = 'yellow';
                        }
                        if(lote.fecha_caducidad >= fecha_hoy && lote.fecha_caducidad < fecha_media){
                            color_circulo = 'red';
                        }
                        if(lote.fecha_caducidad < fecha_hoy){
                            color_circulo = 'black';
                        }
                        dd.content[0].table.body.push([
                            { text: lote.exclusivo == null ? 'No disponible' : lote.exclusivo == 1 ? 'Exclusivo' : '' , style: 'tableRow', alignment: 'center' },
                            { text: lote.lote == null ? 'No disponible' : lote.lote, style: 'tableRow', alignment: 'left' },
                            { canvas: [{
                                    type: 'ellipse',
                                    x: 12, y: 6.5,
                                    color: color_circulo,
                                    fillOpacity: 0.5,
                                    r1: 5, r2: 5,
                                    lineColor: 'black'
                                }]},
                            { text: lote.fecha_caducidad ? moment(lote.fecha_caducidad).format('LL') : 'No disponible', style: 'tableRow', alignment: 'right' },
                            { text: lote.existencia == null ? 'No disponible' : lote.existencia, style: 'tableRow', alignment: 'right' },
                            { text: lote.existencia_unidosis  != null ? lote.existencia_unidosis : 'No disponible', style: 'tableRow', alignment: 'right' },
                            { text: lote.precio_unitario == null ? 'No disponible' : ('$ ' + Number(lote.precio_unitario).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' },
                            { text: lote.importe == null ? 'No disponible' : ('$ ' + Number(lote.importe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' },
                            { text: lote.iva_importe == null ? 'No disponible' : ('$ ' + Number(lote.iva_importe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' }
                        ]);
                    }

                }
        }
        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'INICIALIZACION_INVENTARIO.pdf', base64: base64 });
        });
    }

})();