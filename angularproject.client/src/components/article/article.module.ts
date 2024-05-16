import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { IndexComponent } from './index/index.component';
import { ModelComponent } from './model/model.component';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [IndexComponent, ModelComponent],
  exports: [ModelComponent],
  imports: [
    CommonModule, ArticleRoutingModule, PipesModule
  ]
})
export class ArticleModule { }
