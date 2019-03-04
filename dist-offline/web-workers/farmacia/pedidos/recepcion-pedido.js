var document = { 'createElementNS': function(){ return {} } };
var window = this;
importScripts( '../../../scripts/pdfmake.min.js', '../../../scripts/vfs_fonts.js');
importScripts('../../logos.js');

(function() { 
    'use strict';

    onmessage = function( evt ) {
        let data = JSON.parse(evt.data)
        //console.log(data);
        pdf(data);
    };

    function pdf(pedido) {
        console.log(pedido);
        
        var insumos = {};
        var subtotal = 0;
        var iva = 0;
        
        for(var i in entrega.stock){
            var stock_insumo = entrega.stock[i];
            var tipo_insumo = 0;
            
            if(!insumos[tipo_insumo]){
                insumos[tipo_insumo] = {subtotal:0,items:{}};
            }

            var total_calculado = stock_insumo.cantidad_recibida * (stock_insumo.insumo.precio);

            if(!insumos[tipo_insumo].items[stock_insumo.insumo_id]){
                insumos[tipo_insumo].items[stock_insumo.insumo_id] = {
                    'clave': stock_insumo.insumo.clave,
                    'descripcion': stock_insumo.insumo.descripcion,
                    'unidad': stock_insumo.insumo.unidad,
                    'precio': $filter('number')(stock_insumo.insumo.precio,2),
                    'autorizado': 0,
                    'acumulado': 0,
                    'lotes': [],
                    'total_cantidad': 0,
                    'restante': 0,
                    'total': 0
                };
            }

            if(!stock_insumo.fecha_caducidad){
                stock_insumo.fecha_caducidad = '';
            }

            insumos[tipo_insumo].items[stock_insumo.insumo_id]['lotes'].push({
                'lote': stock_insumo.lote.toString(),
                'fecha_caducidad': stock_insumo.fecha_caducidad,
                'cantidad': $filter('number')(stock_insumo.cantidad_recibida)
            });

            insumos[tipo_insumo].items[stock_insumo.insumo_id]['total_cantidad'] += stock_insumo.cantidad_recibida;
            insumos[tipo_insumo].items[stock_insumo.insumo_id]['total'] += total_calculado;

            insumos[tipo_insumo].subtotal += total_calculado;
            subtotal += total_calculado;

            if(stock_insumo.insumo.tipo == 2){ //material de curación
                iva += (stock_insumo.cantidad_recibida * (stock_insumo.insumo.precio))*16/100;
            }
        }

        for(var i in entrega.acta.requisiciones){
            var requisicion = entrega.acta.requisiciones[i];
            if(insumos[requisicion.tipo_requisicion]){
                for(var j in requisicion.insumos){
                    var insumo = requisicion.insumos[j];
                    if(insumos[requisicion.tipo_requisicion].items[insumo.id]){
                        insumos[requisicion.tipo_requisicion].items[insumo.id].autorizado	= insumo.pivot.cantidad_validada;
                        insumos[requisicion.tipo_requisicion].items[insumo.id].acumulado	= insumo.pivot.cantidad_recibida - insumos[requisicion.tipo_requisicion].items[insumo.id].total_cantidad;
                        insumos[requisicion.tipo_requisicion].items[insumo.id].restante		= insumo.pivot.cantidad_validada - insumo.pivot.cantidad_recibida;
                    }
                }
            }
        }

        entrega.fecha_recibe = new Date(entrega.fecha_recibe + ' 00:00:00');
        var horaRecibe = entrega.hora_recibe.split(':')
        entrega.hora_recibe =  new Date(1970, 0, 1, horaRecibe[0], horaRecibe[1], 0);

        // playground requires you to assign document definition to a variable called dd
        var contadorLineasHorizontalesV = 0;
        var dd = {
            content: [{
                style: 'Requisicion',
                table: {
                    headerRows: 7,
                    dontBreakRows: true,
                    widths: [55,110,"auto",45,45,35,50,35,35,45,45],
                    body: [
                        [
                            {image: "header",width: 500,style: "tableHeaderTop",colSpan: 11,alignment: "center"},{},{},{},{},{},{},{},{},{},{}
                        ],
                        [
                            {text: "",style: "tableHeaderLeyenda",colSpan: 11,alignment: "center"},{},{},{},{},{},{},{},{},{},{}
                        ],
                        [
                            {text: "INSTITUTO DE SALUD\n"+configuracion.clues_nombre+"\nRECEPCIÓN DE INSUMOS DE MEDICAMENTOS Y MATERIALES DE CURACIÓN",style: "tableHeaderTop",colSpan: 11,alignment: "center"},{},{},{},{},{},{},{},{},{},{}
                        ],
                        [
                            {text: "PROVEEDOR ASIGNADO",style: "tableHeader",colSpan: 2,alignment: "left"},{},
                            {text: proveedor.nombre,style: "tableHeader",colSpan: 9,alignment: "left"},{},{},{},{},{},{},{},{}
                        ],
                        [
                            {text: "FECHA DE ENTREGA",style: "tableHeader",colSpan: 2,alignment: "center"},{},
                            {text: "HORA DE ENTREGA",style: "tableHeader",colSpan: 2,alignment: "center"},{},
                            {text: "LOTES ENTREGADOS",style: "tableHeader",colSpan: 2,alignment: "center"},{},
                            {text: "EMPRESA ADJUDICADA EN LICITACIÓN",style: "tableHeader",colSpan: 5,alignment: "center"},{},{},{},{}
                        ],
                        [
                            {text: $filter('date')(entrega.fecha_recibe,'dd/MM/yyyy'),style: "tableHeaderData",colSpan: 2,alignment: "center"},{},
                            {text: $filter('date')(entrega.hora_recibe,'HH:mm'),style: "tableHeaderData",colSpan: 2,alignment: "center"},{},
                            {text: entrega.stock.length.toString(),style: "tableHeaderData",colSpan: 2,alignment: "center"},{},
                            {text: configuracion.empresa_nombre,colSpan: 5,style: "tableHeaderData",alignment: "center"},{},{},{},{}
                        ],
                        [
                            {text: "CLAVE",style: "tableHeader",alignment: "center"},
                            {text: "DESCRIPCIÓN DEL INSUMO",style: "tableHeader",alignment: "center"},
                            {text: "UNIDAD DE MEDIDA",style: "tableHeader",alignment: "center"},
                            
                            {text: "CANTIDAD AUTORIZADA",style: "tableHeader",alignment: "center"},
                            {text: "CANTIDAD ACUMULADA",style: "tableHeader",alignment: "center"},
                            
                            {text: "NO. DE LOTE",style: "tableHeader",alignment: "center"},
                            {text: "FECHA DE CADUCIDAD",style: "tableHeader",alignment: "center"},
                            {text: "CANTIDAD RECIBIDA",style: "tableHeader",alignment: "center"},

                            {text: "CANTIDAD RESTANTE",style: "tableHeader",alignment: "center"},

                            {text: "PRECIO UNITARIO",style: "tableHeader",alignment: "center"},
                            {text: "TOTAL",style: "tableHeader",alignment: "center"}
                        ]
                    ]
                },
                layout: {
                    paddingTop: function(i, node) { return 0; },
                    paddingBottom: function(i, node) { return 0; },
                    paddingLeft: function(i, node) { return 0; },
                    paddingRight: function(i, node) { return 0; },
                    hLineWidth: function(i, node){
                        if (i<3 ){ return 0;} else {
                            return 0.25
                        }
                        return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                    },
                    vLineWidth: function(i, node){
                        /* Hack para las lineas verticales de la cabecera */
                        if (i == 0) {
                            contadorLineasHorizontalesV += 1
                        } 
                        /*
                            El numero 4 es el que funciono, deberian ser 2 por ser 2 filas,
                            Si se agregan mas filas solo debemos aumentar este numero a modo de cuadrar
                            el encabezado
                        */
                        if (contadorLineasHorizontalesV > 5){
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
                    fillColor: '#eaf1dd',
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
            images: {
                header: HEADER
            }
        };

        for (var i = 1; i <= 6; i++) {
            if(insumos[i]){
                dd.content[0].table.body.push([
                    {text: tipos_descripcion[i],style: "tableHeaderVerde",colSpan: 10,alignment: "center"},{},{},{},{},{},{},{},{},{},
                    {text: '$ '+$filter('number')(insumos[i].subtotal,2),style: "tableHeaderVerde",alignment: "center"}
                ]);
                
                for(var j in insumos[i].items){
                    var insumo = insumos[i].items[j];

                    var desglose = {
                        table: {
                            widths: [27,41,27],
                            body: []
                        },
                        layout: {
                            hLineWidth: function(i, node) {
                                if(i === (node.table.body.length-1) && node.table.body.length > 1){
                                    return 0.5;
                                }
                                return 0;
                            },
                            vLineWidth: function(i, node) {
                                if (i === 0 || i == 3){
                                    return 0;
                                }
                            return 0.5;
                            },
                        },
                        style: "tableHeader",
                        margin: [0,0,0,0],
                        colSpan: 3,
                        alignment: "center"
                    };

                    for(var k in insumo.lotes){
                        var lote = insumo.lotes[k];
                        desglose.table.body.push([
                            {text: lote.lote.toString(),style: "tableRow",alignment: "center"},
                            {text: lote.fecha_caducidad,style: "tableRow",alignment: "center"},
                            {text: lote.cantidad,style: "tableRow",alignment: "center"}
                        ]);
                    }

                    if(insumo.lotes.length > 1){
                        desglose.table.body.push([
                            {text: "TOTAL",style: "tableRow",alignment: "right",colSpan:2},
                            {},
                            {text: $filter('number')(insumo.total_cantidad),style: "tableRow",alignment: "center"}
                        ]);
                    }

                    dd.content[0].table.body.push([
                        {text: insumo.clave,style: "tableRow",alignment: "center"},
                        {text: insumo.descripcion,style: "tableRow",alignment: "left"},
                        {text: insumo.unidad,style: "tableRow",alignment: "center"},
                        
                        {text: $filter('number')(insumo.autorizado),style: "tableRow",alignment: "center"},
                        {text: $filter('number')(insumo.acumulado),style: "tableRow",alignment: "center"},
                        
                        desglose,{},{},
                        
                        {text: $filter('number')(insumo.restante),style: "tableRow",alignment: "center"},

                        {text: '$ '+$filter('number')(insumo.precio,2),style: "tableRow",alignment: "center"},
                        {text: "$ "+$filter('number')(insumo.total,2),style: "tableRow",alignment: "center"}
                    ]);
                }
            }
        }
        
        if(!entrega.observaciones){
            entrega.observaciones = '';
        }

        dd.content[0].table.body.push(
            [
                {text: "Observaciones:\n"+entrega.observaciones,style: "tableHeader",colSpan: 9,rowSpan: 3,alignment: "justify"},"","","","","","","","",
                {text: "SUBTOTAL",style: "tableHeader",alignment: "right"},
                {text: "$ "+$filter('number')(subtotal,2),style: "tableRow",alignment: "center"}
            ],
            [
                "","","","","","","","","",
                {text: "IVA",style: "tableHeader",alignment: "right"},
                {text: "$ "+$filter('number')(iva,2),style: "tableRow",alignment: "center"}
            ],
            [
                "","","","","","","","","",
                {text: "TOTAL",style: "tableHeader",alignment: "right"},
                {text: "$ "+$filter('number')(subtotal+iva,2),style: "tableRow",alignment: "center"}
            ],
            [
                {text: "LUGAR DE ENTREGA: "+configuracion.lugar_entrega,style: "tableFooter",colSpan: 11,alignment: "justify"},{},{},{},{},{},{},{},{},{},{}
            ],
            [{
                table: {
                    widths: ["*","*","*"],
                    body: [
                        ["RECIBE","ENTREGA",{text: "",rowSpan: 2}],
                        [{text: "\n\n\n\n"+entrega.nombre_recibe,style: "tableRow"},{text: "\n\n\n\n"+entrega.nombre_entrega,style: "tableRow"},""]
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                        if (i === 0 || i == 3){
                            return 0;
                        }
                        return 0.5;
                    },
                    vLineWidth: function(i, node) {
                        if (i === 0 || i == 3){
                            return 0;
                        }
                        return 0.5;
                    },
                },
                style: "tableHeader",
                margin: [0,0,0,0],
                colSpan: 11,
                alignment: "center"
            },{},{},{},{},{},{},{},{},{},{}]
        );

        var fecha_recibe = $filter('date')(entrega.fecha_recibe,'dd-MM-yyyy');

        var folio_acta = entrega.acta.folio;
            folio_acta = folio_acta.replace('\/','-');

        //console.log(JSON.stringify(dd));

        pdfMake.createPdf( dd ).getBase64( function( base64 ) {
            postMessage( { fileName: 'Entrada_'+folio_acta+'_['+fecha_recibe+'].pdf', base64: base64 } );
        });
            
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