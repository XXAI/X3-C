import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class ReporteSalidaService {

  static readonly URL: string = "reporte-salida";
  
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  listar(filtro:any): Observable<any>{
    return this.jwtRequest.get(ReporteSalidaService.URL,null,{desde: filtro.desde, hasta:filtro.hasta, clues:filtro.clues, orden:filtro.orden}).map( (response: Response) => response.json().data);
  }

  catalogos(): Observable<any>{
    return this.jwtRequest.get(ReporteSalidaService.URL+"/catalogos",null,{}).map( (response: Response) => response.json().data);
  }
}
