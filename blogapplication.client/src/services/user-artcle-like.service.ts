import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserArticleLike } from '../model/user-article-like.model';
import { XPagination } from '../model/xpagination.model';

@Injectable({
  providedIn: 'root'
})
export class UserArtcleLikeService {

  constructor(
    private http: HttpClient
  )
  { }


  getArticles(xpagination: XPagination) {
    var paginationDetails = JSON.stringify(xpagination);
    var httpHeaders = new HttpHeaders({
      'x-pagination': paginationDetails
    })
    return this.http.get<any>('/api/userarticlelike/user', { observe: 'response', headers: httpHeaders })
  }

  getUsers(articleId: number, xpagination: XPagination) {
    var paginationDetails = JSON.stringify(xpagination);
    var httpHeaders = new HttpHeaders({
      'x-pagination': paginationDetails
    })
    return this.http.get<UserArticleLike[]>('/api/userarticlelike/article/' + articleId,{ observe: 'response', headers: httpHeaders })
  }

}
