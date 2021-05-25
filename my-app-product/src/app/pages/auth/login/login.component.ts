import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones*/
import { ServiceService  } from '../../../services/service.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';
/*Termina las importaciones*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  form : any = {};
  MsgLoginSuccess = false;
  MsgLoginFailed = false;
  errorMsg = '';
  roles: string[] = [];

  constructor( 
    private service: ServiceService,
    private authStorage: TokenStorageService,
    private router: Router
   ) { }

  ngOnInit(): void {
    /*Verifica el estado de sesion y guardar el token */
    if (this.authStorage.getToken()) {
      this.MsgLoginSuccess = true;
      this.roles = this.authStorage.getUser().roles;
      this.router.navigate(['/profile']);
    }
  }

  /*Se crea el metodo para el logeo*/
  loginUsers(): void{
    /*Llama el servicio y el metodo login */
    this.service.getLogin(this.form).subscribe(
      data=>{
        /*LLama el servicio authStorage y el metodo saveToken */
        this.authStorage.saveToken(data.accessToken);
        this.authStorage.getSaveUser(data);
        /*Llamas los mensajes de confirmacion */
        this.MsgLoginFailed = false;
        this.MsgLoginSuccess = true;
        this.roles = this.authStorage.getUser().roles;
        this.reloadPage();
      },
      /*Si hay algun error mandara un mensaje */
      err =>{
        this.errorMsg = err.error.message;
        this.MsgLoginFailed = true;
      }
    );
  }
  
  /*Se crea el metodo para recargar la pagina*/
  reloadPage(): void{
    window.location.reload();
  }
}
