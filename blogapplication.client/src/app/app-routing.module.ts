import { RouterModule, Routes, mapToCanMatch } from "@angular/router";
import { NgModule } from "@angular/core";
import { FullComponent } from "../shared/full/full.component";
import { CanloadService } from "../services/canload.service";
import { AccessDeniedComponent } from "../shared/access-denied/access-denied.component";


export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/articles',
        pathMatch: "full",
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
        path: 'access-denied',
        component: AccessDeniedComponent,
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
