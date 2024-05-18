import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ModelComponent } from './model/model.component';
import { AuthorRoutingModule } from './author-routing.module';
import { ArticleModule } from '../article/article.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    IndexComponent,
    ModelComponent
  ],
  imports: [
    CommonModule, AuthorRoutingModule, ArticleModule, SharedModule
  ]
})
export class AuthorModule { }
