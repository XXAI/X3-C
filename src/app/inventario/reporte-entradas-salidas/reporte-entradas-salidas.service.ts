import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class ReporteEntradasSalidasService {

  static readonly URL: string = "reporte-estrada-salida";
  
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  listar(data:any): Observable<any>{
    return this.jwtRequest.get(ReporteEntradasSalidasService.URL,null,{desde: data.desde, hasta:data.hasta, tipo:data.tipo, insumo:data.insumo, page: data.page, per_page: data.per_page}).map( (response: Response) => response.json().data);
  }

  movimiento(id:any, tipo:number): Observable<any>{
    return this.jwtRequest.get(ReporteEntradasSalidasService.URL,id,{tipo_movimiento:tipo}).map( (response: Response) => response.json().data);
  }

  movimiento_es(data:any): Observable<any>{
    return this.jwtRequest.get(ReporteEntradasSalidasService.URL,null,{ desde: data.desde, hasta:data.hasta, tipo:data.tipo, insumo:data.insumo, tipo_movimiento:data.tipo_movimiento}).map( (response: Response) => response.json().data);
  }

  catalogos(): Observable<any>{
    return this.jwtRequest.get("catalogo-insumos",null,{}).map( (response: Response) => response.json().data);
  }

}
