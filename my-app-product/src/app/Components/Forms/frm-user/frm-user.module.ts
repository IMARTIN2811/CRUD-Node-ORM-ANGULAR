import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FrmUserComponent } from './frm-user.component';
/*Se hacen las importaciones */
import { MaterialModule } from 'src/app/material.module';
/*Terminan las importaciones */
const routes: Routes = [
  { path: '', component: FrmUserComponent }
];

@NgModule({
  declarations: [FrmUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class FrmUserModule { }
