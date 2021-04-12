import { Component, Inject, OnInit } from '@angular/core';
//importaciones
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//

@Component({
  selector: 'app-frm-check',
  templateUrl: './frm-check.component.html',
  styleUrls: ['./frm-check.component.css']
})
export class FrmCheckComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<FrmCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string
  ) { }

  cerrarDialog() : void {
    this.dialog.close(false)
  }

  confirma() : void{
    this.dialog.close(true);
  }

  ngOnInit(): void {
  }

}
