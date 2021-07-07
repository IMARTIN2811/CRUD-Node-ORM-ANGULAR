import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
/*Importa el archivo servicio */
import { TokenStorageService } from '../../services/token-storage.service';
import { HttpClient,HttpEventType } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  @ViewChild('Img', {static:false})myInputVariable: ElementRef;
  content: string;
  rol: any;
  imgURL = '';
  public SelectFile: any;
  public imagen = { description: '' };
  MsgSuccess = '';
  MsgFail= false;
  ErrMessage = '';
  progress: number;

  constructor(private token: TokenStorageService,
              private userServiciew: UsersService,
              private http: HttpClient ) { }

  ngOnInit(): void {
    
    this.rol = this.token.getUser();
    this.userServiciew.getAdmin().subscribe(
      data =>{
        this.content = data;
      },
      err =>{
        this.content = JSON.parse(err.error).message;
      }
    );
    
  }

  selectImage(event){
    this.SelectFile = event.target.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(this.SelectFile);
      reader.onload = (event: any)=>{
        this.imgURL = event.target.result;
      }
    console.log(this.imagen.description);
  }

  saveImages(event){
    event.preventDefault();
    console.log(this.imagen.description);

    const data: FormData = new FormData();
    data.append('image', this.SelectFile);
    data.append('description', this.imagen.description);
    this.http.post('http://localhost:8080/api/images', data,{
      reportProgress: true,
      observe: "events"
    }).pipe(
      map(( event: any )=>{
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((100 / event.total) * event.loaded);
        } else if (event.type == HttpEventType.Response){
          this.progress = null;
        }
      }),
      catchError((err: any) => {
        this.progress = null;
        alert(err.message);
        return throwError(err.message);
      })
    )
      .subscribe(res =>{
        console.log(res);
        this.MsgSuccess = 'Se ha guardado correctamente';
        //this.MsgFail = false;
        window.location.reload();
      }, 
      
      err=>{
        this.ErrMessage = err.error.message;
        this.MsgFail = true;
      }); 
  }
  
  clearForm(){
    
    document.getElementById('imagen').removeAttribute('src')
    this.myInputVariable.nativeElement.value = null;
    this.imagen = {     
      description: ''
    };
  }

}
