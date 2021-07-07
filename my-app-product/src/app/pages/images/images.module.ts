import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './images.component';
/* Se importan los componentes de angular material */
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', component: ImagesComponent }
];

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImagesModule { }
