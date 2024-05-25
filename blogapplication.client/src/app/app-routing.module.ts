import { RouterModule, Routes, mapToCanMatch } from "@angular/router";
import { NgModule } from "@angular/core";
import { FullComponent } from "../shared/full/full.component";
import { CanloadService } from "../services/canload.service";
import { AccessDeniedComponent } from "../shared/access-denied/access-denied.component";
import { DashboardComponent } from "../shared/dashboard/dashboard.component";
import { ExceptionComponent } from "../shared/exception/exception.component";


export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: "full",
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'articles',
        canMatch: [CanloadService],
        data: {
          authenticated: true
        },
        loadChildren: () => import("./../components/article/article-routing.module").then(m => m.ArticleRoutingModule)
      },
      {
        path: 'categories',
        canMatch: [CanloadService],
        data: {
          authenticated:true
        },
        loadChildren: () => import("./../components/category/category-routing.module").then(m => m.CategoryRoutingModule)
      },
      {
        path: 'authors',
        canMatch: [CanloadService],
        data: {
          authenticated: true
        },
        loadChildren: () => import("./../components/author/author-routing.module").then(m => m.AuthorRoutingModule)
      },
      {
        path: 'auth',
        canMatch: [CanloadService],
        data: {
          authenticated: false
        },
        loadChildren: () => import("./../components/auth/auth-routing.module").then(m => m.AuthRoutingModule)
      },
      {
        path: 'userarticlelike',
        canMatch: [CanloadService],
        data: {
          authenticated: true
        },
        loadChildren: () => import("./../components/user-article-like/user-article-like-routing.module").then(m => m.UserArticleLikeRoutingModule)
      },
      {
        path: 'userarticlepin',
        canMatch: [CanloadService],
        data: {
          authenticated: true
        },
        loadChildren: () => import("./../components/user-article-pin/user-article-pin-routing.module").then(m => m.UserArticlePinRoutingModule)
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
        pathMatch: "full"
      },
      {
        path: 'error',
        component: ExceptionComponent,
        pathMatch: "full"
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
