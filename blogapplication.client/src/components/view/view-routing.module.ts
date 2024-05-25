import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticleViewComponent } from './article-view/article-view.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { AuthorViewComponent } from './author-view/author-view.component';


const routes: Routes = [
  {
    path: 'article',
    component: ArticleViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'category',
    component: CategoryViewComponent,
    pathMatch:'full'
  },
  {
    path: 'author',
    component: AuthorViewComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ViewRoutingModule { }
