import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ArticleViewComponent } from './article-view/article-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        component: IndexComponent,
      },
      {
        path: 'view',
        component: ArticleViewComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
