

var document = { 'createElementNS': function(){ return {} } };
var window = this;
importScripts(
    '../../../scripts/pdfmake.min.js',
    '../../../scripts/vfs_fonts.js',
    '../../../scripts/moment.min.js'
);
importScripts('../logos.js');

(function() { 
    'use strict';

    onmessage = function( evt ) {
        let data = JSON.parse(evt.data);
        //console.log(data.datos);
        pdf(data.datos);
    };

    function pdf(movimiento) {
        try{
            var contadorLineasHorizontalesV = 0;
            var COLOR_CELDA = '#eaf1dd';
            
            var dd = {
                content:[{
                    style: 'PEDIDO',
                    table: {
                        headerRows: 7,
                        dontBreakRows: true,
                        widths: [ 65, 55, '*', 55, 50,50, 60],
                        body: [
                            [{
                                image: 'header',
                                width: 500,
                                style: 'tableHeaderTop', colSpan: 7, alignment: 'center' 
                            },{},{},{},{},{},{}],
                            [{ text: 'SECRETARIA DE SALUD\nINSTITUTO DE SALUD\n'+movimiento.almacen.unidad_medica.nombre, style: 'tableHeaderTop', colSpan: 7, alignment: 'center' },{},{},{},{},{},{}],
                            [
                                { text: 'FECHA MOVIMIENTO', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: movimiento.fecha_movimiento, style: 'tableHeader', alignment: 'center', colSpan:2},{},
                                { text: "TIPO MOVMIENTO", style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},{ text: movimiento.tipo_movimiento.nombre, style: 'tableHeader', alignment: 'center', colSpan:2 },{}
                            ],
                            [
                                { text: 'ALMACEN', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: movimiento.almacen.nombre, style: 'tableHeader', alignment: 'center', colSpan:2},
                                {},
                                { text: 'No. DE LOTES', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: movimiento.insumos_detalles.length.toString(), style: 'tableHeader', alignment: 'center', colSpan:2},{}
                            ],
                            [
                                { text: 'NO.', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'INSUMO', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'CANTIDAD', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'CANTIDAD UNIDOSIS', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'PRECIO U.', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'SUBTOTAL', style: 'tableHeaderVerde', alignment: 'center'}
                            ],
                            // Footer
                        ]
                    },
                    layout: {
                        paddingTop: function(i, node) { return 0; },
                        paddingBottom: function(i, node) { return 0; },
                        paddingLeft: function(i, node) { return 0; },
                        paddingRight: function(i, node) { return 0; },
                        hLineWidth: function(i, node){
                            if (i<2 ){ 
                                return 0;
                            } else {
                                return 0.25
                            }
                            //return (i === 0 || i === node.table.body.length) ? 0.5: 0.5;
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
                            if (contadorLineasHorizontalesV > 4) {
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
                    return { style: 'piePagina', text: 'Página '+currentPage.toString() +' de '+ pageCount, alignment:'center'};
                },
                styles: {
                    tableHeaderTop: {
                        bold: true,
                        fontSize: 8,
                        color: 'black',
                        margin: [3,3,3,3]
                    },
                    tableHeaderLeyenda: {
                        bold: false,
                        italics:true,
                        fontSize: 8,
                        color: 'black',
                        margin: [1,1,1,1]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 6,
                        color: 'black',
                        margin: [3,3,3,3]
                    },
                    tableHeaderVerde: {
                        bold: true,
                        fontSize: 6,
                        color: 'black',
                        fillColor: COLOR_CELDA,
                        margin: [3,3,3,3]
                        
                    },
                    tableHeaderData: {
                        bold: false,
                        fontSize: 6,
                        color: 'black',
                        margin: [3,3,3,3]
                    },
                    tableRow: {
                        bold:false,
                        fontSize: 6,
                        color: 'black',
                        margin: [3,3,3,3]
                    },
                    tableFooter: {
                        bold:true,
                        fontSize: 6,
                        color: 'black',
                        margin: [3,3,3,3]
                    },
                    piePagina: {
                        fontSize: 6,
                        italics:true,
                        bold: false
                    }
                },
                defaultStyle: {
                    // alignment: 'justify'
                },
                images:{
                    header: HEADER,
                    marca: HEADER
                }
            }

            //var para_iva = 0;
            let iva = 0;
            let subtotal = 0;
            let insumos = movimiento.insumos_detalles;
            for(var i in insumos){
                var insumo = insumos[i];
                //console.log(insumo);
                let precio_insumo = parseFloat(insumo.precio_unitario).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                let precio_total = parseFloat(insumo.precio_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                dd.content[0].table.body.push([
                    { text: (parseInt(i)+1), style: 'tableRow',  alignment: 'center'},
                    { text: insumo.detalles.clave, style: 'tableRow', alignment: 'center'},
                    { text: insumo.detalles.descripcion, style: 'tableRow',  alignment: 'left'},
                    { text: insumo.cantidad, style: 'tableRow', alignment: 'center'},
                    { text: ((insumo.cantidad_unidosis)?insumo.cantidad_unidosis:'0'), style: 'tableRow', alignment: 'center'},
                    { text: '$ '+precio_insumo, style: 'tableRow', alignment: 'center'},
                    { text: '$ '+precio_total.replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableRow', alignment: 'center'}
                    
                ]);

                //console.log();
                subtotal = parseFloat(Math.round(subtotal * 100) / 100) + parseFloat(Math.round(insumo.precio_total * 100) / 100);
                iva = parseFloat(Math.round(iva * 100) / 100) + parseFloat(Math.round(insumo.iva * 100) / 100);
                
            }

            
            
            dd.content[0].table.body.push(
                // Footer
                [
                    {
                        text: '', 
                        style: 'tableHeader', alignment: 'justify', colSpan:2, rowSpan:3, 
                        /*image: 'marca',
                        fit: [100, 100],
                        style: '', colSpan: 2, rowSpan:3, alignment: 'center' ,*/
                    },'',
                    {
                        text: 'Facturar 2019 a nombre del Instituto de Salud. Unidad Administrativa Edif. C, Maya Tuxtla Gutiérrez, Chiapas, 29010 R.F.C. ISA-961203- QN5', 
                        style: 'tableHeader', alignment: 'justify', colSpan:3, rowSpan:3
                    },'','',
                    { text: 'SUBTOTAL', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'}
                ],
                ['','','','','',{ text: 'IVA', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+iva.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'}],
                ['','','','','',{ text: 'TOTAL', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+(subtotal + iva).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'}],
                [{ text: 'TIEMPO DE ENTREGA: Deberá surtir los insumos en un periodo no mayor a 20 dias.', style: 'tableHeaderVerde',  alignment: 'justify', colSpan:7},'','','','','',''],
                // Firmas
                [{
                    table: {
                        widths: [ '*', '*',  '*'],
                        body: [
                            [
                                {text:'\n\n\n\n'+((movimiento.almacen.encargado_almacen)?movimiento.almacen.encargado_almacen.nombre:'SIN ASIGNAR'),style:'tableRow'},
                                {text:'',style:'tableRow', rowSpan:2},
                                {text:'\n\n\n\n'+((movimiento.almacen.unidad_medica.director)?movimiento.almacen.unidad_medica.director.nombre:'SIN ASIGNAR'),style:'tableRow'}
                                
                            ],
                            [
                                'RESPONSABLE DEL ALMACEN',
                                '',
                                'DIRECTOR DE LA UNIDAD MÉDICA'
                            ]
                        ],
                    },
                    layout:{
                        hLineWidth: function(i, node) {
                            if (i == 0 || i == 3){
                                return 0;
                            }
                            return 0.5;
                        },
                        vLineWidth: function(i, node) {
                            if (i == 0 || i == 3){
                                return 0;
                            }
                            return 0.5;
                        },
                    },
                    style: 'tableHeader', 	margin: [0, 0, 0, 0],colSpan: 7, alignment: 'center' ,
                },{},{},{},{},{}]
            );
            
            pdfMake.createPdf(dd).getBase64(function(base64) {
                
                postMessage({ fileName: 'REPORTE_MOVIMIENTO.pdf', base64: base64 });
            });
           
        }catch(e){
            console.log(e);
            //throw {error:e };
        }
    }

   /**
     * Number.prototype.format(n, x)
     * 
     * @param integer n: length of decimal
     * @param integer x: length of sections
     */
    Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };
})();
