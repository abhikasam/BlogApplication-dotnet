import { Component, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { XPagination } from '../../../model/xpagination.model';
import { ActivatedRoute } from '@angular/router';
import { UserArtclePinService } from '../../../services/user-artcle-pin.service';
import { AuthService } from '../../../services/auth.service';
import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  articles: Article[] = []
  userId: number=0

  constructor(
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
    this.userArticlepinService.getArticles().subscribe((result: Article[]) => {
      this.articles = result
      this.articles.forEach(i => {
        i.pinnedUsers.push(this.userId)
      })
    })
  }

  dragStarted(event: CdkDragStart<string[]>, index: number): void {
    console.log('Drag started at index:', index);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.articles, event.previousIndex, event.currentIndex);
    this.userArticlepinService.changeOrder(event.previousIndex, event.currentIndex)
  }
}
