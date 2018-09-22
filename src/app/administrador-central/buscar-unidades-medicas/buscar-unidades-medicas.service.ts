import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class BuscarUnidadesMedicasService {
  static readonly URL: string = "administrador-central";
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  tiposUnidadMedica(): Observable<any[]> {
    return this.jwtRequest.get(BuscarUnidadesMedicasService.URL + "/presupuesto/tipos-unidad-medica").map((response: Response) => response.json().data) as Observable<any[]>;
  }

  jurisdicciones(): Observable<any[]> {
    return this.jwtRequest.get(BuscarUnidadesMedicasService.URL + "/presupuesto/jurisdicciones").map((response: Response) => response.json().data) as Observable<any[]>;
  }
  buscar(payload:any = {}):Observable<any[]>{
    return this.jwtRequest.get(BuscarUnidadesMedicasService.URL + "/presupuesto/unidades-medicas",null,payload).map( (response: Response) => response.json().data);
  }
}
