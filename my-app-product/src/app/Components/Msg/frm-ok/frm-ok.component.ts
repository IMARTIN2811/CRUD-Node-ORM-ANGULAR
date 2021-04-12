import { Component,Inject, OnInit } from '@angular/core';
//
//import { FrmProductComponent } from 'src/app/Components/Forms/frm-product/frm-product.component';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//

@Component({
  selector: 'app-frm-ok',
  templateUrl: './frm-ok.component.html',
  styleUrls: ['./frm-ok.component.css']
})
export class FrmOkComponent implements OnInit {

  constructor( 
    public dialog: MatDialogRef<FrmOkComponent>,
    //public frmProduct: FrmProductComponent,
    @Inject(MAT_DIALOG_DATA) public mensaje: string
  ) { }

  ngOnInit(): void {
  }

  cerrarDialog() : void {
    //this.frmProduct.newProduct();
    this.dialog.close(false)
  }
}
