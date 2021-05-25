import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones */
import { UsersService  } from '../../services/users.service';
/**/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;

  constructor( private userService: UsersService ) { }

  ngOnInit(): void {
    /*llama el servicio y el metodo getPublic*/
    this.userService.getContentPublic().subscribe(
      data =>{
        this.content = data;
      },
      err =>{
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
