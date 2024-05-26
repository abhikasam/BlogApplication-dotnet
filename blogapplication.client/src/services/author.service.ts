import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../model/author.model';
import { ArticleFilter } from '../model/article.filter';
import { XPagination } from '../model/xpagination.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors() {
    return this.http.get<Author[]>('/api/author')
  }

  getAuthor(id: number, xpagination: XPagination) {
    var paginationDetails = JSON.stringify(xpagination);
    var httpHeaders = new HttpHeaders({
      'x-pagination': paginationDetails
    })
    return this.http.get<any>('/api/author/' + id, { observe: 'response', headers: httpHeaders })
  }
  getFollowers() {
    console.log('calling')
    return this.http.get<User[]>('/api/author/followers')
  }


}
