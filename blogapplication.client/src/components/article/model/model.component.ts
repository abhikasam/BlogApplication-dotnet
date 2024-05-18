import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'article-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() article: Article = new Article()

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openArticle() {
    var articlestr = JSON.stringify(this.article)
    this.router.navigate(['/articles/view'], { state: { 'article': articlestr } })
  }

}
