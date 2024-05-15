import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { BodyComponent } from "../shared/body/body.component";


export const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
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
