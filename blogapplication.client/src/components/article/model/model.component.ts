import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { NavigationExtras, Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';
import { UserArticleLike } from '../../../model/user-article-like.model';
import { UserArticlePin } from '../../../model/user-article-pin.model';

@Component({
  selector: 'article-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() article: Article = new Article()
  userId: number = 0
  isliked: boolean = false
  isPinned: boolean = false
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
      this.isliked = this.article.likedUsers.includes(this.userId)
      this.isPinned = this.article.pinnedUsers.includes(this.userId)
    })
  }

  openArticle() {
    var articlestr = JSON.stringify(this.article)
    this.router.navigate(['/articles/view'], { state: { 'article': articlestr } })
  }

  likeArticle(liked: boolean) {
    let userArticleLike = new UserArticleLike(
      0,
      this.userId,
      this.article.articleId,
      liked
    )
    this.articleService.likeArticle(userArticleLike).subscribe(res => {
      if (res.status == "SUCCESS") {
        this.isliked = liked
      }
    })
  }

  pinArticle(pinned: boolean) {
    let userArticlePin = new UserArticlePin(
      0,
      this.userId,
      this.article.articleId,
      0,
      pinned
    )
    this.articleService.pinArticle(userArticlePin).subscribe(res => {
      if (res.status == "SUCCESS") {
        this.isPinned = pinned
      }
    })
  }

}
