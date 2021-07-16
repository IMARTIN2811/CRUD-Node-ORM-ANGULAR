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

  constructor(private productService: ServiceService,
              private token: TokenStorageService,
              private userService: UsersService,
              public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.rol = this.token.getUser();
    this.userService.getAdmin().subscribe(
      data=>{
        this.content = data;
      },
      err=>{
        this.content = JSON.parse(err.error).message;
      }
    );
    this.showProducts();  
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
  
    const documentDefinition = { 
      content: [
      {
        text: 'Demo a PDF',
        fontSize: 16,
        alignment: 'left',
        bold: 'true',
        decoration: 'underline'
      },
      {text: 'XtendIT América SA de CV'},
      {text: 'Calle Francisco 355'},
      {text: 'Leones,64600, Monterrey Nuevo León'},
      {
        text: 'Datos del empleado',
        style: 'sectionHeader'
      },
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
      {
        table:{
          headerRows: 1,
          widths: ['*','auto','auto','auto','auto'],
          body:[
            ['ID','NOMBRE','FECHA CREACIÓN','FECHA ACTUALIZACIÓN','PRECIO'],
            ...this.products.map(p=>([p.id,p.name,
              this.datePipe.transform(p.createdAt, 'dd/MM/yyyy'),
              this.datePipe.transform(p.updatedAt, 'dd/MM/yyyy'),p.price])),
              [{text:'Total:', colSpan: 4},{},{},{},this.products.reduce((sum,p)=> sum + (p.price ++),0)]
          ],
        }
      }],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      } 
    };
    if (action === 'download'){
      pdfMake.createPdf(documentDefinition).download();
    }
    else if (action === 'print'){
      pdfMake.createPdf(documentDefinition).print();
    }else{
      pdfMake.createPdf(documentDefinition).open();
    }
  }
}
