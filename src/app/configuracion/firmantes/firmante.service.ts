import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class FirmanteService {

  static readonly URL: string = "avance";
  	
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar_personal(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(FirmanteService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
	}

}
