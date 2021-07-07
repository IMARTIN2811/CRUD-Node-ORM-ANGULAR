import { Component, OnInit } from '@angular/core';
//importa modules
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { FrmCheckComponent } from 'src/app/Components/Msg/frm-check/frm-check.component';
import { FrmOkComponent } from 'src/app/Components/Msg/frm-ok/frm-ok.component';
import { UsersService } from '../../../services/users.service';
import { TokenStorageService } from '../../../services/token-storage.service';
//

@Component({
  selector: 'app-frm-data',
  templateUrl: './frm-data.component.html',
  styleUrls: ['./frm-data.component.css']
})
export class FrmDataComponent implements OnInit {

  products: any;
  currentProduct = null;
  currentIndex = -1
  name = '';
  content : string;
  rol: any;

  constructor( private productService: ServiceService,
               private userService: UsersService,
               public dialog: MatDialog,
               private token: TokenStorageService 
               ) {     
              }

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

    this.recuperaProduct();
  }

  //recupera todos los productos
  recuperaProduct(): void{
    this.productService.getAll()
      .subscribe( data => {
        this.products = data;
        console.log(data);
      },
        error =>{
          console.log(error);
      });
  }

  actualizaList(): void {
    this.recuperaProduct();
    this.currentProduct = null;
    this.currentIndex = -1;
  }

  setActiveProduct(product,index): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  /*
  removeAllProducts(): void {
    this.productService.deleleAll()
    .subscribe(
      response =>{
        console.log(response);
        this.actualizaList();
      },
      error => {
        console.log(error);
      });
  }
  */

  mostrarDialog(): void {
    this.dialog.open(FrmCheckComponent, {
      data: '¿Desea eliminar todos los productos?',
      height: '310px',
      width: '320px'  
    })
    .afterClosed()
      .subscribe((confirmar: Boolean) => {
        if (confirmar) {
          this.productService.deleleAll()
      .subscribe(
        response =>{
          console.log(response);
          this.actualizaList();
          //this.angForm.value();
        },
        error => {
          console.log(error);
        });
        this.dialog.open(FrmOkComponent, {
          data: 'Se eliminaron exitosamente',
          height: '310px',
          width: '320px', 
        })
      } else {
        
      }
    });
  }

}
