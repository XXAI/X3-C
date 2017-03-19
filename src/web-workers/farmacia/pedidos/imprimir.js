var document = { 'createElementNS': function(){ return {} } };
var window = this;
importScripts( '../../../scripts/pdfmake.min.js', '../../../scripts/vfs_fonts.js');

(function() { 
    'use strict';


    onmessage = function( evt ) {
        let data = JSON.parse(evt.data)
        console.log(data);    
        pdf(data);
    };

    function pdf(data) {
        var dd = {
            content: [
                'First paragraph',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
            ]
        }

        pdfMake.createPdf( dd ).getBase64( function( base64 ) {
            postMessage( { fileName: 'holi.pdf', base64: base64 } );
        });
    }

})();
