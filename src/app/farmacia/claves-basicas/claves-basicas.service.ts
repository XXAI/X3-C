import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class ClavesBasicasService {

    static readonly URL: string = "claves-basicas";
    constructor(private jwtRequest: JwtRequestService) { }
    lista( ): Observable<any>{
    	return this.jwtRequest.get(ClavesBasicasService.URL,null,null).map( (response: Response) => response.json().data);
    }

    ver(id:any): Observable<any>{
        return this.jwtRequest.get(ClavesBasicasService.URL,id,{}).map( (response: Response) => {
        
        let jsonData = response.json().data;
        /* var roles:string[] = []
            jsonData.roles.map(item => {
            roles.push(""+item.id)
            })*/

            var pedido = jsonData as any;
            //usuario.roles = roles;
            return pedido;
        }) as Observable<any>;
    }

    crear(lista: any): Observable<any> {
        return this.jwtRequest.post(ClavesBasicasService.URL,lista).map( (response: Response) => response.json().data) as Observable<any>;
    }

    editar(id:any, lista: any): Observable<any> {
        return this.jwtRequest.put(ClavesBasicasService.URL,id, lista).map( (response: Response) => response.json().data) as Observable<any>;
    }

    eliminar(id:any): Observable<any> {
        return this.jwtRequest.delete(ClavesBasicasService.URL,id).map( (response: Response) => response.json().data) as Observable<any>;
    }

}
