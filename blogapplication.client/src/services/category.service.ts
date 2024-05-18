import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { PaginationParams } from '../model/paginatedResult.model';

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

  getCategory(id: number, paginationParams: PaginationParams) {
    var pageSize = paginationParams.pageSize
    var pageNumber = paginationParams.pageNumber
    return this.http.get<Category>('/api/category/' + id + '/' + pageSize + '/' + pageNumber)
  }

}
