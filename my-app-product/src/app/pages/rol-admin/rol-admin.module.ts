import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RolAdminComponent } from './rol-admin.component';

const routes: Routes = [
  { path: '', component: RolAdminComponent
  }
];

@NgModule({
  declarations: [RolAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RolAdminModule { }
