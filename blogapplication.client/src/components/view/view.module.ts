import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleViewComponent } from './article-view/article-view.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { PipesModule } from '../../pipes/pipes.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ArticleViewComponent,
    CategoryViewComponent,
    AuthorViewComponent
  ],
  exports: [ArticleViewComponent, CategoryViewComponent, AuthorViewComponent],
  imports: [
    CommonModule, PipesModule, RouterModule.forChild([])
  ]
})
export class ViewModule { }
