import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Tema } from './tema';

import { JwtRequestService } from '../jwt-request.service';

@Injectable()
export class AvanceService {

  static readonly URL: string = "avance";
  static readonly URL_DETALLE: string = "avance-detalle";
  static readonly URL_USUARIOS: string = "avance-usuario-privilegio";
  	
  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(AvanceService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
	}

  buscar_detalle(id:string, term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(AvanceService.URL_DETALLE,null,{identificador: id,q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

	lista(pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(AvanceService.URL,null,{page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
	}

	crear(avance: Tema): Observable<Tema> {
      return this.jwtRequest.post(AvanceService.URL,avance).map( (response: Response) => response.json().data) as Observable<Tema>;
    }

    ver_tema(id:any): Observable<Tema>{
    return this.jwtRequest.get(AvanceService.URL,id,{}).map( (response: Response) => {
     
       let jsonData = response.json().data;
       
        var tema = jsonData as Tema;
      
        return tema;
      }) as Observable<Tema>;
    }

    ver_informacion(id:any): Observable<any>{
      return this.jwtRequest.get(AvanceService.URL,id,{informacion:1}).map( (response: Response) => response.json().data);
  	}



   editar(id:any, tema: Tema): Observable<Tema> {
     return this.jwtRequest.put(AvanceService.URL,id, tema).map( (response: Response) => response.json().data) as Observable<Tema>;
   }

   lista_detalles(id:string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(AvanceService.URL_DETALLE,null,{identificador: id, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  eliminar(id:any): Observable<any>{
    return this.jwtRequest.delete(AvanceService.URL_DETALLE,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var avance = jsonData as any;
        
        return avance;
      }) as Observable<any>;
  }

  usuarios(id:any): Observable<any> {
     return this.jwtRequest.get(AvanceService.URL_USUARIOS,null,{identificador: id}).map( (response: Response) => response.json().data);
   }

   crear_usuario(usuario:any): Observable<any> {
     return this.jwtRequest.post(AvanceService.URL_USUARIOS,usuario).map( (response: Response) => response.json().data) as Observable<any>;
   }

   elimina_usuarios(id:string): Observable<any> {
    return this.jwtRequest.delete(AvanceService.URL_USUARIOS,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var avance = jsonData as any;
        
        return avance;
      }) as Observable<any>;
   }
}
