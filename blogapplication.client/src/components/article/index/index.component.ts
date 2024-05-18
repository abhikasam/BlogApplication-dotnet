import { Component, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { ArticleService } from '../../../services/article.service';
import { ArticleFilter } from '../../../model/article.filter';
import { AuthorService } from '../../../services/author.service';
import { CategoryService } from '../../../services/category.service';
import { Author } from '../../../model/author.model';
import { KeyPair } from '../../../model/keypair.model';
import { PaginatedResult, PaginationParams } from '../../../model/paginatedResult.model';

@Component({
  selector: 'article-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articles: Article[] = []

  articleFilter: ArticleFilter = new ArticleFilter()
  paginationParams: PaginationParams = new PaginationParams()
  
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    console.log(this.paginationParams)
    this.articleService.getArticles().subscribe(res => {
      this.paginationParams = res.paginationParams
      this.articles = res.data
      console.log(res)
    })
  }

  updateArticles(filter: ArticleFilter) {
    this.articleFilter = filter
    this.articleService.updateArticles(this.articleFilter, this.paginationParams).subscribe(res => {
      this.paginationParams = res.paginationParams
      this.articles = res.data
    })
  }

  updatePage(paginationParams: PaginationParams) {
    this.articleService.updateArticles(this.articleFilter, paginationParams).subscribe(res => {
      this.paginationParams = res.paginationParams
      this.articles = res.data
    })
  }

}
