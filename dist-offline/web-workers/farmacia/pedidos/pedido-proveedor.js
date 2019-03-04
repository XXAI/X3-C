

var document = { 'createElementNS': function(){ return {} } };
var window = this;
importScripts( '../../../scripts/pdfmake.min.js', '../../../scripts/vfs_fonts.js');
importScripts('../../logos.js');

(function() { 
    'use strict';

    onmessage = function( evt ) {
        let data = JSON.parse(evt.data)
        //console.log(evt);
        pdf(data);
    };

    function pdf(pedido) {
        //console.log(pedido);
        try{
            var contadorLineasHorizontalesV = 0;
            var COLOR_CELDA = '#eaf1dd';
            
            var lista_insumos = pedido.insumos.lista;
            var insumos = [];
            for(var i in lista_insumos){
                var insumo = lista_insumos[i];
                insumos.push({
                    tipo: insumo.tipo,
                    lote: insumo.lote.toString(),
                    clave: insumo.clave,
                    descripcion: insumo.descripcion,
                    unidad: 'PIEZA',
                    cantidad:insumo.cantidad,
                    precio: insumo.precio,
                    total: insumo.monto
                });
            }
            
            if(pedido.datos.fecha_concluido){
                pedido.datos.fecha_concluido = pedido.datos.fecha_concluido.substring(0,10);
            }else{
                pedido.datos.fecha_concluido = 'Sin Concluir';
            }

            if(!pedido.datos.proveedor){
                pedido.datos.proveedor = {nombre:'Sin Proveedor Asignado'};
            }
            

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
                            [{ text: 'SECRETARIA DE SALUD\nINSTITUTO DE SALUD\n'+pedido.datos.almacen_solicitante.unidad_medica.nombre+'\nPEDIDO PARA '+pedido.insumos.titulo, style: 'tableHeaderTop', colSpan: 7, alignment: 'center' },{},{},{},{},{}],
                            [
                                { text: 'PEDIDO DE ABASTOS A UNIDADES MEDICAS EN RELACION AL CONTRATO ABIERTO DE PRESTACION DE SERVICIO.', style: 'tableHeaderVerde', colSpan: 7, alignment: 'center' },{},{},{},{},{},{}
                            ],
                            [
                                { text: 'NOMBRE DEL PEDIDO', style: 'tableHeaderVerde', colSpan: 2, alignment: 'center' },{},
                                { text: pedido.datos.descripcion, style: 'tableHeader', alignment: 'center', colSpan:2},{},
                                { text: 'FOLIO', style: 'tableHeaderVerde',  alignment: 'center'},
                                { text: pedido.datos.folio+'-'+pedido.insumos.clave_folio, style: 'tableHeader', alignment: 'center', colSpan: 2},{}
                            ],
                            [
                                { text: 'EMPRESA ADJUDICADA', style: 'tableHeaderVerde', alignment: 'center',colSpan:2},{},
                                { text: pedido.datos.proveedor.nombre, style: 'tableHeader', alignment: 'center', colSpan:2},
                                {},
                                { text: 'FECHA', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: pedido.datos.fecha_concluido, style: 'tableHeader', alignment: 'center', colSpan:2},{}
                            ],
                            [
                                { text: 'ENTREGAR EN', style: 'tableHeaderVerde', alignment: 'center',colSpan:2},{},
                                { text: pedido.datos.almacen_solicitante.nombre + ' DEL ' + pedido.datos.almacen_solicitante.unidad_medica.nombre, style: 'tableHeader', alignment: 'center', colSpan:2},
                                {},
                                { text: 'No. DE LOTES', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: insumos.length.toString(), style: 'tableHeader', alignment: 'center', colSpan:2},{}
                            ],
                            [
                                { text: 'NO.', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'CLAVE', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'DESCRIPCIÓN DE LOS INSUMOS', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'CANTIDAD', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'UNIDAD DE MEDIDA', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'PRECIO UNITARIO', style: 'tableHeaderVerde', alignment: 'center'},
                                { text: 'PRECIO TOTAL', style: 'tableHeaderVerde', alignment: 'center'}
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
                    marca: MARCA
                }
            }

            //var para_iva = 0;
            
            for(var i in insumos){
                var insumo = insumos[i];
                dd.content[0].table.body.push([
                    { text: (parseInt(i)+1), style: 'tableRow',  alignment: 'center'},
                    { text: insumo.clave, style: 'tableRow', alignment: 'center'},
                    { text: insumo.descripcion, style: 'tableRow',  alignment: 'left'},
                    { text: insumo.cantidad.format(0), style: 'tableRow', alignment: 'center'},
                    { text: insumo.unidad, style: 'tableRow', alignment: 'center'},
                    { text: '$ '+insumo.precio.format(2), style: 'tableRow', alignment: 'center'},
                    { text: '$ '+insumo.total.format(2), style: 'tableRow', alignment: 'center'}
                ]);
                /*if(insumo.tipo == 'MC'){
                    para_iva += insumo.total;
                }*/
            }

            var iva = 0;
            if(pedido.insumos.tiene_iva){
                iva = (+pedido.insumos.monto)*16/100;
            }
            
            dd.content[0].table.body.push(
                // Footer
                [
                    {
                        image: 'marca',
                        fit: [100, 100],
                        style: '', colSpan: 2, rowSpan:3, alignment: 'center' ,
                    },'',
                    {
                        text: 'Facturar 2017 a nombre del Instituto de Salud. Unidad Administrativa Edif. C, Maya Tuxtla Gutiérrez, Chiapas, 29010 R.F.C. ISA-961203- QN5', 
                        style: 'tableHeader', alignment: 'justify', colSpan:3, rowSpan:3
                    },'','',
                    { text: 'SUBTOTAL', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+(+pedido.insumos.monto).format(2), style: 'tableHeader', alignment: 'center'}
                ],
                ['','','','','',{ text: 'IVA', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+(iva.format(2)), style: 'tableHeader', alignment: 'center'}],
                ['','','','','',{ text: 'TOTAL', style: 'tableHeaderVerde',  alignment: 'center'},{ text: '$ '+((+pedido.insumos.monto + iva).format(2)), style: 'tableHeader', alignment: 'center'}],
                //[{ text: 'IMPORTE TOTAL: ('+'pedido.total_letra'+' M.N.)', style: 'tableHeaderVerde',  alignment: 'justify', colSpan:7},'','','','','',''],
                //[{ text: 'FUENTE DE FINANCIAMIENTO: '+'pedido.fuente_financiamiento', style: 'tableHeaderVerde',  alignment: 'justify', colSpan:7},'','','','','',''],
                [{ text: 'TIEMPO DE ENTREGA: Deberá surtir los insumos en un periodo no mayor a 20 dias.', style: 'tableHeaderVerde',  alignment: 'justify', colSpan:7},'','','','','',''],
                // Firmas
                [{
                    table: {
                        widths: [ '*', '*',  '*'],
                        body: [
                            [
                                {text:'\n\n\n\n'+((pedido.datos.encargado_almacen)?pedido.datos.encargado_almacen.nombre:'SIN ASIGNAR'),style:'tableRow'},
                                {text:'',style:'tableRow', rowSpan:2},
                                {text:'\n\n\n\n'+((pedido.datos.director)?pedido.datos.director.nombre:'SIN ASIGNAR'),style:'tableRow'}
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
            
            pdfMake.createPdf( dd ).getBase64( function( base64 ) {
                postMessage( { fileName: pedido.datos.folio+'-'+pedido.insumos.clave_folio, base64: base64, tipoPedido: pedido.insumos.clave_folio} );
            });
        }catch(e){
            console.log(e);
            throw {error:e, tipoPedido:pedido.insumos.clave_folio};
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
