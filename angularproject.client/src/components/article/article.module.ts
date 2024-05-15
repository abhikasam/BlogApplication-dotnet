import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [IndexComponent],
  exports:[],
  imports: [
    CommonModule, ArticleRoutingModule
  ]
})
export class ArticleModule { }
