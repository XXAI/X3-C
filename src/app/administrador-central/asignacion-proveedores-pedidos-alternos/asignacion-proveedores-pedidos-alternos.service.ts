import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';


@Injectable()
export class AsignacionProveedoresPedidosAlternosService {

	static readonly URL: string = "administrador-central/pedidos-alternos";
	constructor(private jwtRequest: JwtRequestService) { }

	buscar(payload:any = { q: "", page: 1, per_page: 20 }): Observable<any> {
		return this.jwtRequest.get(AsignacionProveedoresPedidosAlternosService.URL, null, payload).map((response: Response) => response.json().data);
	}

	listaPaginada(payload :any = {  page: 1, per_page: 20 }): Observable<any> {
		return this.jwtRequest.get(AsignacionProveedoresPedidosAlternosService.URL, null, payload).map((response: Response) => response.json().data);
	}

	ver(id: any): Observable<any> {
		return this.jwtRequest.get(AsignacionProveedoresPedidosAlternosService.URL, id, {}).map((response: Response) => {

			let jsonData = response.json().data; 
			var pedido = jsonData as any;
			return pedido;
		}) as Observable<any>;
	}
	asignar(id: any): Observable<any> {
			return this.jwtRequest.put(AsignacionProveedoresPedidosAlternosService.URL+"/proveedor", id, null).map((response: Response) => response.json().data) as Observable<any>;
	}

	proveedores(): Observable<any> {
		return this.jwtRequest.get("proveedor", null, null).map((response: Response) => response.json().data);
	}
}