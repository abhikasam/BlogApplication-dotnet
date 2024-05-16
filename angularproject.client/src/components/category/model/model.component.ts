import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'category-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() category: Category = new Category()
  @Input() categoryId: number = 0;
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
    this.categoryService.getCategory(this.categoryId).subscribe((result: Category) => {
      this.category = result;
      console.log(result)
    })
  }



}
