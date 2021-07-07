import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public data = [];

  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
    this.getImages();
  }
  
  getImages(){
    this.data = [];
    this.http.get('http://localhost:8080/api/images/all')
      .subscribe(res =>{
        console.log(res);
        for (const dd of res['data']){
          var imgUrl = btoa(dd.image.data.reduce((data,byte)=> data + String.fromCharCode(byte), ''))
          this.data.push({ id: dd.image_id, description: dd.description, url: imgUrl });
        }
      })
  }

}
