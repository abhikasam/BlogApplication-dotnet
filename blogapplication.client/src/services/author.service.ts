import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../model/author.model';
import { ArticleFilter } from '../model/article.filter';
import { PaginationParams } from '../model/paginatedResult.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors() {
    return this.http.get<Author[]>('/api/author')
  }

  getAuthor(id: number, paginationParams: PaginationParams) {
    var pageSize = paginationParams.pageSize
    var pageNumber = paginationParams.pageNumber
    return this.http.get<Author>('/api/author/' + id + '/' + pageSize + '/' + pageNumber)
  }
}
