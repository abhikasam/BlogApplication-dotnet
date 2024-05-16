import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'category-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @Input() categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    })
  }

}
