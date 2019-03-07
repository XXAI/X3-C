var document = { 'createElementNS': function(){ return {} } };
var window = this;
importScripts( '../../../scripts/pdfmake.min.js', '../../../scripts/vfs_fonts.js');
importScripts('../../logos.js');

(function() { 
    'use strict';


    onmessage = function( evt ) {
        let data = JSON.parse(evt.data)

        pdf(data);
    };

    function pdf(data) {

        var contadorLineasHorizontalesV = 0;
        var dd = {
            content: [{
                style: 'Movimiento',
                table: {
                    headerRows: 4,
                    dontBreakRows: true,
                    //widths: [ 35, 70, 'auto', 'auto', 40 , 45, 45],
                    widths: [ 35, 70, 'auto', 'auto', 60],
                    body: [
                        [{
                            image: 'header',
                            width: 500,
                            style: 'tableHeaderTop', colSpan: 5, alignment: 'center'
                        },{},{},{},{}],
                        [{ text: 'MOVIMIENTO', style: 'tableHeaderTop', colSpan: 5, alignment: 'center' },{},{},{},{}],
                        [{ text: "", style: 'tableHeaderTop', colSpan: 5, alignment: 'center' },{},{},{},{}],

                        [
                            { text: 'SALIDA MANUAL', style: 'tableHeader', colSpan: 2, alignment: 'left' },{},{ text: data.datos.id, style: 'tableHeader', alignment: 'left' },
                            { text: 'ALMACÉN', style: 'tableHeader', alignment: 'right' },{ text: data.datos.almacen_id, style: 'tableHeader', alignment: 'center' }
                        ],
                        [
                            { text: 'USUARIO', style: 'tableHeader', colSpan: 2, alignment: 'left' },{},{ text: data.datos.usuario_id, style: 'tableHeader', alignment: 'left' },
                            { text: 'FECHA DE CREACION', style: 'tableHeader', alignment: 'right' },{ text: data.datos.fecha_movimiento, style: 'tableHeader', alignment: 'center' }
                        ],
                        [
                            { text: 'NO. DE LOTE', style: 'tableHeader', alignment: 'center'},
                            { text: 'CLAVE', style: 'tableHeader', alignment: 'center'},
                            { text: 'DESCRIPCIÓN DEL INSUMO', style: 'tableHeader', alignment: 'center', colSpan:2},{},
                            //{ text: 'PRESENTACIÓN', style: 'tableHeader', alignment: 'center'},
                            { text: 'CANTIDAD', style: 'tableHeader', alignment: 'center'},
                        ]
                        //Body -> insumos
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
                        if (i == 0){
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
            defaultStyle: { // alignment: 'justify'
            },
            images: {
                header: HEADER
            }
        };

        var suma_total_insumos = 0;
       /* 
        for(var i in data.lista){
            var insumo = data.lista[i];
            var presentacion = 'PIEZA';
            /*if(insumo.informacion){
                presentacion = insumo.informacion.presentacion_nombre;
            }*/
           /* dd.content[0].table.body.push([
                { text: insumo.lote, style: 'tableRow',  alignment: 'center'},
                { text: /*insumo.clave, style: 'tableRow', alignment: 'center'},
                { text: /*insumo.descripcion, style: 'tableRow', alignment: 'left', colSpan:2},{},
                //{ text: presentacion, style: 'tableRow', alignment: 'center'},
                { text: /*insumo.cantidad, style: 'tableRow', alignment: 'center'}
            ]);
            /*suma_total_insumos += insumo.cantidad;*/
    //  }

         for (var i in data.lista){
            console.log(" " + i);
            var insumo = data.lista[i];
            console.log(insumo);

            dd.content[0].table.body.push([
                { text: "", style: 'tableRow', alignment: 'center'}, '', '','',
                { text: insumo.cantidad, style:'tableRow', alignment: 'center'}
            ]);       
            
        }


        dd.content[0].table.body.push(
            // Footer
            [
                { text: '', style: 'tableHeader', colSpan:3, alignment: 'center' },'','',
                { text: 'TOTAL', style: 'tableHeader',  alignment: 'right' },{ text: "", style: 'tableRow', alignment: 'center'}
            ],
            // Firmas
            [{ 
                table: {
                    widths: [ '*', '*'],
                    body: [
                        [ 'SOLICITA', { text: '',  rowSpan:3 }],
                        [{text:'\n\n\n\n'+'Coordinacion de abasto',style:'tableRow'},''],
                        ['COORDINADOR DE ABASTO ','']
                    ],
                },
                layout: {
                    hLineWidth: function(i, node){
                        if (i == 0 || i == 3){
                            return 0;
                        }
                        return 0.5;
                    },
                    vLineWidth: function(i, node){
                        if (i == 0 || i == 3){
                            return 0;
                        }
                        return 0.5;
                    },
                },
                style: 'tableHeader', 	margin: [0, 0, 0, 0],colSpan: 5, alignment: 'center' ,
            },{},{},{},{}]
        );

        pdfMake.createPdf( dd ).getBase64( function( base64 ) {
            postMessage( { fileName: 'salida.pdf', base64: base64 } );
        });
    }

})();
