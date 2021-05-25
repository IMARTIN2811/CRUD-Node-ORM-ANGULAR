import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RolUserComponent } from './rol-user.component';


const routes: Routes = [
  { path: '', component: RolUserComponent }
];

@NgModule({
  declarations: [RolUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RolUserModule { }
