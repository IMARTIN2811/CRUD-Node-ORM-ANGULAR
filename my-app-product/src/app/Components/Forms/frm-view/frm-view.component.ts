import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
/* */
import { ServiceService } from 'src/app/services/service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
import jsPDF  from 'jspdf';
import pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { DatePipe } from '@angular/common';
import { Utils } from '../Utils/utils';
/* */

@Component({
  selector: 'app-frm-view',
  templateUrl: './frm-view.component.html',
  styleUrls: ['./frm-view.component.css']
})

export class FrmViewComponent implements OnInit {
  //@ViewChild('listProduct', { static:false }) View:ElementRef;
  @ViewChild('listProduct') pdfTable;
  products = [];
  rol:any;
  content: string;
  imgURL: string;
  str2 = new String("$");
  str1: any; 

  constructor(private productService: ServiceService,
              private token: TokenStorageService,
              private userService: UsersService,
              public datePipe: DatePipe) { }

  ngOnInit(): void {
    //Permite agregar el rol a componente
    this.rol = this.token.getUser();
    this.userService.getAdmin().subscribe(
      data=>{
        this.content = data;
      },
      err=>{
        this.content = JSON.parse(err.error).message;
      }
    );
    //Llama el metodo para visualizar los datos al ejecutar la app
    this.showProducts();  
    
    //Se llama el metodo y se le asigna la ruta de la imagen
    Utils.getImageDataUrlFromLocalPath1('assets/images/logo.png').then(
      result => this.imgURL = result
    )  

  }

  /*Se crea el método  y hace la peticion get */
  showProducts(){
    this.productService.getAll()
      .subscribe(data => {
        this.products = data;
        console.log(data);
      },
        error =>{
          console.log(error)
        });
  }

  //Se hace la conversion y se descarga el doc
  downDocPdf(action = 'open'){
    const doc = new jsPDF;
    const pdfTable = this.pdfTable.nativeElement;
    
    //Se crea el contenido del documento
    const documentDefinition = { 
      //Hace que la pagina sea tamaño carta
      pageSize: 'LETTER',
      //se agrega el encabezado y una img al documento
      header: {
        image: this.imgURL,
        fit: [150,75],
        margin: [40,30],
      },
      images:{
        imageHead: 'data:image/jpeg;base64,...encodedContent...'
      },
      //Se realizan las configuraciones del contenido del documento
      content: [
      {
        text: 'Demo PDF',
        style: 'sectionHeader',
        alignment: 'center'
      },
      {text: 'Datos de la empresa', bold:'true', 
        alignment:'left',fontSize:14},
      {text: 'XtendIT América SA de CV'},
      {text: 'Calle Francisco 355'},
      {text: 'Leones,CP. 64600, Mty. Nuevo León'},
      {
        text: 'Datos del empleado',style: 'sectionHeader'
      },
      //Se crea una columna con los datos del user, fecha/hora del documento
      {
        columns:[
          [
            {text: `USUARIO:${this.rol.username}`},
            {text: `EMAIL:${this.rol.email}`},
          ],
          [
            {
              text: `FECHA:${new Date().toLocaleDateString()}`,
              alignment: 'right'
            },
            {
              text: `HORA:${new Date().toLocaleTimeString()}`,
              alignment: 'right'
            },
          ]
        ]
      },
      {
        text: 'Detalles',
        style: 'sectionHeader'
      },
      //Se crea un tabla con los datos que desea imprimir 
      {  
      margin: [20,10],
      //layout: 'noBorders',
      alignment: 'center',
        table:{
          headerRows: 1,
          widths: ['*','auto','auto','auto','auto'],
          heights:[30],
          body:[
            [{text:'ID',fillColor: '#642EFE',bold:true},
             {text:'NOMBRE',fillColor: '#642EFE',bold:true},
             {text:'FECHA CREACIÓN',fillColor: '#642EFE',bold:true},
             {text:'FECHA ACTUALIZACIÓN',fillColor: '#642EFE',bold:true},
             {text:'PRECIO',fillColor: '#642EFE',bold:true}],
            ...this.products.map(p=>([ p.id,p.name, 
              this.datePipe.transform(p.createdAt, 'dd/MM/yyyy'),
              this.datePipe.transform(p.updatedAt, 'dd/MM/yyyy'),p.price])),
              [{text:'Total:',bold:true,alignment: 'left', 
              colSpan: 4},{},{},{},this.products.reduce((sum,p)=> sum + (p.price ++),0)]
          ],
        }
      },{
        text: 'Detalles adicionales',
        style: 'sectionHeader',
      },
        {
          columns: [
          [ 
            {text: 'Para mas información, escanea el código:'},
            {qr:'text in QR', fit: '50'}
          ],
        ]
      }],
      //aplica estilos alos titulos 
      styles: {
        sectionHeader: {
          bold: true,
          fontSize: 14,
          margin: [0,30,0, 15]          
        },
      }, 

      //Se agrega el footer
      footer: function (currentPage, pageCount) {
        return{
          table:{
            widths: ['*'],
            body: [
              [{text: 'Página: ' + currentPage + " de " + pageCount, alignment:'right'}]
            ]
          },
          layout: 'noBorders',
          margin: [39,10]
        };
      },
    };

    //accion para descargar la imagen 
    if (action === 'download'){
      pdfMake.createPdf(documentDefinition).download();
    }
    //accion para imprimir
    else if (action === 'print'){
      pdfMake.createPdf(documentDefinition).print();
    //accion para visualizar el documento
    }else{
      pdfMake.createPdf(documentDefinition).open();
    }
  }
}
