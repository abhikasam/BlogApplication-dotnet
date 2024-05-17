import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleFilter } from "../model/article.filter";

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

  updateArticles(articleFilters: ArticleFilter) {
    var authors = JSON.stringify(articleFilters.authorIds)
    var categories = JSON.stringify(articleFilters.categoryIds)
    return this.http.get<Article[]>('/api/article/' + authors + '/' + categories)
  }


}
