import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';

import { FrmProductComponent } from './Components/Forms/frm-product/frm-product.component';

//se importa el formmodule,httpclientmodule
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
//librariies are imported
import { RouterModule, Routes } from '@angular/router';
import { FrmRegisterComponent } from './Components/Forms/frm-register/frm-register.component';
import { InicioComponent } from './Components/Menu/inicio/inicio.component';
import { Page404Component } from './Components/Menu/page404/page404.component';
import { FrmDataComponent } from './Components/Forms/frm-data/frm-data.component';
import { FrmUpdateComponent } from './Components/Forms/frm-update/frm-update.component';
import { FrmCheckComponent } from './Components/Msg/frm-check/frm-check.component';
import { FrmSaveComponent } from './Components/Msg/frm-save/frm-save.component';
import { FrmOkComponent } from './Components/Msg/frm-ok/frm-ok.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//navbar routes are configured
const routes: Routes = [
  { path: 'producto', component: FrmProductComponent  },
  { path: 'frm-register', component: FrmRegisterComponent },
  { path: 'data', component: FrmDataComponent},
  { path: 'update/:id', component: FrmUpdateComponent },
  //cuando no haya ninguna ruta definida va ocupar el componente inicio
  { path: '', component: InicioComponent, pathMatch:'full'},
  // los dos "**" especifica que cualquier ruta sea desconocida va redirigir a 404
  { path: '**',component: Page404Component, pathMatch:'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrmProductComponent,
    FrmRegisterComponent,
    Page404Component,
    FrmDataComponent,
    FrmUpdateComponent,
    FrmCheckComponent,
    FrmSaveComponent,
    FrmOkComponent
  ],
  imports: [
    BrowserModule,
    // importracion de modulos
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
    //
  ],
  providers: [],
  bootstrap: [AppComponent],
  //
  entryComponents: [
    FrmCheckComponent,
    FrmSaveComponent,
    FrmOkComponent
  ]
})
export class AppModule { }
