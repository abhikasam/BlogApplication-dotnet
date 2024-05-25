import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIndexComponent } from './user-index/user-index.component';
import { ArticleIndexComponent } from './article-index/article-index.component';
import { UserArticleLikeRoutingModule } from './user-article-like-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ArticleModule } from '../article/article.module';


@NgModule({
  declarations: [
    UserIndexComponent,ArticleIndexComponent
  ],
  exports: [UserIndexComponent, ArticleIndexComponent],
  imports: [
    CommonModule, UserArticleLikeRoutingModule, SharedModule, ArticleModule
  ]
})
export class UserArticleLikeModule { }
