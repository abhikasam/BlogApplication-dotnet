import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleFilter } from "../model/article.filter";
import { PaginatedResult, PaginationParams } from "../model/paginatedResult.model";

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

  updateArticles(articleFilters: ArticleFilter, paginationParams: PaginationParams) {
    var authors = JSON.stringify(articleFilters.authorIds)
    var categories = JSON.stringify(articleFilters.categoryIds)
    var pageSize = paginationParams.pageSize
    var pageNumber = paginationParams.pageNumber
    return this.http.get<PaginatedResult<Article>>('/api/article/' + authors + '/' + categories + '/' + pageSize + '/' + pageNumber)
  }


}
