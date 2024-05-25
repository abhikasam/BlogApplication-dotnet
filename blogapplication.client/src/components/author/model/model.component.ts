import { Component, Input, OnInit } from '@angular/core';
import { Author } from '../../../model/author.model';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { XPagination } from '../../../model/xpagination.model';
import { AuthService } from '../../../services/auth.service';
import { UserAuthorService } from '../../../services/user-author.service';

@Component({
  selector: 'author-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() author: Author = new Author()
  @Input() authorId: number = 0;
  userId=0

  xpagination: XPagination = new XPagination()

  constructor
    (
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private authService: AuthService,
    private userAuthorService: UserAuthorService
    ) { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    if (!this.author.authorId && !this.authorId) {
      this.route.params.subscribe(params => {
        if (params["id"]) {
          this.authorId = params["id"]
          this.fetchAuthor()
        }
        else {
          var param1 = this.route.snapshot.paramMap.get("param1");
          if (param1 && !isNaN(parseInt(param1 as string))) {
            this.authorId = parseInt(param1 as string)
            this.fetchAuthor()
          }
        }
      })
    }
    else if (!this.author) {
      this.fetchAuthor()
    }

    this.userAuthorService.getAuthors().subscribe()

  }

  fetchAuthor() {
    this.authorService.getAuthor(this.authorId, this.xpagination).subscribe((result: any) => {
      this.author = result.body as Author;
      this.author.isFollowing = this.userAuthorService.authors.value.includes(this.userId)
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }

  updatePage(xpagination: any) {
    this.authorService.getAuthor(this.authorId, xpagination).subscribe((result: any) => {
      this.author = result.body as Author;
      this.author.isFollowing = this.userAuthorService.authors.value.includes(this.userId)
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }

}
