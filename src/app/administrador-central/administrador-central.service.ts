import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { JwtRequestService } from '../jwt-request.service';

@Injectable()
export class AdministradorCentralService {

  constructor(private http: Http,  private jwtRequest:JwtRequestService) { }
  
  jurisdicciones(): Observable<any[]>{
    return this.jwtRequest.get("jurisdicciones").map( (response: Response) => response.json().data) as Observable<any[]>;
  }
  proveedores(): Observable<any[]>{
    return this.jwtRequest.get("proveedores").map( (response: Response) => response.json().data) as Observable<any[]>;
  }
  abasto(parametros:any = {}): Observable<any>{
    return this.jwtRequest.get("abasto",null,parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }

  pedidos(parametros:any = {}): Observable<any>{
    return this.jwtRequest.get("pedidos-administrador-central",null,parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }

  presupuesto(parametros): Observable<any>{    
    return this.jwtRequest.get("presupuesto-pedidos-administrador-central",null,parametros).map( (response: Response) => response.json());
  }
}
