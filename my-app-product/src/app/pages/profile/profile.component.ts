import { Component, OnInit } from '@angular/core';
/*Se hacen las importaciones */
import { TokenStorageService  } from '../../services/token-storage.service';
import { Router } from '@angular/router';
/* */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  rolUser: any;
  isLogin: false;

  constructor( private token: TokenStorageService,
                private router: Router ) { }

  ngOnInit(): void {
    //Se llama la variable y se le asigna un valor
    this.rolUser = this.token.getUser();    
  }

}
