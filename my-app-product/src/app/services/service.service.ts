import { Injectable } from '@angular/core';
//se importan las librerias
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
/*Terminan las importaciones*/

const C_baseUrl = 'http://localhost:8080/api/products';
const C_baseUrl2 = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })  
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  /*se configuran las rutas para el api de products*/
  //accede a la ruta de mostrar datos
  getAll(): Observable<any>{
    return this.http.get(C_baseUrl);
  }
  //accede a la ruta por id
  get(id): Observable<any>{
    return this.http.get(`${C_baseUrl}/${id}`);
  }
  //accede para hacer nuevos registros
  create(data): Observable<any>{
    return this.http.post(C_baseUrl,data);
  }
  //accede para editar registros
  update(id,data): Observable<any>{
    return this.http.put(`${C_baseUrl}/${id}`, data);
  }
  //accede para eliminar registros
  delete(id): Observable<any>{
    return this.http.delete(`${C_baseUrl}/${id}`);
  }
  //
  deleleAll():Observable<any>{
    return this.http.delete(C_baseUrl);
  }
  findByTitle(title):Observable<any>{
    return this.http.get(`${C_baseUrl}? title=${title}`);
  }
 
  URL = C_baseUrl;
  /*Termina la configuracion para el api de products*/

  /*Inicia la configuracion para la ruta api de auth*/
  //Hace la peticion para el login 
  getLogin(credentls): Observable<any>{
    return this.http.post(C_baseUrl2 + 'login', {
      username: credentls.username,
      password: credentls.password
    }, httpOptions);
  }

  //Hace la peticion para el registro de usuarios
  getRegister(user): Observable<any>{
    return this.http.post(C_baseUrl2 + 'register', {
      username: user.username,
      email: user.email,
      password: user.password 
    },httpOptions) ;
  }
  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(C_baseUrl2 + 'logout', {});
  }
  /*Termina la configuracion para el api*/

}
