import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';
import { UserCategory } from '../model/user-category.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {
  categories = new BehaviorSubject<number[]>([])
  constructor(
    private http: HttpClient
  )
  {
    this.getCategories().subscribe(res => {
      this.categories.next(res)
    })
  }

  getCategories() {
    return this.http.get<number[]>('/api/usercategory')
  }

  followCategory(userCategory: UserCategory) {
    return this.http.post<number[]>('/api/usercategory/follow', userCategory)
  }

}
