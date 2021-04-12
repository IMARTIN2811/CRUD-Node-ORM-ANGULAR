import { Component, OnInit } from '@angular/core';
//
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FrmCheckComponent } from 'src/app/Components/Msg/frm-check/frm-check.component';
import { MatDialog } from '@angular/material/dialog';
import { FrmOkComponent } from '../../Msg/frm-ok/frm-ok.component';
//
@Component({
  selector: 'app-frm-update',
  templateUrl: './frm-update.component.html',
  styleUrls: ['./frm-update.component.css']
})
export class FrmUpdateComponent implements OnInit {

  currentProducts = null;
  message = '';

  constructor( 
    private productService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.message = '';
    this.getProducts(this.route.snapshot.paramMap.get('id'));
  }

  getProducts(id): void {
    this.productService.get(id)
    .subscribe(
      data => {
        this.currentProducts = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      });
  }
  /* 
  updatePublished(status): void {
    const data = {
      name: this.currentProducts.name,
      price: this.currentProducts.price,
      published: status
    };

    this.productService.update(this.currentProducts.id,data)
    .subscribe(
      response =>{
        this.currentProducts.published = status;
        console.log(response);
      },
      error =>{
        console.log(error);
      });
  }
*/
  updateProduct(): void {
    this.productService.update(this.currentProducts.id, this.currentProducts)
    .subscribe(
      response => {
        console.log(response);
        this.message = 'El producto se actualizó correctamente!';
      },
      error =>{
        console.log(error);
      });   
  }

  mostrarDialog():void{
    this.dialog.open(FrmCheckComponent, {
      data: '¿Desea eliminar el producto?',
      height: '310px',
      width: '320px'
    })
    .afterClosed()
    .subscribe(( confirmar: Boolean ) =>{
      if (confirmar) {
        this.productService.delete(this.currentProducts.id)
        .subscribe(
          response =>{
            console.log(response);
            this.router.navigate(['/data']);
          },
          error => {
            console.log(error);
          });
        this.dialog.open(FrmOkComponent,{
          data: 'Se eliminó exitosamente',
          height: '310px',
          width: '320px',
        })
      }
    })
  }

  deleteProduct(): void {
    
  }
  
}
