import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserArticleLike } from '../model/user-article-like.model';
import { XPagination } from '../model/xpagination.model';
import { Article } from '../model/article.model';
import { ResponseMessage } from '../model/response-message.model';

@Injectable({
  providedIn: 'root'
})
export class UserArtclePinService {

  constructor(
    private http: HttpClient
  )
  { }


  getArticles() {
    return this.http.get<Article[]>('/api/userarticlepin/user')
  }

  changeOrder(from: number, to: number) {
    return this.http.post<ResponseMessage>('/api/userarticlepin/changeOrder',{
      from, to
    }).subscribe(res => {
      console.log(res)
    })
  }

}
