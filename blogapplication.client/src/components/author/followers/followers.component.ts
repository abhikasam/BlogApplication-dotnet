import { Component, Input, OnInit } from '@angular/core';
import { UserAuthorService } from '../../../services/user-author.service';
import { User } from '../../../model/user.model';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  users: User[]=[]

  constructor(
    private authorService: AuthorService
  )
  { }

  ngOnInit(): void {
    this.authorService.getFollowers().subscribe(res => {
      console.log(res)
      this.users = (res as User[])
    })
  }
}
