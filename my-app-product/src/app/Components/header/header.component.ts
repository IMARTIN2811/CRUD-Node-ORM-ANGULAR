import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/*Se hacen las importaciones */
import { TokenStorageService } from '../../services/token-storage.service';
import { ServiceService } from '../../services/service.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
/**/

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  isLoggin = false;
  showFrmAdmin = false;
  showFrmEmp = false;
  username: string;  

  constructor(private tokenStorage: TokenStorageService,
              private serv: ServiceService,
              private userServ: UsersService,
              private router: Router ) { }

  ngOnInit(): void {
    this.isLoggin = !!this.tokenStorage.getToken()  
    /*si se ha iniciado sesion */
    if (this.isLoggin) {
      /*Muestra los datos del usuario dependiendo el rol */
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      this.showFrmAdmin = this.roles.includes('ROLE_ADMIN');
      this.showFrmEmp = this.roles.includes('ROLE_EMPLOYEE');
      
      this.username = user.username;
    }
  }

  /*Metodo para cerrar sesion */
  logout(): void{
    this.tokenStorage.signOut();
    //this.router.navigateByUrl('/login');
    window.location.reload();
    //this.router.navigate(['/home']);
    //window.stop();
  }  

}
