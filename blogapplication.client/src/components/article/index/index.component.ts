import { Component, OnInit } from '@angular/core';
import { Article } from '../../../model/article.model';
import { ArticleService } from '../../../services/article.service';
import { ArticleFilter } from '../../../model/article.filter';
import { AuthorService } from '../../../services/author.service';
import { CategoryService } from '../../../services/category.service';
import { Author } from '../../../model/author.model';
import { KeyPair } from '../../../model/keypair.model';
import { PaginatedResult } from '../../../model/paginatedResult.model';

@Component({
  selector: 'article-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articles: Article[] = []

  articleFilter: ArticleFilter = new ArticleFilter()
  paginatedArticles: PaginatedResult<Article> = new PaginatedResult()
  
  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(res => {
      this.paginatedArticles = res
      console.log(res)
    })
  }

  updateArticles(filter: ArticleFilter) {
    this.articleFilter = filter
    this.articleService.updateArticles(this.articleFilter).subscribe(res => {
      this.paginatedArticles=res
    })
  }

  changePageSize(event: any) {
    this.articleFilter.pageSize = event.target.value
    this.articleService.updateArticles(this.articleFilter).subscribe(res => {
      this.paginatedArticles = res
      console.log(this.paginatedArticles)
    })
  }

  updatePage(page: any) {
    this.articleFilter.pageNumber = page
    this.articleService.updateArticles(this.articleFilter).subscribe(res => {
      this.paginatedArticles = res
      console.log(this.paginatedArticles)
    })
  }

}
