import { Component, OnInit } from '@angular/core';
//importa el servicio
import { ServiceService } from 'src/app/services/service.service';
import { FormGroup,FormBuilder, Validators }  from '@angular/forms'
import { FrmOkComponent } from 'src/app/Components/Msg/frm-ok/frm-ok.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
//

@Component({
  selector: 'app-frm-product',
  templateUrl: './frm-product.component.html',
  styleUrls: ['./frm-product.component.css']
})
export class FrmProductComponent implements OnInit {

  angForm: FormGroup;
  currentProducts = null;

  producto = {
    name: '',
    price: ''
    //published: false
  };
  submitted = false;
  
  constructor(
    private servicio: ServiceService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.getProducts(this.route.snapshot.paramMap.get('id'));
  }

  //accedea a todos los productos por id
  getProducts(id): void {
    this.servicio.get(id)
    .subscribe(
      data => {
        this.currentProducts = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      });
  }

  /* */
  OnResetForm(){
    this.angForm.reset();
  }

  /* */
  onsaveForm(): void{
    if (this.angForm.valid){
      this.angForm.value();
      this.OnResetForm();
    }
  }

  /* 
  saveProducts(): void{
    //accede a los input del forms
    const data = {
      name: this.producto.name,
      price: this.producto.price
    };
    //crea la funcion para agregar los products
    this.servicio.create(data)
    .subscribe(
      response =>{
        console.log(response);
        this.submitted = true;
        this.angForm.value();
      },
      error =>{
        console.log(error);
      });
  }
*/

  mostrarDialog(): void{
    this.dialog.open(FrmOkComponent,{
      data: 'Se ha guardado exitosamente',
      height: '310px',
      width: '320px'
    })
    .afterClosed()
      .subscribe(() =>{
        //if (confirmar) {
          //accede a los input del forms
        const data = {
          name: this.producto.name,
          price: this.producto.price
        };
        //crea la funcion para agregar los products
        this.servicio.create(data)
        .subscribe(
          response =>{
            console.log(response);
            this.router.navigate(['/producto']);
            //this.submitted = false;
            this.angForm.value();
          },
          error =>{
            console.log(error);
          });    
        //}
      });
  }

  get name() { return this.angForm.get('name'); }
  get price() { return this.angForm.get('price'); }

  //limpiar el formulario 
  newProduct():void {
    this.submitted = false;
    this.producto = {
      name: '',
      price: ''
      //published: false
    };

  }

}

