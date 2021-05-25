import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones */
import { UsersService } from '../../services/users.service';
/* */

@Component({
  selector: 'app-rol-emp',
  templateUrl: './rol-emp.component.html',
  styleUrls: ['./rol-emp.component.css']
})
export class RolEmpComponent implements OnInit {

  content: string;
  rolUser: any;

  constructor( private userService: UsersService ) { }

  ngOnInit(): void {
    /*Llama el servicio y el metodo para el rol empleado */
    this.userService.getEmployee().subscribe(
      data =>{
        this.content = data;
      },
      err =>{
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
