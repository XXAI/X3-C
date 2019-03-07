

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
        //console.log(data.almacen.unidad_medica);
        pdf(data);
    };

    function pdf(movimientos) {
        let datos       = movimientos.datos;
        let almacen     = movimientos.almacen;
        let parametros  = movimientos.parametro;
        console.log(datos);
        /*console.log(movimientos);
        
        console.log(almacen);
        console.log(parametros);*/
        try{
            var contadorLineasHorizontalesV = 0;
            var COLOR_CELDA = '#eaf1dd';
            
            var dd = {
                content:[{
                    style: 'PEDIDO',
                    table: {
                        headerRows: 8,
                        dontBreakRows: true,
                        widths: [ 65, 55, 55, '*', 50,50, 60, 60],
                        body: [
                            [{
                                image: 'header',
                                width: 500,
                                style: 'tableHeaderTop', colSpan: 8, alignment: 'center' 
                            },{},{},{},{},{},{},{}],
                            [{ text: 'SECRETARIA DE SALUD\nINSTITUTO DE SALUD\n'+almacen.unidad_medica.nombre, style: 'tableHeaderTop', colSpan: 8, alignment: 'center' },{},{},{},{},{},{},{}],
                            [
                                { text: 'ALMACEN', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: almacen.nombre, style: 'tableHeader', alignment: 'center', colSpan:3},
                                {},{},
                                { text: 'No. DE LOTES', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: datos.length.toString(), style: 'tableHeader', alignment: 'center', colSpan:2},{}
                            ],
                            [
                                { text: 'PARAMETROS', style: 'tableHeaderVerde', alignment: 'center', colSpan:8},{},{},{},{},{},{},{}
                            ],
                            [
                                { text: 'PERIODO', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'DE '+parametros.desde+" A "+parametros.hasta, style: 'tableHeader', alignment: 'center', colSpan:3},
                                {},{},
                                { text: 'TIPO MOVIMIENTOS', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: ((parametros.tipo == 1)?'TODOS':((parametros.tipo == 2)?'ENTRADAS':'SALIDAS')), style: 'tableHeader', alignment: 'center', colSpan:2},{}
                            ],
                            [
                                { text: 'INSUMO', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: ((parametros.insumo == '')?'SIN DATO':parametros.insumo), style: 'tableHeader', alignment: 'center', colSpan:7}, {}, {},{}, {},{},{}
                            ],
                            [
                                { text: 'NO.', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'FECHA', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'TIPO', style: 'tableHeaderVerde', alignment: 'center'},
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
            let insumos = datos;
            for(var i in insumos){
                var insumo = insumos[i];
                dd.content[0].table.body.push([
                    { text: (parseInt(i)+1), style: 'tableRow',  alignment: 'center'},
                    { text: insumo.fecha_movimiento, style: 'tableRow', alignment: 'center'},
                    { text: insumo.nombre, style: 'tableRow',  alignment: 'left'},
                    { text: insumo.clave+" "+insumo.descripcion, style: 'tableRow', alignment: 'center'},
                    { text: insumo.cantidad, style: 'tableRow', alignment: 'center'},
                    { text: ((insumo.cantidad_unidosis)?insumo.cantidad_unidosis:'0'), style: 'tableRow', alignment: 'center'},
                    { text: '$ '+insumo.precio_unitario, style: 'tableRow', alignment: 'center'},
                    { text: '$ '+insumo.precio_total, style: 'tableRow', alignment: 'center'}
                    
                ]);
                subtotal = parseFloat(Math.round(subtotal * 100) / 100) + parseFloat(Math.round(insumo.precio_total * 100) / 100);
                iva = parseFloat(Math.round(iva * 100) / 100) + parseFloat(Math.round(insumo.iva * 100) / 100);
            }

            
            
            dd.content[0].table.body.push(
                // Footer
                [
                    {
                        text: '', 
                        style: 'tableHeader', alignment: 'justify', colSpan:3, rowSpan:3, 
                        
                    },'','',
                    {
                        //text: 'Facturar 2019 a nombre del Instituto de Salud. Unidad Administrativa Edif. C, Maya Tuxtla Gutiérrez, Chiapas, 29010 R.F.C. ISA-961203- QN5', 
                        text: '', 
                        style: 'tableHeader', alignment: 'justify', colSpan:3, rowSpan:3
                    },'','',
                    { text: 'SUBTOTAL', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+subtotal.toFixed(2), style: 'tableHeader', alignment: 'center'}
                ],
                ['','','','','','',{ text: 'IVA', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+iva.toFixed(2), style: 'tableHeader', alignment: 'center'}],
                ['','','','','','',{ text: 'TOTAL', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+(subtotal + iva).toFixed(2), style: 'tableHeader', alignment: 'center'}],
               
                
            );
            
            pdfMake.createPdf(dd).getBase64(function(base64) {
                
                postMessage({ fileName: 'MOVIMIENTOS.pdf', base64: base64 });
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
