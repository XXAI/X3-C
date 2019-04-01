

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
        
        try{
            var contadorLineasHorizontalesV = 0;
            var COLOR_CELDA = '#eaf1dd';
            
            var dd = {
                content:[{
                    style: 'PEDIDO',
                    table: {
                        headerRows: 11,
                        dontBreakRows: true,
                        widths: [ 25, 45, 55, '*', 40,40, 40, 40,40, 40, 40],
                        body: [
                            [{
                                image: 'header',
                                width: 550,
                                style: 'tableHeaderTop', colSpan: 11, alignment: 'center' 
                            },{},{},{},{},{},{},{},{},{},{}],
                            [{ text: 'SECRETARIA DE SALUD\nINSTITUTO DE SALUD\n'+almacen.unidad_medica.nombre, style: 'tableHeaderTop', colSpan: 11, alignment: 'center' },{},{},{},{},{},{},{},{},{},{}],
                            [
                                { text: 'ALMACEN', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: almacen.nombre, style: 'tableHeader', alignment: 'center', colSpan:5},
                                {},{},{},{},
                                { text: 'No. DE LOTES', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: datos.length.toString(), style: 'tableHeader', alignment: 'center', colSpan:2},{}
                            ],
                            [
                                { text: 'PARAMETROS', style: 'tableHeaderVerde', alignment: 'center', colSpan:11},{},{},{},{},{},{},{},{},{},{}
                            ],
                            [
                                { text: 'PERIODO', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: 'DE '+parametros.desde+" A "+parametros.hasta, style: 'tableHeader', alignment: 'center', colSpan:5},
                                {},{},{},{},
                                { text: 'TIPO MOVIMIENTOS', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: ((parametros.tipo == 1)?'TODOS':((parametros.tipo == 2)?'ENTRADAS':'SALIDAS')), style: 'tableHeader', alignment: 'center', colSpan:2},{}
                            ],
                            [
                                { text: 'INSUMO', style: 'tableHeaderVerde', alignment: 'center', colSpan:2},{},
                                { text: ((parametros.insumo == '')?'SIN DATO':parametros.insumo), style: 'tableHeader', alignment: 'center', colSpan:9}, {},{},{},{},{},{},{},{}
                            ],
                            [
                                { text: 'NO.', style: 'tableHeaderVerde', alignment: 'center', rowSpan: 2},
                                { text: 'FECHA', style: 'tableHeaderVerde', alignment: 'center', rowSpan: 2},
                                { text: 'TIPO', style: 'tableHeaderVerde', alignment: 'center', rowSpan: 2},
                                { text: 'INSUMO', style: 'tableHeaderVerde', alignment: 'center', rowSpan: 2},
                                { text: 'PRECIO U.', style: 'tableHeaderVerde', alignment: 'center', rowSpan: 2},
                                { text: 'ENTRADA', style: 'tableHeaderVerde', alignment: 'center', colSpan:3}, {},{},
                                { text: 'SALIDA', style: 'tableHeaderVerde', alignment: 'center', colSpan:3}, {},{}
                            ],
                            [
                                {},{},{},{},{},
                                { text: 'CANTIDAD', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'UNIDOSIS', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'SUBTOTAL', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'CANTIDAD', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'UNIDOSIS', style: 'tableHeaderVerde', alignment: 'center'},
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
            let iva_entrada = 0;
            let iva_salida = 0;
            let subtotal_entrada = 0;
            let subtotal_salida = 0;
            let insumos = datos;
            let cantidad_entradas = 0;
            let cantidad_unidosis_entradas = 0;
            let cantidad_salidas = 0;
            let cantidad_unidosis_salidas = 0;
            for(var i in insumos){
                var insumo = insumos[i];
                let precio_insumo = parseFloat(insumo.precio_unitario).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                let precio_total = parseFloat(insumo.precio_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                if(insumo.tipo == "E")
                {
                    
                    dd.content[0].table.body.push([
                        { text: (parseInt(i)+1), style: 'tableRow',  alignment: 'center'},
                        { text: insumo.fecha_movimiento, style: 'tableRow', alignment: 'center'},
                        { text: insumo.nombre, style: 'tableRow',  alignment: 'left'},
                        { text: insumo.clave+" "+insumo.descripcion, style: 'tableRow', alignment: 'center'},
                        { text: '$ '+precio_insumo, style: 'tableRow', alignment: 'center'},
                        { text: insumo.cantidad, style: 'tableRow', alignment: 'center'},
                        { text: ((insumo.cantidad_unidosis)?insumo.cantidad_unidosis:'0'), style: 'tableRow', alignment: 'center'},
                        { text: '$ '+precio_total, style: 'tableRow', alignment: 'center'},
                        { text: '-', style: 'tableRow', alignment: 'center'},
                        { text: '-', style: 'tableRow', alignment: 'center'},
                        { text: '-', style: 'tableRow', alignment: 'center'}
                        
                    ]);
                    cantidad_entradas = parseFloat(Math.round(cantidad_entradas * 100) / 100) + parseFloat(Math.round(insumo.cantidad * 100) / 100);
                    cantidad_unidosis_entradas = parseFloat(Math.round(cantidad_unidosis_entradas * 100) / 100) + parseFloat(Math.round( ((insumo.cantidad_unidosis)?insumo.cantidad_unidosis:0) * 100) / 100);
                    
                    subtotal_entrada = parseFloat(Math.round(subtotal_entrada * 100) / 100) + parseFloat(Math.round(insumo.precio_total * 100) / 100);
                    iva_entrada = parseFloat(Math.round(iva_entrada * 100) / 100) + parseFloat(Math.round(insumo.iva * 100) / 100);
                }else if(insumo.tipo == "S")
                {
                    dd.content[0].table.body.push([
                        { text: (parseInt(i)+1), style: 'tableRow',  alignment: 'center'},
                        { text: insumo.fecha_movimiento, style: 'tableRow', alignment: 'center'},
                        { text: insumo.nombre, style: 'tableRow',  alignment: 'left'},
                        { text: insumo.clave+" "+insumo.descripcion, style: 'tableRow', alignment: 'center'},
                        { text: '$ '+precio_insumo, style: 'tableRow', alignment: 'center'},
                        { text: '-', style: 'tableRow', alignment: 'center'},
                        { text: '-', style: 'tableRow', alignment: 'center'},
                        { text: '-', style: 'tableRow', alignment: 'center'},
                        { text: insumo.cantidad, style: 'tableRow', alignment: 'center'},
                        { text: ((insumo.cantidad_unidosis)?insumo.cantidad_unidosis:'0'), style: 'tableRow', alignment: 'center'},
                        { text: '$ '+precio_total, style: 'tableRow', alignment: 'center'},
                        
                        
                    ]);
                    cantidad_salidas = parseFloat(Math.round(cantidad_salidas * 100) / 100) + parseFloat(Math.round(insumo.cantidad * 100) / 100);
                    cantidad_unidosis_salidas = parseFloat(Math.round(cantidad_unidosis_salidas * 100) / 100) + parseFloat(Math.round( ((insumo.cantidad_unidosis)?insumo.cantidad_unidosis:0) * 100) / 100);
                    subtotal_salida = parseFloat(Math.round(subtotal_salida * 100) / 100) + parseFloat(Math.round(insumo.precio_total * 100) / 100);
                    iva_salida = parseFloat(Math.round(iva_salida * 100) / 100) + parseFloat(Math.round(insumo.iva * 100) / 100);
                }
                
            }

            
            
            dd.content[0].table.body.push(
                // Footer
                [
                    { text: '', style: 'tableHeader', alignment: 'justify', colSpan:4, rowSpan:3},{},{},{},
                    { text: 'SUBTOTAL', style: 'tableHeaderVerde',  alignment: 'center'},
                    { text: '-', style: 'tableHeader', alignment: 'center', colSpan:2},{ },
                    { text: '$ '+subtotal_entrada.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'},
                    { text: '-', style: 'tableHeader', alignment: 'center', colSpan:2},{ },
                    { text: '$ '+subtotal_salida.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'}
                ],
                [   {},{},{},{},
                    { text: 'IVA', style: 'tableHeaderVerde',  alignment: 'center'},
                    { text: '-', style: 'tableHeader', alignment: 'center', colSpan:2},{ },
                    { text: '$ '+iva_entrada.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'},
                    { text: '-', style: 'tableHeader', alignment: 'center', colSpan:2},{ },
                    { text: '$ '+iva_salida.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'}
                ],
                [   {},{},{},{},
                    { text: 'TOTAL', style: 'tableHeaderVerde',  alignment: 'center'},
                    { text: cantidad_entradas, style: 'tableHeader',  alignment: 'center'},
                    { text: cantidad_unidosis_entradas, style: 'tableHeader',  alignment: 'center'}, 
                    { text: '$ '+(subtotal_entrada + iva_entrada).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'},
                    { text: cantidad_salidas, style: 'tableHeader',  alignment: 'center'},
                    { text: cantidad_unidosis_salidas, style: 'tableHeader',  alignment: 'center'},  
                    { text: '$ '+(subtotal_salida + iva_salida).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'), style: 'tableHeader', alignment: 'center'}
                ]
               
                
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
