import { Component, OnInit } from '@angular/core';
/*importaciones */
import { TokenStorageService } from '../../services/token-storage.service';
import { UsersService} from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImagesEditComponent } from '../images-edit/images-edit.component';
import { FrmCheckComponent } from 'src/app/Components/Msg/frm-check/frm-check.component';
import { FrmOkComponent } from 'src/app/Components/Msg/frm-ok/frm-ok.component';
import { NgxSpinnerService } from 'ngx-spinner';
/*Termina importaciones */

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {
  
  content : string;
  rol : any;
  public data = [];
  currentImg: null;
  allpost;  
  notEmptyPost = true;
  notscrolly = true;

  constructor(private token: TokenStorageService,
              private userService: UsersService,
              private http: HttpClient,
              private dialog:MatDialog,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //this.loadInitPost();
    this.rol = this.token.getUser();
    this.userService.getAdmin().subscribe(
      data=>{
        this.content = data;
      },
      err=>{
        this.content = JSON.parse(err.error).message;  
      }
    );
    
    this.showImages();
  }

  onScroll(){
   console.log('scroll');
  }

  /*Crea el metodo y hace la peticion get */
  showImages(){
    this.data = [];
    this.http.get('http://localhost:8080/api/images/all')
      .subscribe(res=>{
        console.log(res);
        for (const dd of res['data']){
          var imgUrl = btoa(dd.image.data.reduce((data,byte)=> 
            data + String.fromCharCode(byte),''))
            this.data.push({ id: dd.image_id, description: dd.description, createdAt: dd.createdAt, updatedAt: dd.updatedAt, url: imgUrl });
        }
      },
      err=>{
        console.log(err);
      });
  }

  getFrmEditComp(id){
    const dialogRef = this.dialog.open(ImagesEditComponent, { disableClose: true, data: {
      id: id,
    },
        height: '360px', 
        width:'470px'
  });
    
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
      if (result === 200) {
        this.showImages();
      }
    });
  } 

  getFrmDelete(id){
    const dialogRef = this.dialog.open(FrmCheckComponent,{ disableClose: true,
      data: '¿Desea eliminar la imagen?',
      height: '310px',
      width: '320px'
    })
      .afterClosed()
        .subscribe((confirmar: Boolean)=>{
          if (confirmar) {
            this.http.delete('http://localhost:8080/api/images/delete/'+id)
            .subscribe(data =>{
              console.log(data)
              window.location.reload();
            },
            error =>{
              console.log(error);
            });
            this.dialog.open(FrmOkComponent, {
              data: 'Se eliminó exitosamente',
              height: '310px',
              width: '320px',
            })
          }

        })
        

  }
}
