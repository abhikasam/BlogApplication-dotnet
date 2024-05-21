import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module';
import { ArticleModule } from '../components/article/article.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModule } from '../components/category/category.module';
import { AuthorModule } from '../components/author/author.module';
import { NgIdleModule } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ArticleModule,
    SharedModule,
    NgbModule,
    CategoryModule,
    AuthorModule,
    NgIdleModule.forRoot(),
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{}
