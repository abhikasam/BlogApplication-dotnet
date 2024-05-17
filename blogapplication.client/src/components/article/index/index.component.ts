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
  articleFilter: ArticleFilter = new ArticleFilter()

  authors: KeyPair[] = []
  categories: KeyPair[] = []

  selectedAuthors: string[] = []
  selectedCategories: string[] = []

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(result => {
      this.articles = result
    })

    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.map(i => new KeyPair(i.categoryId.toString(), i.categoryName))
    })

    this.authorService.getAuthors().subscribe(res => {
      this.authors = res.map(i => new KeyPair(i.authorId.toString(), i.authorName))
    })
  }

  selectAuthors(items: string[]) {
    this.selectedAuthors = items
  }

  selectCategories(items: string[]) {
    this.selectedCategories = items
  }

  updateArticles() {
    this.articleFilter = new ArticleFilter(this.selectedAuthors, this.selectedCategories)
    this.articleService.updateArticles(this.articleFilter).subscribe(res => {
      this.articles=res
    })
  }

}
