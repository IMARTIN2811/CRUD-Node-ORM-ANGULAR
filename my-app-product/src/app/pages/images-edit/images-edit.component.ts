import { Component, OnInit, Inject } from '@angular/core';
/*Importaciones */
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'
/*Terminan las importaciones */

@Component({
  selector: 'app-images-edit',
  templateUrl: './images-edit.component.html',
  styleUrls: ['./images-edit.component.css']
})
export class ImagesEditComponent implements OnInit {

  public dataUpdate = { description:'' };
  public selectFile : any;
  public id:any
  public imgUrl = '';

  constructor(private http: HttpClient,
              private dialogRef: MatDialogRef<ImagesEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.id = this.data.id;
  }

  fileUpload(event){
    this.selectFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectFile);
    reader.onload = (event: any)=>{
      this.imgUrl = event.target.result;
    }
  }

  UpdateImage(event){
    event.preventDefault();
    const data: FormData = new FormData();
    data.append('image',this.selectFile);
    this.http.post('http://localhost:8080/api/images/'+this.id,data)
      .subscribe(res=>{
        console.log(res);
        if(res['status'] === 200){
        this.dialogRef.close(res['status']);
      }
    })
    
  }

  UpdateText(){
    //event.preventDefault();
    var data ={
      id: this.data.id,
      description: this.dataUpdate.description
    }
    this.http.patch('http://localhost:8080/api/images', data)
      .subscribe(res=>{
        console.log(res['status']);
        this.dialogRef.close(res['status']);
      });
  }

  close(){
    this.dialogRef.close();
  }

}
