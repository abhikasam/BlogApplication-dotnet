import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIndexComponent } from './user-index/user-index.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    component: UserIndexComponent,
    pathMatch: 'full'
  }
]



@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class UserArticlePinRoutingModule { }
