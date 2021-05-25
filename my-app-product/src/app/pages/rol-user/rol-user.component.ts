import { Component, OnInit } from '@angular/core';
/* */
import { UsersService } from '../../services/users.service';
/* */

@Component({
  selector: 'app-rol-user',
  templateUrl: './rol-user.component.html',
  styleUrls: ['./rol-user.component.css']
})
export class RolUserComponent implements OnInit {

  content: string;

  constructor( private userService: UsersService ) { }

  ngOnInit(): void {
    /*Llama el servicio y el metodo para el user user */
    this.userService.getUser().subscribe(
      data => {
        this.content = data;
      },
      /*Si hay un error mandara un mensaje */
      err =>{
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
