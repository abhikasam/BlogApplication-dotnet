import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { XPagination } from '../../../model/xpagination.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'category-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() category: Category = new Category()

  @Input() categoryId: number = 0;
  isFollowing: boolean = false
  userId: number=0

  xpagination: XPagination = new XPagination()



  constructor
    (
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })

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
      this.fetchCategory()
    }
  }

  fetchCategory() {
    this.categoryService.getCategory(this.categoryId, this.xpagination).subscribe((result: any) => {
      this.category = result.body as Category;
      this.category.isFollowing = this.category.users.includes(this.userId)
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }

  updatePage(xpagination: XPagination) {
    this.categoryService.getCategory(this.categoryId, xpagination).subscribe((result: any) => {
      this.category = result.body as Category;
      this.category.isFollowing = this.category.users.includes(this.userId)
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }
}
