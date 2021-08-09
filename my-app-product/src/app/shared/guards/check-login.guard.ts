import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
/* */
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { UsersService } from '../../services/users.service';
/* */

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  isLoginIn = false;

  constructor(private serv: ServiceService,
              private userServ: UsersService,
              private token: TokenStorageService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    )
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      /*verifica si el usuario se ha autenticado*/
      if (!this.token.getToken()) {
        /*si no hay autent. lo redirije al login*/
        this.router.navigate(['/login'])
        return false;
    }
    return true;
  }
  
}
