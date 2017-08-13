import { Injectable } from '@angular/core';
import { UploadItem }      from 'angular2-http-file-upload';

import { environment } from '../../../../environments/environment';

@Injectable()
export class SubirArchivoSQL extends UploadItem {

  constructor(file: any) {
        super();
        this.url = `${environment.API_URL}/opciones-avanzadas/importar-base-datos/`;
        this.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Accept': 'plain/text' };
        this.file = file;
        this.alias = "sql";
    
        
    }

}