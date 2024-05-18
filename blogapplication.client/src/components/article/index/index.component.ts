import { Component, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { ArticleService } from '../../../services/article.service';
import { ArticleFilter } from '../../../model/article.filter';
import { AuthorService } from '../../../services/author.service';
import { CategoryService } from '../../../services/category.service';
import { Author } from '../../../model/author.model';
import { KeyPair } from '../../../model/keypair.model';
import { XPagination } from '../../../model/xpagination.model';

@Component({
  selector: 'article-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articles: Article[] = []

  articleFilter: ArticleFilter = new ArticleFilter()
  xpagination: XPagination = new XPagination()
  
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((result: any) => {
      this.articles = result.body as Article[]
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
      console.log(this.xpagination)
    })
  }

  updateArticles(filter: ArticleFilter) {
    this.articleFilter = filter
    console.log(this.xpagination)
    this.articleService.updateArticles(this.articleFilter, this.xpagination).subscribe((result: any) => {
      this.articles = result.body as Article[]
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }

  updatePage(xpagination: XPagination) {
    this.articleService.updateArticles(this.articleFilter, xpagination).subscribe((result: any) => {
      this.articles = result.body as Article[]
      var paginationDetails = result.headers.get("x-pagination")
      this.xpagination = JSON.parse(paginationDetails)
    })
  }

}
