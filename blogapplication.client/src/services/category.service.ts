import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { XPagination } from '../model/xpagination.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<Category[]>('/api/category')
  }

  getCategory(id: number, xpagination: XPagination) {
    var paginationDetails = JSON.stringify(xpagination);
    var httpHeaders = new HttpHeaders({
      'x-pagination': paginationDetails
    })
    return this.http.get<any>('/api/category/' + id, { observe: 'response', headers: httpHeaders })
  }

}
