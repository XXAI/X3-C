import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';


@Injectable()
export class SyncService {

  static readonly URL: string = "sync";
  
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  servidores( ): Observable<any>{
    return this.jwtRequest.get(SyncService.URL+"/servidores",null,{}).map( (response: Response) => response.json().data);
  }

  buscar(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(SyncService.URL+"/lista",null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }
  

  listaPaginada(pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(SyncService.URL+"/lista",null,{page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  

  auto(): Observable<any>{
    return this.jwtRequest.get(SyncService.URL+"/auto",null,{}).map( (response: Response) => response.json().data ) as Observable<any>;
  }

  
}
