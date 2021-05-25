import { Injectable } from '@angular/core';
/*Se hacen las importaciones*/
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/*Termina las importaciones*/

//se define la ruta del api
const C_url = 'http://localhost:8080/api/test/';
const C_url2 = 'http://localhost:8080/api/prod/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  //metodo para acceder a todo
  getContentPublic(): Observable<any>{
    return this.http.get(C_url + 'all', { responseType: 'text' }); 
  }

  //metodo para acceder al rol de usuario 
  getUser(): Observable<any>{
    return this.http.get(C_url + 'user', { responseType: 'text' });
  }

  //metodo para acceder al rol de empleado
  getEmployee(): Observable<any>{
    return this.http.get(C_url + 'emp', { responseType: 'text' });
  }

  //metodo para acceder al rol admin
  getAdmin(): Observable<any>{
    return this.http.get(C_url + 'admin', { responseType: 'text' });
    //return this.http.get(C_url2 + 'producto', { responseType: 'text' });
  }

}
