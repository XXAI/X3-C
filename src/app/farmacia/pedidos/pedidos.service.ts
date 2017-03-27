import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

import { Pedido } from '../pedidos/pedido';

@Injectable()
export class PedidosService {

  static readonly URL: string = "pedidos";
  
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PedidosService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  lista(pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PedidosService.URL,null,{page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  ver(id:any): Observable<Pedido>{
    return this.jwtRequest.get(PedidosService.URL,id,{}).map( (response: Response) => {
     
       let jsonData = response.json().data;
       /* var roles:string[] = []
        jsonData.roles.map(item => {
          roles.push(""+item.id)
        })*/

        var pedido = jsonData as Pedido;
        //usuario.roles = roles;
        return pedido;
      }) as Observable<Pedido>;
  }

  crear(pedido: Pedido): Observable<Pedido> {
    return this.jwtRequest.post(PedidosService.URL,pedido).map( (response: Response) => response.json().data) as Observable<Pedido>;
  }

  editar(id:any, pedido: Pedido): Observable<Pedido> {
    return this.jwtRequest.put(PedidosService.URL,id, pedido).map( (response: Response) => response.json().data) as Observable<Pedido>;
  }

  eliminar(id:any): Observable<Pedido> {
    return this.jwtRequest.delete(PedidosService.URL,id).map( (response: Response) => response.json().data) as Observable<Pedido>;
  }

  

}