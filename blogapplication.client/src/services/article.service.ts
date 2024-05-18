import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleFilter } from "../model/article.filter";
import { PaginatedResult } from "../model/paginatedResult.model";

@Injectable({
  providedIn:'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient   
  ) { }

  getArticles() {
    return this.http.get<PaginatedResult<Article>>('/api/article')
  }

  updateArticles(articleFilters: ArticleFilter) {
    var authors = JSON.stringify(articleFilters.authorIds)
    var categories = JSON.stringify(articleFilters.categoryIds)
    var pageSize = articleFilters.pageSize
    var pageNumber = articleFilters.pageNumber
    return this.http.get<PaginatedResult<Article>>('/api/article/' + authors + '/' + categories + '/' + pageSize + '/' + pageNumber)
  }


}
