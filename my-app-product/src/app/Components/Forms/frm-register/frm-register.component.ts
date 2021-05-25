import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones*/
import { ServiceService  } from '../../../services/service.service'
import { MatDialog } from '@angular/material/dialog'; 
import { FrmOkComponent } from '../../Msg/frm-ok/frm-ok.component';
/*Termina las importaciones*/

@Component({
  selector: 'app-frm-register',
  templateUrl: './frm-register.component.html',
  styleUrls: ['./frm-register.component.css']
})
export class FrmRegisterComponent implements OnInit {

  hide = true;
  form: any = {};
  MsgSuccessful = false;
  MsgSignupFailed = false;
  ErrorMsg = '';
  //submitted = false;

  constructor(private service: ServiceService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  //crea el metodo para guardar usuarios
  saveUsers(): void{
    //llama el servicio y el metodo registro
    this.service.getRegister(this.form).subscribe(
      data => {
        console.log(data)
        this.MsgSuccessful = true;
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
