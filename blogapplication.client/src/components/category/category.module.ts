import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './model/model.component';
import { IndexComponent } from './index/index.component';
import { ArticleModule } from '../article/article.module';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ViewModule } from '../view/view.module';



@NgModule({
  declarations: [
    ModelComponent, IndexComponent
  ],
  exports: [],
  imports: [
    CommonModule, ArticleModule, CategoryRoutingModule, SharedModule, ViewModule
  ]
})
export class CategoryModule { }
