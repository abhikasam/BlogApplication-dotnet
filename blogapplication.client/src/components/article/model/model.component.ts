import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';

@Component({
  selector: 'article-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  @Input() article: Article = new Article()

  ngOnInit(): void {
  }
}
