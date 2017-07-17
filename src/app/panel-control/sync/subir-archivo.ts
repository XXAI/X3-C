import { Injectable } from '@angular/core';
import { UploadItem }      from 'angular2-http-file-upload';

import { environment } from '../../../environments/environment';

@Injectable()
export class SubirArchivo extends UploadItem {

  constructor(file: any) {
        super();
        this.url = `${environment.API_URL}/sync/importar`;
        this.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
        this.file = file;
        this.alias = "sync";
    }

}