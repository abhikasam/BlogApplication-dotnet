import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import {  Router } from '@angular/router';

@Component({
  selector: 'article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  @Input() article: Article = new Article()
  constructor(
    private router: Router
  )
  { }

  ngOnInit(): void {
    var navigation = this.router.getCurrentNavigation()
    var articleStr = '';
    if (navigation?.extras.state) {
      articleStr = (navigation.extras.state as any).article
    }
    else {
      articleStr = (window.history.state as any).article
    }
    this.article = JSON.parse(articleStr)
    console.log(this.article)
  }

}
