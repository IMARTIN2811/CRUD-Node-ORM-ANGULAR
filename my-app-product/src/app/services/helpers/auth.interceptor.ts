/*se hacen las importacones*/
import { HTTP_INTERCEPTORS,HttpEvent } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../token-storage.service';
import { Observable} from 'rxjs';
/*Terminan las importaciones*/

//const TOKEN_HEADER_KEY "= 'Authorization';
const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()

/*Exporta la clase AuthInterceptor e implementa el HttpInterceptor */ 
export class AuthInterceptor implements HttpInterceptor{
    /*metodo para inspeccionar y transformar las solicitudes HTTP
    antes de enviar al server
    */
    constructor(private token: TokenStorageService){}

    /*Obtiene el objeto HttpRequest, lo cambia y lo reeenvia el metodo HttpHandler
    del objeto handle(). Transforma el objeto HTTPRequest en un observable<HttpEvent>
    */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let L_AuthReq = req;
        const token = this.token.getToken();
        /*Agrega la autorizacion de la cabecera*/
        if ( token != null) {
            L_AuthReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
        
        }
        /*Representa el siguiente interceptor en la cadena que es HttpClient*/
        return next.handle(L_AuthReq); 
    }
}

//Crea un constante y se incluye la clase implementada AuthInterceptor
export const authProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
