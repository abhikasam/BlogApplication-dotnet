import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserAuthor } from '../model/user-author.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorService {
  authors = new BehaviorSubject<number[]>([])
  constructor(
    private http: HttpClient
  ) {
    this.getAuthors().subscribe(res => {
      this.authors.next(res)
    })
  }

  getAuthors() {
    return this.http.get<number[]>('/api/userauthor')
  }

  followAuthor(userAuthor: UserAuthor) {
    return this.http.post<number[]>('/api/userauthor/follow', userAuthor)
  }
}
