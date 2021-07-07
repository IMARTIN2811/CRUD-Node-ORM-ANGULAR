import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ImagesEditComponent } from './images-edit.component';
import { MaterialModule } from '../../material.module';

const routes: Routes = [
  { path: '', component: ImagesEditComponent }
];

@NgModule({
  declarations: [ImagesEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ImagesEditModule { }
