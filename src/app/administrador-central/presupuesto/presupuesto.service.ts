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
}
