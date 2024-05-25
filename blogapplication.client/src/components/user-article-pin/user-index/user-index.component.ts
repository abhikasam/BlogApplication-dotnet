import { Component, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { XPagination } from '../../../model/xpagination.model';
import { ActivatedRoute } from '@angular/router';
import { UserArtclePinService } from '../../../services/user-artcle-pin.service';
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
    private userArticlepinService: UserArtclePinService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    this.fetchArticles()
  }

  fetchArticles() {
    this.userArticlepinService.getArticles(this.xpagination).subscribe((result: any) => {
      this.articles = result.body as Article[];
      this.articles.forEach(i => {
        i.pinnedUsers.push(this.userId)
      })
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }

  updatePage(xpagination: XPagination) {
    this.userArticlepinService.getArticles(xpagination).subscribe((result: any) => {
      this.articles = result.body as Article[];
      this.articles.forEach(i => {
        i.pinnedUsers.push(this.userId)
      })
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }
}
