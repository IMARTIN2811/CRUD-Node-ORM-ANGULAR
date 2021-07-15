import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FrmViewComponent } from './frm-view.component';
/* */
import { MaterialModule } from 'src/app/material.module';
import { DatePipe } from '@angular/common'
/* */

const routes: Routes = [
  { path: '', component: FrmViewComponent }
];

@NgModule({
  declarations: [FrmViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    DatePipe
  ]
})
export class FrmViewModule { }
