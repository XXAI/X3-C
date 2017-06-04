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
    return this.jwtRequest.get("administrador-central/abasto",null,parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }

  pedidos(parametros:any = {}): Observable<any>{
    return this.jwtRequest.get("administrador-central/pedidos",null,parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }

  presupuesto(parametros): Observable<any>{    
    return this.jwtRequest.get("administrador-central/presupuesto-pedidos",null,parametros).map( (response: Response) => response.json());
  }

  unidadesMedicasConPresupuesto(parametros:any = {}): Observable<any>{    
    return this.jwtRequest.get("administrador-central/unidades-medicas-con-presupuesto",null,parametros).map( (response: Response) => response.json().data);
  }
  mesesPresupuestoActual(): Observable<any>{    
    return this.jwtRequest.get("administrador-central/meses-presupuesto-actual",null,null).map( (response: Response) => response.json().data);
  }
  aniosPresupuestoActual(): Observable<any>{    
    return this.jwtRequest.get("administrador-central/anios-presupuesto-actual",null,null).map( (response: Response) => response.json().data);
  }

  presupuestoUnidadMedica(parametros:any = {}): Observable<any>{
    return this.jwtRequest.get("administrador-central/presupuesto-unidad-medica",null,parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }


  transferenciasLista(parametros:any = {}): Observable<any>{
    return this.jwtRequest.get("administrador-central/transferencias-presupuestos",null,parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }

  transferirPresupuesto(parametros:any = {}): Observable<any>{
    return this.jwtRequest.post("administrador-central/transferencias-presupuestos",parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }

  mesesAniosAnteriorFechaActual(): Observable<any>{    
    return this.jwtRequest.get("administrador-central/meses-anios-presupuesto-actual-anterior-fecha-actual",null,null).map( (response: Response) => response.json().data);
  }

  transferirSaldosAlMesActual(parametros:any = {}): Observable<any>{
    return this.jwtRequest.post("administrador-central/transferencias-saldos-mes-actual",parametros).map( (response: Response) => response.json().data) as Observable<any[]>;
  }


  mesesAniosPedidos(): Observable<any>{    
    return this.jwtRequest.get("administrador-central/meses-anios-pedidos",null,null).map( (response: Response) => response.json().data);
  }
  
  entregasPedidosStatsMesesAnios(payload:any = {}): Observable<any>{    
    return this.jwtRequest.get("administrador-central/entregas-pedidos-stats-mes-anio",null,payload).map( (response: Response) => response.json().data);
  }

  
}
