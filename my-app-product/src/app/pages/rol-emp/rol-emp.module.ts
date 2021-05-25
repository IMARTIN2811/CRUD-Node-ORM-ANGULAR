import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RolEmpComponent } from './rol-emp.component';
import { authProviders } from '../../services/helpers/auth.interceptor'

const routes: Routes = [
  { path: '', component: RolEmpComponent }
];

@NgModule({
  declarations: [RolEmpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [  ]
})
export class RolEmpModule { }
