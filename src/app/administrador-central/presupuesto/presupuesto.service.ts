import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class PresupuestoService {
  static readonly URL: string = "administrador-central";
  constructor(private jwtRequest: JwtRequestService) { }

  ejercicios(): Observable<any[]> {
    return this.jwtRequest.get(PresupuestoService.URL + "/presupuesto/ejercicios").map((response: Response) => response.json().data) as Observable<any[]>;
  }

  presupuestoUnidadesMedicas(id:any): Observable<any[]> {
    return this.jwtRequest.get(PresupuestoService.URL + "/presupuesto/presupuesto-unidades-medicas/"+id).map((response: Response) => response.json().data) as Observable<any[]>;
  }
  
  cargarSaldosUnidadesMedicas(id:any, payload:any){
    return this.jwtRequest.get(PresupuestoService.URL+"/presupuesto/saldos",id,payload).map((response: Response) => {

      let jsonData = response.json().data;
      return jsonData;
    }) as Observable<any>;
  }
  
  cargarUltimoPresupuesto():Observable<any>{
    return this.jwtRequest.get(PresupuestoService.URL+"/presupuesto/ultimo").map((response: Response) => {

      let jsonData = response.json().data;
      return jsonData;
    }) as Observable<any>;
  }

  historial(): Observable<any[]> {
    return this.jwtRequest.get(PresupuestoService.URL + "/presupuesto/historial").map((response: Response) => response.json().data) as Observable<any[]>;
  }
  ver(id: any): Observable<any> {
    return this.jwtRequest.get(PresupuestoService.URL+"/presupuesto", id, {}).map((response: Response) => {

        let jsonData = response.json().data;
        return jsonData;
    }) as Observable<any>;
  }
  crear(item: any): Observable<any> {
      return this.jwtRequest.post(PresupuestoService.URL+"/presupuesto", item).map((response: Response) => response.json().data) as Observable<any>;
  }

  ajuste(id:any, item: any): Observable<any> {
    return this.jwtRequest.put(PresupuestoService.URL+"/presupuesto/ajuste", id, item).map((response: Response) => response.json().data) as Observable<any>;
  }

  historialAjustes(payload:any): Observable<any[]> {
    return this.jwtRequest.get(PresupuestoService.URL + "/presupuesto/historial/ajustes",null, payload).map((response: Response) => response.json().data) as Observable<any[]>;
  }
}
