import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../model/article.model';
import { UserArtcleLikeService } from '../../../services/user-artcle-like.service';
import { XPagination } from '../../../model/xpagination.model';
import { UserArticleLike } from '../../../model/user-article-like.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  articles: Article[] = []
  xpagination: XPagination = new XPagination()
  userId: number=0

  constructor(
    private route: ActivatedRoute,
    private userArticleLikeService: UserArtcleLikeService,
    private authService: AuthService
  )
  { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    this.fetchArticles()
  }

  fetchArticles() {
    this.userArticleLikeService.getArticles(this.xpagination).subscribe((result: any) => {
      this.articles = result.body as Article[];
      this.articles.forEach(i => {
        i.likedUsers.push(this.userId)
      })
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
   })
  }

  updatePage(xpagination: XPagination) {
    this.userArticleLikeService.getArticles(xpagination).subscribe((result: any) => {
      this.articles = result.body as Article[];
      this.articles.forEach(i => {
        i.likedUsers.push(this.userId)
      })
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }


}
