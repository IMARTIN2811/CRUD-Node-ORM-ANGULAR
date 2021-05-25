import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RolAdminComponent } from './rol-admin.component';

import { CheckLoginGuard } from '../../shared/guards/check-login.guard';

const routes: Routes = [
  { path: '', component: RolAdminComponent,
    //canActivate: [CheckLoginGuard],
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
