import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule, OnInit } from '@angular/core';
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
import { AuthModule } from '../components/auth/auth.module';
import { GlobalErrorHandler } from '../services/global-error-handler';
import { HttpErrorInterceptor } from '../services/http-error-interceptor';
import { DirectivesModule } from '../directives/directives.module';
import { UserSession } from '../model/user.model';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserArticleLikeModule } from '../components/user-article-like/user-article-like.module';
import { UserarticlepinModule } from '../components/user-article-pin/user-article-pin.module';
import { ViewModule } from '../components/view/view.module';

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
    AuthModule,
    UserArticleLikeModule,
    UserarticlepinModule,
    ViewModule,
    NgIdleModule.forRoot(),
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    {
      provide: ErrorHandler, useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
export function initializeApp(authService: AuthService) {
  authService.getUserSession()
  return (): Promise<void> => {
    return new Promise<void>((resolve) => {
      resolve();
    })
  }
}
