import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { PaginationParams } from '../../../model/paginatedResult.model';

@Component({
  selector: 'category-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() category: Category = new Category()
  @Input() categoryId: number = 0;

  paginationParams: PaginationParams = new PaginationParams()

  constructor
    (
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    if (!this.category.categoryId && !this.categoryId) {
      this.route.params.subscribe(params => {
        if (params["id"]) {
          this.categoryId = params["id"]
          this.fetchCategory()
        }
        else {
          var param1 = this.route.snapshot.paramMap.get("param1");
          if (param1 && !isNaN(parseInt(param1 as string))) {
            this.categoryId = parseInt(param1 as string)
            this.fetchCategory()
          }
        }
      })
    }
    else if (!this.category) {
      console.log(this.category, this.categoryId)
      this.fetchCategory()
    }
  }

  fetchCategory() {
    this.categoryService.getCategory(this.categoryId, this.paginationParams).subscribe((result: Category) => {
      this.category = result;
      this.paginationParams = result.paginationParams;
      console.log(result)
    })
  }

  updatePage(paginationParams: any) {
    console.log(paginationParams)
    this.categoryService.getCategory(this.categoryId, paginationParams).subscribe((result: Category) => {
      this.category = result;
      this.paginationParams = result.paginationParams;
    })
  }

}
