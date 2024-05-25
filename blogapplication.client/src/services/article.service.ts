import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleFilter } from "../model/article.filter";
import { XPagination } from "../model/xpagination.model";
import { ResponseMessage } from "../model/response-message.model";
import { UserArticleLike } from "../model/user-article-like.model";
import { UserArticlePin } from "../model/user-article-pin.model";

@Injectable({
  providedIn:'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient   
  ) { }

  getArticles() {
    const headers = new HttpHeaders({
      'x-pagination':''
    })
    return this.http.get<any>('/api/article', { headers: headers, observe: 'response' })
  }

  updateArticles(articleFilters: ArticleFilter, xpagination: XPagination) {
    var authors = JSON.stringify(articleFilters.authorIds)
    var categories = JSON.stringify(articleFilters.categoryIds)
    var paginationDetails = JSON.stringify(xpagination);
    var httpHeaders = new HttpHeaders({
      "x-pagination": paginationDetails
    })
    return this.http.get<Article[]>('/api/article/' + authors + '/' + categories, { headers: httpHeaders, observe:'response' })
  }


  likeArticle(userArticleLike: UserArticleLike) {
    return this.http.post<ResponseMessage>('/api/article/like', userArticleLike)
  }

  pinArticle(userArticlePin: UserArticlePin) {
    return this.http.post<ResponseMessage>('/api/article/pin', userArticlePin)
  }

}
