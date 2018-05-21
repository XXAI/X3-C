import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class InsumosMedicosService {

  static readonly URL: string = "administrador-central/insumos-medicos";
    constructor(private jwtRequest: JwtRequestService) { }

    lista(): Observable<any[]> {
        return this.jwtRequest.get(InsumosMedicosService.URL).map((response: Response) => response.json().data) as Observable<any[]>;
    }

    buscar(term: string, pagina: number = 1, resultados_por_pagina: number = 20): Observable<any> {
        return this.jwtRequest.get(InsumosMedicosService.URL, null, { q: term, page: pagina, per_page: resultados_por_pagina }).map((response: Response) => response.json().data);
    }

    listaPaginada(pagina: number = 1, resultados_por_pagina: number = 20): Observable<any> {
        return this.jwtRequest.get(InsumosMedicosService.URL, null, { page: pagina, per_page: resultados_por_pagina }).map((response: Response) => response.json().data);
    }

    ver(id: any): Observable<any> {
        return this.jwtRequest.get(InsumosMedicosService.URL, id, {}).map((response: Response) => {

            let jsonData = response.json().data;
            return jsonData;
        }) as Observable<any>;
    }

    crear(item: any): Observable<any> {
        return this.jwtRequest.post(InsumosMedicosService.URL, item).map((response: Response) => response.json().data) as Observable<any>;
    }

    editar(id: any, item: any): Observable<any> {
        return this.jwtRequest.put(InsumosMedicosService.URL, id, item).map((response: Response) => response.json().data) as Observable<any>;
    }

    eliminar(id: any): Observable<any> {
        return this.jwtRequest.delete(InsumosMedicosService.URL, id).map((response: Response) => response.json().data) as Observable<any>;
    }

   
}
