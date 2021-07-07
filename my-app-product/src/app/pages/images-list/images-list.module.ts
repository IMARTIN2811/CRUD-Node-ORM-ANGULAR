import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ImagesListComponent } from './images-list.component';
import { MaterialModule } from '../../material.module';

import { InfiniteScrollModule } from 'ngx-infinite-scroll'; 
import { NgxSpinnerModule } from 'ngx-spinner';
const routes: Routes = [
  { path: '', component: ImagesListComponent }
];

@NgModule({
  declarations: [ImagesListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    
    InfiniteScrollModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class ImagesListModule { }
