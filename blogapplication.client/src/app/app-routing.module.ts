import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FullComponent } from "../shared/full/full.component";


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
        loadChildren: () => import("./../components/article/article-routing.module").then(m => m.ArticleRoutingModule)
      },
      {
        path: 'categories',
        loadChildren: () => import("./../components/category/category-routing.module").then(m => m.CategoryRoutingModule)
      },
      {
        path: 'authors',
        loadChildren: () => import("./../components/author/author-routing.module").then(m => m.AuthorRoutingModule)
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
