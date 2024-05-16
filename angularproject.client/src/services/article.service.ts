import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../model/article.model";

@Injectable({
  providedIn:'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient   
  ) { }

  getArticles() {
    return this.http.get<Article[]>('/api/article')
  }

}
