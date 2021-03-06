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

    buscar(payload:any = { q: '', tipo: '', page: 1, per_page: 20 }): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios", null, payload).map((response: Response) => response.json().data);
    }

    listaPaginada(payload: any = {tipo:'', pagina:  1, resultados_por_pagina: 20}): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios", null, payload).map((response: Response) => response.json().data);
    }

    listaSolicitudes(): Observable<any[]> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-extraordinarios/solicitudes").map((response: Response) => response.json().data) as Observable<any[]>;
    }

    buscarSolicitudes(payload:any = { q: '', tipo: '',   causes: -1, unidosis: -1, descontinuado: -1, atencion_medica: -1, salud_publica: -1, page: 1, per_page: 20 }): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-extraordinarios/solicitudes", null, payload).map((response: Response) => response.json().data);
    }

    listaPaginadaSolicitudes(pagina: number = 1, resultados_por_pagina: number = 20): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-extraordinarios/solicitudes", null, { page: pagina, per_page: resultados_por_pagina }).map((response: Response) => response.json().data);
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

    verSolicitud(id:any): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-extraordinarios/solicitudes", id, {}).map((response: Response) => {
            let jsonData = response.json().data;
            return jsonData;
        }) as Observable<any>;
    }

    verPedido(id: any): Observable<any> {
        return this.jwtRequest.get(PedidosOrdinariosService.URL+"/pedidos-ordinarios/pedido", id, {}).map((response: Response) => {

            let jsonData = response.json().data;
            return jsonData;
        }) as Observable<any>;
    }

    editar(id, data: any): Observable<any> {
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/pedidos-ordinarios", id, data).map((response: Response) => response.json().data) as Observable<any>;
    }

    regresarACaptura(id, items: any): Observable<any> {
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/pedidos-ordinarios/regresar-captura", id, {pedidos: items}).map((response: Response) => response.json().data) as Observable<any>;
    }

    cancelar(id, items: any): Observable<any> {
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/pedidos-ordinarios/cancelar", id, {pedidos: items}).map((response: Response) => response.json().data) as Observable<any>;
    }

    anularCancelacion(id, items: any): Observable<any> {
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/pedidos-ordinarios/anular-cancelacion", id, {pedidos: items}).map((response: Response) => response.json().data) as Observable<any>;
    }

    modificarPresupuesto(id,pedido_ordinario_unidad_medica:any = null, aumentar: boolean = false, liberar:boolean = false,pedidos: any[] = []):Observable<any>{
        console.log("modificando presupuesto llamada api");
        
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/pedidos-ordinarios/modificar-presupuesto", id, {pedido_ordinario_unidad_medica: pedido_ordinario_unidad_medica, aumentar: aumentar, liberar: liberar, pedidos: pedidos}).map((response: Response) => {

            let jsonData = response.json().data;
            return jsonData;
        }) as Observable<any>;
    }

    aprobarPresupuesto(pedido_id: any,causes_autorizado:number = 0, no_causes_autorizado: number = 0 ):Observable<any>{
        console.log("modificando presupuesto llamada api");        
        return this.jwtRequest.put(PedidosOrdinariosService.URL+"/pedidos-extraordinarios/aprobar-presupuesto", pedido_id, {causes_autorizado: causes_autorizado, no_causes_autorizado: no_causes_autorizado}).map((response: Response) => {

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
