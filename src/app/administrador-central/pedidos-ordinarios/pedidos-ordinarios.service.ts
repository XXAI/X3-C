import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class PedidosOrdinariosService {

  static readonly URL: string = "administrador-central";
    constructor(private jwtRequest: JwtRequestService) { }

    lista(): Observable<any[]> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios").map((response: Response) => response.json().data) as Observable<any[]>;
    }

    buscar(payload:any = { q: '', tipo: '',   causes: -1, unidosis: -1, descontinuado: -1, atencion_medica: -1, salud_publica: -1, page: 1, per_page: 20 }): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios", null, payload).map((response: Response) => response.json().data);
    }

    listaPaginada(pagina: number = 1, resultados_por_pagina: number = 20): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios", null, { page: pagina, per_page: resultados_por_pagina }).map((response: Response) => response.json().data);
    }

    crear(item: any): Observable<any> {
        return this.jwtRequest.post(PedidosOrdinariosService.URL+"/pedidos-ordinarios", item).map((response: Response) => response.json().data) as Observable<any>;
    }

    cargarPresupuesto():Observable<any>{
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios/presupuesto").map((response: Response) => response.json().data) as Observable<any>;
    }

    ver(id: any): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios", id, {}).map((response: Response) => {

            let jsonData = response.json().data;
            return jsonData;
        }) as Observable<any>;
    }

    aumentarPresupuesto(id,pedido_ordinario_unidad_medica:any = null):Observable<any>{
        console.log("aumentando presupesto llamada api");
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/pedidos-ordinarios/aumentar-presupuesto", id, {pedido_ordinario_unidad_medica: pedido_ordinario_unidad_medica}).map((response: Response) => {

            let jsonData = response.json().data;
            return jsonData;
        }) as Observable<any>;
    }
    /*

    crear(item: any): Observable<any> {
        return this.jwtRequest.post(PedidosOrdinariosService.URL+"/contratos", item).map((response: Response) => response.json().data) as Observable<any>;
    }

    editar(id: any, item: any): Observable<any> {
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/contratos", id, item).map((response: Response) => response.json().data) as Observable<any>;
    }

    activar(id: any): Observable<any> {
      return this.jwtRequest.put(PedidosOrdinariosService.URL+"/contratos/activar", id).map((response: Response) => response.json().data) as Observable<any>;
    }

    eliminar(id: any): Observable<any> {
        return this.jwtRequest.delete(PedidosOrdinariosService.URL+"/contratos", id).map((response: Response) => response.json().data) as Observable<any>;
    }

    proveedores(): Observable<any[]> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/proveedores").map((response: Response) => response.json().data) as Observable<any[]>;
    }

   


    confirmarCargaMasivaDatos(item: any): Observable<any> {
        return this.jwtRequest.post(PedidosOrdinariosService.URL+"/confirmar-carga-masiva-insumos", item).map((response: Response) => response.json().data) as Observable<any>;
    }*/
}
