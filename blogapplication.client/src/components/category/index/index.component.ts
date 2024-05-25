import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'category-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @Input() categories: Category[] = [];
  userId: number=0

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
      this.categories.forEach(cat => {
        cat.isFollowing = cat.users.includes(this.userId)
      })
    })
  }

}
