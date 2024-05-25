import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import {  Router } from '@angular/router';
import { UserCategoryService } from '../../../services/user-category.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  @Input() article: Article = new Article()
  categories: number[] = []
  userId=0
  constructor(
    private router: Router,
    private userCategoryService: UserCategoryService,
    private authService: AuthService
  )
  { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    var navigation = this.router.getCurrentNavigation()
    var articleStr = '';
    if (navigation?.extras.state) {
      articleStr = (navigation.extras.state as any).article
    }
    else {
      articleStr = (window.history.state as any).article
    }
    this.article = JSON.parse(articleStr)
    this.updateCategories()
  }

  updateCategories() {
    this.userCategoryService.getCategories().subscribe(res => {
      this.categories = res
      console.log(this.categories)
      this.article.categories.forEach(cat => {
        cat.isFollowing = this.categories.includes(cat.categoryId)
      })
    })
  }

}
