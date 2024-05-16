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
