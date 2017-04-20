import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

import { Entrada } from '../entradas/entrada';

@Injectable()
export class EntradasService {

  static readonly URL: string = "entradas";
  
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(EntradasService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  lista(pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(EntradasService.URL,null,{page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  ver(id:any): Observable<Entrada>{
    return this.jwtRequest.get(EntradasService.URL,id,{}).map( (response: Response) => {
     
       let jsonData = response.json().data;
       /* var roles:string[] = []
        jsonData.roles.map(item => {
          roles.push(""+item.id)
        })*/

        var pedido = jsonData as Entrada;
        //usuario.roles = roles;
        return pedido;
      }) as Observable<Entrada>;
  }

  crear(pedido: Entrada): Observable<Entrada> {
    return this.jwtRequest.post(EntradasService.URL,pedido).map( (response: Response) => response.json().data) as Observable<Entrada>;
  }

  editar(id:any, pedido: Entrada): Observable<Entrada> {
    return this.jwtRequest.put(EntradasService.URL,id, pedido).map( (response: Response) => response.json().data) as Observable<Entrada>;
  }

  eliminar(id:any): Observable<Entrada> {
    return this.jwtRequest.delete(EntradasService.URL,id).map( (response: Response) => response.json().data) as Observable<Entrada>;
  }

  

}
