var document = { 'createElementNS': function() { return {} } };
var window = this;
var fecha_optima, fecha_media, fecha_hoy;
importScripts(
    '../../../scripts/pdfmake.min.js',
    '../../../scripts/vfs_fonts.js',
    '../../../scripts/moment.min.js'
);
importScripts('../../logos.js');

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
        var dd = [];
        var fila_extra = [];
        var donacion = [ 
                            { text: 'DONACION:', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.movimiento_metadato.donacion == null ? 'No disponible' : data.datos.movimiento_metadato.donacion == 1 || data.datos.movimiento_metadato.donacion == '1' ? 'Donación' : 'No disponible', style: 'tableHeader', alignment: 'left' },
                            { text: 'DONANTE:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            {},
                            { text: data.datos.movimiento_metadato.donante ? data.datos.movimiento_metadato.donante : 'No disponible', style: 'tableHeader',  colSpan:2, alignment: 'left' },
                            { },
                            { text: 'ENTREGA:', style: 'tableHeaderVerde', alignment: 'right' },
                            { text: data.datos.movimiento_metadato.persona_entrega ? data.datos.movimiento_metadato.persona_entrega : 'No disponible', style: 'tableHeader', colSpan:2, alignment: 'left' },
                            { }
                        ];   
        
        dd = {
            content: [{
                style: 'Movimiento',
                table: {
                    headerRows: 10,
                    dontBreakRows: true,
                    widths: [80, 70, 20, 'auto', 'auto', 'auto', 50, 50, 'auto'],
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
                        [{ text: 'SALIDA DE MEDICAMENTOS', style: 'tableHeaderTop', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {},{}, {} 
                        ],
                        [
                            { text: 'NOMBRE DE ALMACÉN', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.usuario.almacen_activo.nombre, style: 'tableHeader', colSpan: 2, alignment: 'left' }, 
                            {},
                            { text: 'FOLIO DE SALIDA', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            {},
                            { text: data.datos.id, style: 'tableHeader', colSpan: 3, alignment: 'left' },
                            {},
                            {}
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
                        [{ text: ' ', style: 'celdaEspacio', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],
                        [{ text: 'DETALLES DE LA SALIDA', style: 'tableHeaderLeyenda', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],

                        /**
                         * 
            clave_insumo: this.clave_insumo,
            tipo_controlado: this.tipo_controlado
                         */
                        [ 
                            { text: 'FECHA DE MOVIMIENTO:', style: 'tableHeaderVerde', colSpan:2, alignment: 'right' },
                            { },
                            { text: data.datos.fecha_movimiento ? data.datos.fecha_movimiento : 'No disponible', style: 'tableHeader', colSpan:2, alignment: 'left' },
                            { },
                            { text: 'UM Destino', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            { },
                            { text: data.datos.movimiento_metadato.unidad_medica ? data.datos.movimiento_metadato.unidad_medica.nombre : 'No disponible', style: 'tableHeader', colSpan: 3, alignment: 'left' },
                            { },
                            { },
                        ],
                        [
                            { text: 'TURNO', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            { },
                            { text: data.turno.nombre ? data.turno.nombre : data.turno, style: 'tableHeader', colSpan: 2, alignment: 'left' },
                            {},
                            { text: 'PROGRAMA', style: 'tableHeaderVerde', colSpan: 2, alignment: 'right' },
                            { },
                            { text: data.datos.programa_id == null ? 'No disponible' : data.datos.programa_id == 0 ? 'Sin programa' : data.datos.programa_id, style: 'tableHeader', colSpan: 3, alignment: 'left' },
                            { },
                            { }
                        ],

/*************************AQUI VAN DONACIONES O NO DONACIONES********************* */


                        [{ text: ' ', style: 'celdaEspacio', colSpan: 9, alignment: 'center' },
                            {}, {}, {}, {}, {}, {}, {}, {} 
                        ],
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
                headerClave: {
                    bold: true,
                    fontSize: 6.5,
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

        // for (var i in data.programas) {
        //     var programa = data.programas[i];
            
            // dd.content[0].table.body.push([
            //     { text: programa.nombre ? ' PROGRAMA: ' + programa.nombre + '. CLAVE: ' + programa.clave  : 'No disponible', style: 'tableHeaderAzul', colSpan: 9, alignment: 'left' },
            //     {},
            //     {},
            //     {},
            //     {},
            //     {},
            //     {},
            //     {},
            //     {}
            // ]);
            moment.locale('es');
                for (var j in data.lista) {
                    var insumo = data.lista[j];
                    dd.content[0].table.body.push(
                        [
                            { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center' },
                            { text: 'DESCRIPCION', style: 'tableHeaderVerde', colSpan: 5, alignment: 'center' },
                            { },
                            { },
                            { },
                            { },
                            { text: 'SUBTOTAL (Incluye IVA)', style: 'tableHeaderVerde', colSpan: 3, alignment: 'right' },
                            { },
                            { },
                        ],
                        [
                            { text: insumo.clave ? insumo.clave : 'No disponible' , style: 'headerClave', alignment: 'center' },
                            { text: insumo.descripcion ? insumo.descripcion : 'No disponible', style: 'headerClave', colSpan:5, alignment: 'left' },
                            {},
                            {},
                            {},
                            {},
                            { text: insumo.subtotal_con_iva == null ? 'No disponible' : '$ ' + Number(insumo.subtotal_con_iva).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableRow', colSpan:3, alignment: 'right' },
                            {},
                            {}
                        ],
                        [
                            { text: 'PROGRAMA', style: 'tableHeaderAzul', alignment: 'center' },
                            { text: 'LOTE', style: 'tableHeaderAzul', alignment: 'center' },
                            { text: 'CADUCIDAD', style: 'tableHeaderAzul', colSpan:2, alignment: 'center' },
                            { },
                            { text: 'CODIGO DE BARRAS', style: 'tableHeaderAzul', alignment: 'center' },
                            { text: 'CANTIDAD', style: 'tableHeaderAzul', alignment: 'center' },
                            { text: 'PRECIO UNITARIO', style: 'tableHeaderAzul', alignment: 'center' },
                            { text: 'IVA', style: 'tableHeaderAzul', alignment: 'center' },
                            { text: 'IMPORTE (Incluye IVA)', style: 'tableHeaderAzul', alignment: 'center' },
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
                            { text: lote.programa_nombre == null ? 'No disponible' : lote.programa_nombre, style: 'tableRow', alignment: 'center' },
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
                            { text: lote.codigo_barras  != null ? lote.codigo_barras : 'No disponible', style: 'tableRow', alignment: 'right' },
                            { text: lote.cantidad == null ? 'No disponible' : lote.cantidad, style: 'tableRow', alignment: 'right' },
                            { text: lote.precio_unitario == null ? 'No disponible' : ('$ ' + Number(lote.precio_unitario).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' },
                            { text: lote.iva == null ? 'No disponible' : ('$ ' + Number(lote.iva).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' },
                            { text: lote.importe_con_iva == null ? 'No disponible' : ('$ ' + Number(lote.importe_con_iva).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')), style: 'tableRow', alignment: 'right' }
                        ]);
                    }

                }
        // }


        dd.content[0].table.body.push(
            // Cantidades
            [
                { text: '\n' +
                        'SUBTOTAL:' +'\n' +
                        'IVA:' +'\n' +
                        'TOTAL:' + '\n', style: 'tableHeaderLeyenda', colSpan:7, alignment: 'right' },
                {},
                {},
                {},
                {},
                {},
                {},
                { text: '\n' +
                        '$ ' + Number(data.datos.subtotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '\n' +
                        '$ ' + Number(data.datos.iva).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '\n' +
                        '$ ' + Number(data.datos.total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '\n', style: 'tableHeaderLeyenda', colSpan:2, alignment: 'right' },
                {}
            ],

            // Firmas
            [{
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            { text: 'Observaciones: ' + data.datos.observaciones, alignment: 'left', colSpan: 3, style: 'tableRow' }, 
                            { },
                            { }
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
                colSpan: 9,
                alignment: 'center',
            }, {}, {}, {}, {}, {}]
        );
        
        data.firmas.documento.documento_cargos.splice(0, 0, {
        // data.firmas.documento.documento_cargos.push({
            cargo : {
                    id: null,
                    clave: null,
                    nombre: "--"
                },
            cargo_id:null,
            created_at:null,
            deleted_at:null,
            documento_sistema_id:null,
            firmante:{
                id: null,
                incremento: null,
                servidor_id: null,
                almacen_id: null,
                documento_sistema_cargo_id: null,
                nombre: data.datos.movimiento_metadato.persona_recibe
            },
            id:"1",
            leyenda:"RECIBIÓ",
            updated_at:null,
            usuario_id:"root"
        },
        {
            cargo : {
                    id: null,
                    clave: null,
                    nombre: "--"
                },
            cargo_id:null,
            created_at:null,
            deleted_at:null,
            documento_sistema_id:null,
            firmante:{
                id: null,
                incremento: null,
                servidor_id: null,
                almacen_id: null,
                documento_sistema_cargo_id: null,
                nombre: data.usuario.nombre + ' ' + data.usuario.apellidos
            },
            id:"1",
            leyenda:"ELABORÓ",
            updated_at:null,
            usuario_id:"root"
        });
        let cantidad_firmas = data.firmas.documento.documento_cargos.length;
        
        let filas_firmas_abajo = 3 - cantidad_firmas % 3;
        let contenido_body = [];
        for (let c =0; c < data.firmas.documento.documento_cargos.length; c++) {
            contenido_body.push(
                { text: data.firmas.documento.documento_cargos[c].leyenda + '\n\n\n\n\n\n' + data.firmas.documento.documento_cargos[c].firmante.nombre + '\n' + data.firmas.documento.documento_cargos[c].cargo.nombre, alignment: 'center', colSpan: 3, style: 'celdaEspacio'  },
                { },
                { }
            );
            if(data.firmas.documento.documento_cargos.length-1 == c && (filas_firmas_abajo == 1 || filas_firmas_abajo == 2)) {
                for( let i=0; i < filas_firmas_abajo; i++) {
                    contenido_body.push(
                        { text: '' + '\n\n\n\n\n\n' + '' + '\n' + '', colSpan: 3, style: 'celdaEspacio'  },
                        { },
                        { }
                    );
                }
            }
            if((c+1) % 3 == 0 || data.firmas.documento.documento_cargos.length-1 == c) {
                dd.content[0].table.body.push(contenido_body);
                contenido_body = [];
            }            
        }
        
        pdfMake.createPdf(dd).getBase64(function(base64) {
            postMessage({ fileName: 'SALIDA_ESTANDAR_MEDICAMENTO.pdf', base64: base64 });
        });
    }

})();