import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../model/category.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  @Input() category: Category = new Category()
  userId: number=0
  constructor(
    private authService: AuthService
  )
  { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    this.category.isFollowing = this.category.users.includes(this.userId)
  }
}
