import { Injectable } from '@angular/core';
//se importan las librerias
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl= 'http://localhost:8080/api/products'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //accede a la ruta de mostrar datos
  getAll(): Observable<any>{
    return this.http.get(baseUrl);
  }
  //accede a la ruta por id
  get(id): Observable<any>{
    return this.http.get(`${baseUrl}/${id}`);
  }
  //accede para hacer nuevos registros
  create(data): Observable<any>{
    return this.http.post(baseUrl,data);
  }
  //accede para editar registros
  update(id,data): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  //accede para eliminar registros
  delete(id): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }
  //
  deleleAll():Observable<any>{
    return this.http.delete(baseUrl);
  }
  findByTitle(title):Observable<any>{
    return this.http.get(`${baseUrl}? title=${title}`);
  }
  
}
