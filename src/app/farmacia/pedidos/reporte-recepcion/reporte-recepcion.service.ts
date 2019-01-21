import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../../jwt-request.service';

import { Pedido } from '../../pedidos/pedido';

@Injectable()
export class ReporteRecepcionService {

  static readonly URL: string = "lista-recepcion-pedido";
  
  static readonly URL_STATS: string = "pedidos-stats";
  static readonly URL_PRESUPUESTO: string = "pedidos-presupuesto";
  
  static readonly URL_RECEPCION: string = "reporte-recepcion-pedido";//Villa: Se agrega liga de recepcion
  static readonly URL_RECEPCION_DETALLE: string = "reporte-recepcion-pedido-detalle";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }
  
  presupuesto(mes:number = 0, anio:number = 0, almacen:string = '', presupuesto:number = 0): Observable<any>{
    let parametros:any = {};
    if(mes){ parametros.mes = mes; }
    if(anio){ parametros.anio = anio; }
    if(almacen){ parametros.almacen = almacen; }
    if(presupuesto){ parametros.presupuesto = presupuesto; }
    return this.jwtRequest.get(ReporteRecepcionService.URL_PRESUPUESTO,null,parametros).map( (response: Response) => response.json());
  }

  pedidosStatsPresupuestoUnidadMedica(presupuesto:number = 0): Observable<any>{
    let parametros:any = {};   
    if(presupuesto){ parametros.presupuesto = presupuesto; }
    return this.jwtRequest.get(ReporteRecepcionService.URL_STATS+"/presupuesto-ejercicio-unidad-medica",null,parametros).map( (response: Response) => response.json());
  }

  buscar(status:string, term: string, pagina:number = 1, resultados_por_pagina:number =20, tipo:string = '', presupuesto:number = 0, nuevaVersion: boolean = false , fecha_desde:string = null, fecha_hasta:string = null): Observable<any>{
    return this.jwtRequest.get(ReporteRecepcionService.URL,null,{tipo:tipo, status: status, q: term, page: pagina, per_page: resultados_por_pagina, presupuesto: presupuesto, nueva_version: nuevaVersion, desde:fecha_desde, hasta:fecha_hasta}).map( (response: Response) => response.json().data);
  }

  lista(status:string, pagina:number = 1, resultados_por_pagina:number =20,tipo:string = '', presupuesto:number = 0, nuevaVersion:boolean = false, fecha_desde:string = null, fecha_hasta:string = null, buscar_texto:string = null ): Observable<any>{
    return this.jwtRequest.get(ReporteRecepcionService.URL,null,{tipo:tipo, status:status, page: pagina, per_page: resultados_por_pagina, presupuesto: presupuesto, nueva_version: nuevaVersion, desde:fecha_desde, hasta:fecha_hasta, q: buscar_texto}).map( (response: Response) => response.json().data);
  }

  VerRecepciones(id:string): Observable<any>{
    return this.jwtRequest.get(ReporteRecepcionService.URL_RECEPCION_DETALLE,null,{pedido_id:id}).map( (response: Response) => response.json().data);
  }

}
