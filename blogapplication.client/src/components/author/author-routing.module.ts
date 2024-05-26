import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ModelComponent } from './model/model.component';
import { FollowersComponent } from './followers/followers.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: "full"
  },
  {
    path: ':id',
    component: ModelComponent,
    pathMatch:"full"
  },
  {
    path: 'followers',
    component: FollowersComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
