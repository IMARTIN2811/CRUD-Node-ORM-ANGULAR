import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FrmProductComponent } from './Components/Forms/frm-product/frm-product.component';

//se importa el formmodule,httpclientmodule
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
//import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from './material.module';
import { authProviders } from './services/helpers/auth.interceptor';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
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
import { FooterComponent } from './Components/footer/footer.component';


//navbar routes are configured
const routes: Routes = [
  //cuando no haya ninguna ruta definida va ocupar el componente inicio
  { path: '', component: InicioComponent, pathMatch:'full'},
  //{ path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', component: FrmRegisterComponent },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'admin', loadChildren: () => import('./pages/rol-admin/rol-admin.module').then(m => m.RolAdminModule), canActivate: [CheckLoginGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'user', loadChildren: () => import('./pages/rol-user/rol-user.module').then(m => m.RolUserModule) },
  { path: 'producto', component: FrmProductComponent  },
  { path: 'data', component: FrmDataComponent},
  { path: 'update/:id', component: FrmUpdateComponent },
  { path: 'emp', loadChildren: () => import('./pages/rol-emp/rol-emp.module').then(m => m.RolEmpModule) },
  { path: 'images', loadChildren: () => import('./pages/images/images.module').then(m => m.ImagesModule) },
  { path: 'imgList', loadChildren: () => import('./pages/images-list/images-list.module').then(m => m.ImagesListModule) },
  { path: 'edit-image', loadChildren: () => import('./pages/images-edit/images-edit.module').then(m => m.ImagesEditModule) },
  { path: 'view-list', loadChildren: () => import('./Components/Forms/frm-view/frm-view.module').then(m => m.FrmViewModule) },
  { path: '**',component: Page404Component, pathMatch:'full' }
  
  //{ path: 'modal', loadChildren: () => import('./pages/modal/modal.module').then(m => m.ModalModule) },
  // los dos "**" especifica que cualquier ruta sea desconocida va redirigir a 404
  //{ path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
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
    FrmOkComponent,
    InicioComponent,
    FooterComponent
    
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
    MatCardModule,
    MaterialModule
    //
  ],
  providers: [ authProviders ],
  bootstrap: [AppComponent],
  //
  entryComponents: [
    FrmCheckComponent,
    FrmSaveComponent,
    FrmOkComponent
  ]
})
export class AppModule { }
