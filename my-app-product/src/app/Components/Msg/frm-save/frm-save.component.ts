import { Component, Inject, OnInit } from '@angular/core';
//
//import { MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//

@Component({
  selector: 'app-frm-save',
  templateUrl: './frm-save.component.html',
  styleUrls: ['./frm-save.component.css']
})
export class FrmSaveComponent implements OnInit {

  constructor(
    //public dialog: MatDialogRef<FrmSaveComponent>,
    //@Inject(MAT_DIALOG_DATA) public mensaje: string
  ) { }

  ngOnInit(): void {
  }

  cerrarDialog(): void {
    //this.dialog.close(false);
  }

}
