import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './model/model.component';
import { IndexComponent } from './index/index.component';
import { ArticleModule } from '../article/article.module';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoryViewComponent } from './category-view/category-view.component';



@NgModule({
  declarations: [
    ModelComponent, IndexComponent, CategoryViewComponent
  ],
  exports: [CategoryViewComponent],
  imports: [
    CommonModule, ArticleModule, CategoryRoutingModule, SharedModule
  ]
})
export class CategoryModule { }
