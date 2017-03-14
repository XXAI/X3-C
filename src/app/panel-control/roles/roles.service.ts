import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { JwtRequestService } from '../../jwt-request.service';

import { API_URL } from '../../config';

import { Rol } from './rol';


@Injectable()
export class RolesService {

  static readonly URL: string = "roles";
  
  constructor(private http: Http,  private jwtRequest:JwtRequestService) { }

  lista(): Observable<Rol[]>{
    return this.jwtRequest.get(RolesService.URL).map( (response: Response) => response.json().data) as Observable<Rol[]>;
  }

}
