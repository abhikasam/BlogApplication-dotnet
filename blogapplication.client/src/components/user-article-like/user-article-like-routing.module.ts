import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { ArticleIndexComponent } from './article-index/article-index.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserIndexComponent,
    pathMatch: 'full'
  },
  {
    path: 'article/:id',
    component: ArticleIndexComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class UserArticleLikeRoutingModule { }
