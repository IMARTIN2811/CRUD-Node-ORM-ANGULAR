import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//EventEmitter permite crear eventos personalizados
//
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //variables para mostrar y ocultar sidenav
  varAdmin = false;

  //crea la propiedad togglerSidenav y despues crea la instancia de eventemitter
  @Output() togglerSidenav = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  //crea el metodo 
  onToggleSidenav(): void{
    //cuando el user de clic en el header va mostrar el toggler
    this.togglerSidenav.emit();
  }
}
