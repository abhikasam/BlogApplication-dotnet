import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserAuthorService } from '../../../services/user-author.service';
import { Author } from '../../../model/author.model';
import { UserAuthor } from '../../../model/user-author.model';

@Component({
  selector: 'author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.css']
})
export class AuthorViewComponent {
  @Input() author: Author = new Author()
  userId: number = 0
  constructor(
    private authService: AuthService,
    private userAuthorService: UserAuthorService
  ) { }

  ngOnInit(): void {
    this.authService.userDetails.subscribe(res => {
      this.userId = parseInt(res.userId)
    })
    this.userAuthorService.authors.subscribe(res => {
      this.author.isFollowing = res.includes(this.author.authorId)
    })
  }

  authorFollow(follow: boolean) {
    let userAuthor = new UserAuthor(0, this.userId, this.author.authorId, follow)
    this.userAuthorService.followAuthor(userAuthor).subscribe(res => {
      this.author.isFollowing = follow
      this.userAuthorService.authors.next(res)
    })
  }

}
