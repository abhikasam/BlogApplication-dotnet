import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { AuthService } from '../../../services/auth.service';
import { UserCategoryService } from '../../../services/user-category.service';
import { UserCategory } from '../../../model/user-category.model';

@Component({
  selector: 'category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  @Input() category: Category = new Category()
  userId: number = 0
  constructor(
    private authService: AuthService,
    private userCategoryService: UserCategoryService
  ) { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    this.userCategoryService.categories.subscribe(res => {
      this.category.isFollowing = res.includes(this.category.categoryId)
    })
  }

  categoryFollow(follow: boolean) {
    let userCategory = new UserCategory(0, this.userId, this.category.categoryId, follow)
    console.log(userCategory)
    this.userCategoryService.followCategory(userCategory).subscribe(res => {
      this.category.isFollowing = follow
      this.userCategoryService.categories.next(res)
    })
  }

}
