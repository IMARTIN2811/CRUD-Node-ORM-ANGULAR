import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones*/
import { ServiceService } from 'src/app/services/service.service';
import { UsersService } from 'src/app/services/users.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FrmCheckComponent } from '../../Msg/frm-check/frm-check.component';
import { FrmOkComponent } from '../../Msg/frm-ok/frm-ok.component';
import { HttpClient } from '@angular/common/http';
/*Termina las importaciones*/

@Component({
  selector: 'app-frm-user',
  templateUrl: './frm-user.component.html',
  styleUrls: ['./frm-user.component.css']
})
export class FrmUserComponent implements OnInit {
  
  public showUsers = [];
  showRol:any;
  content: string;
  rol: any;

  constructor(private Service:ServiceService,
              private userServive:UsersService,
              private token:TokenStorageService,
              private dialog: MatDialog,
              private http: HttpClient) { }

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

  /*Metodo para eliminar usuarios*/
  getUserDelete(id){
    const dialogRef = this.dialog.open(FrmCheckComponent,{ disableClose: true,
      data: '¿Desea eliminar el usuario?',
      height: '310px',
      width: '320px'
    })
      .afterClosed()
        .subscribe((confirmar: Boolean)=> {
          if (confirmar) {
            this.http.delete('http://localhost:8080/api/user/delete/'+id)
              .subscribe(data =>{
                console.log(data)
                window.location.reload()
              },
              error =>{
                console.log(error);
              });
              this.dialog.open(FrmOkComponent, { disableClose: true,
                data: 'Se eliminó exitosamente',
                height: '310px',
                width: '320px',
              })
          }
        })
  }

}
