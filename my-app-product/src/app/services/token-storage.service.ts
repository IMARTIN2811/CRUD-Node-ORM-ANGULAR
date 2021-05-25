import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
/*se hacen las importacones*/
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
/*Terminan las importaciones*/

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor( private router: Router) { }

  //eliminar todos los datos del storage y lo limpia
  signOut(): void {
    window.sessionStorage.clear();
    //window.location.reload(); 
    //this.router.navigate(['/login'])
  }

  //guarda el token
  public saveToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token );
  }
  //devuelve el token del usuario
  public getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY);
  }
  //guarda el token del usuario
  public getSaveUser(user): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  //
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

}
