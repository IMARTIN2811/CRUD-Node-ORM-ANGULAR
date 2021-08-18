import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones*/
import { ServiceService  } from '../../../services/service.service'
import { MatDialog } from '@angular/material/dialog'; 
import { UsersService } from 'src/app/services/users.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
/*Termina las importaciones*/

@Component({
  selector: 'app-frm-register',
  templateUrl: './frm-register.component.html',
  styleUrls: ['./frm-register.component.css']
})
export class FrmRegisterComponent implements OnInit {

  hide = true;
  form: any = {};
  MsgSuccessful = '';
  MsgSignupFailed = false;
  ErrorMsg = '';
  content: string;
  rol: any;

  constructor(private service: ServiceService,
              private token: TokenStorageService,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.rol = this.token.getUser();
    this.userService.getAdmin().subscribe(
      data =>{
        this.content = data;
      },
      err =>{
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  //crea el metodo para guardar usuarios
  saveUsers(): void{
    //llama el servicio y el metodo registro
    this.service.getRegister(this.form).subscribe(
      data => {
        console.log(data)
        this.MsgSuccessful = 'Se ha guardado correctamente';
        this.MsgSignupFailed = false;
      },
      //si hay algun error en el registro mandara el mensaje
      err => {
        this.ErrorMsg = err.error.message;
        this.MsgSignupFailed = true;
      }
    );
  }

}
