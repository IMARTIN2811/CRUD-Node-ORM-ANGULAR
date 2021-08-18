import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones*/
import { ServiceService } from 'src/app/services/service.service';
import { UsersService } from 'src/app/services/users.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
/*Termina las importaciones*/

@Component({
  selector: 'app-frm-user',
  templateUrl: './frm-user.component.html',
  styleUrls: ['./frm-user.component.css']
})
export class FrmUserComponent implements OnInit {
  
  showUsers:any;
  showRol:any;
  content: string;
  rol: any;

  constructor(private Service:ServiceService,
              private userServive:UsersService,
              private token:TokenStorageService) { }

  ngOnInit(): void {
    //Llama el token
    this.rol = this.token.getUser();
    //Llama el rol admin
    this.userServive.getAdmin()
      .subscribe(
        data=>{
          this.content = data;
        },
        err=>{
          this.content =JSON.parse(err.error).message;
        }
      );
    //Llama el metodo para visualizar los datos
    this.getUserAll();
  }

  /*Crea el metodo para traer los datos */
  getUserAll(){
    /*Llama el archivo servicio y trae el metodo con la ruta */
    this.Service.getAllUsers()
      .subscribe(data =>{
        this.showUsers = data;
        console.log(data);
      },
      error =>{
        console.log(error)
      });
  }

}
