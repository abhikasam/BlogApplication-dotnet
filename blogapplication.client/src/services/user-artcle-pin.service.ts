import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserArticleLike } from '../model/user-article-like.model';
import { XPagination } from '../model/xpagination.model';

@Injectable({
  providedIn: 'root'
})
export class UserArtclePinService {

  constructor(
    private http: HttpClient
  )
  { }


  getArticles(xpagination: XPagination) {
    var paginationDetails = JSON.stringify(xpagination);
    var httpHeaders = new HttpHeaders({
      'x-pagination': paginationDetails
    })
    return this.http.get<any>('/api/userarticlepin/user', { observe: 'response', headers: httpHeaders })
  }
}
