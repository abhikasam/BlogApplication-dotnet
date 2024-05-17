import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../model/author.model';
import { ArticleFilter } from '../model/article.filter';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors() {
    return this.http.get<Author[]>('/api/author')
  }

  getAuthor(id: number) {
    return this.http.get<Author>('/api/author/'+id)
  }
}
