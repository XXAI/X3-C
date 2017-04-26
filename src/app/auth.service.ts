import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API_URL } from './config';
import { environment } from '../environments/environment';


@Injectable()
export class AuthService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,  private router:Router) { }

  login(id: string, password: string) {
    const url: string = 'obtener-token';
    return this.http.post(`${environment.API_URL}/${url}`,JSON.stringify({id: id, password: password}),{ headers: this.headers }).map( (response: Response) => {
   
      let json = response.json();
      if (json.token) {
        console.log("Token obtenido.")
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('server_info');
        
        localStorage.setItem('token', json.token)
        localStorage.setItem('usuario', JSON.stringify(json.usuario));
        localStorage.setItem('server_info', JSON.stringify(json.server_info));
      }
    });
  }

  refreshToken() {
    const url: string = 'refresh-token?token=' + localStorage.getItem('token');
    return this.http.post(`${environment.API_URL}/${url}`,{},{ headers: this.headers }).map( (response: Response) => {
   
      let json = response.json();
      if (json.token) {
        console.log("Token renovado.")
        localStorage.removeItem('token');
        localStorage.removeItem('server_info');
        localStorage.setItem('token', json.token)
        localStorage.setItem('server_info', JSON.stringify(json.server_info));
      }
    });
  }

  logout(url:string = null) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('server_info');

    if(url != null){
      this.router.navigate(['login'], { queryParams: { returnUrl: decodeURIComponent(url.replace(/\+/g,  " ")) } });
    } else {
      this.router.navigate(['login']);
    }
  }

}
