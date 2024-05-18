import { Component, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { ArticleService } from '../../../services/article.service';
import { ArticleFilter } from '../../../model/article.filter';
import { AuthorService } from '../../../services/author.service';
import { CategoryService } from '../../../services/category.service';
import { Author } from '../../../model/author.model';
import { KeyPair } from '../../../model/keypair.model';

@Component({
  selector: 'article-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articles: Article[] = []
  
  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(result => {
      this.articles = result
    })
  }

  updateArticles(filter: ArticleFilter) {
    this.articleService.updateArticles(filter).subscribe(res => {
      this.articles=res
    })
  }

}
