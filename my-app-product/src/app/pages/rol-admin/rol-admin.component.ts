import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones */
import { UsersService } from '../../services/users.service';
import { TokenStorageService } from '../../services/token-storage.service';
/* */

@Component({
  selector: 'app-rol-admin',
  templateUrl: './rol-admin.component.html',
  styleUrls: ['./rol-admin.component.css']
})
export class RolAdminComponent implements OnInit {

  content: string;
  rol: any;

  constructor( private userServices: UsersService,
               private token: TokenStorageService ) { }

  ngOnInit(): void {
    
    this.rol = this.token.getUser();
    /*llama el servicio y el metodo para el rol admin*/
    this.userServices.getAdmin().subscribe(
      data =>{
        this.content = data;
      },
      /*Si hay un error mandara un error */
      err =>{
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
