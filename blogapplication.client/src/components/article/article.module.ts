import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { IndexComponent } from './index/index.component';
import { ModelComponent } from './model/model.component';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleFilterComponent } from './article-filter/article-filter.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [IndexComponent, ModelComponent, ArticleFilterComponent, ArticleViewComponent],
  exports: [ModelComponent],
  imports: [
    CommonModule, ArticleRoutingModule, PipesModule, FormsModule, SharedModule, NgbCollapseModule, DirectivesModule
  ]
})
export class ArticleModule { }
