import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFilter } from '../../../model/article.filter';
import { AuthorService } from '../../../services/author.service';
import { CategoryService } from '../../../services/category.service';
import { KeyPair } from '../../../model/keypair.model';

@Component({
  selector: 'article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.css']
})
export class ArticleFilterComponent implements OnInit {
  @Input() articleFilters: ArticleFilter = new ArticleFilter()

  authors: KeyPair[] = []
  categories: KeyPair[] = []

  selectedAuthors: string[] = []
  selectedCategories: string[] = []

  filterCollapse: boolean = true

  constructor(
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) { }

  @Output() update: EventEmitter<ArticleFilter> = new EventEmitter()

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.map(i => new KeyPair(i.categoryId.toString(), i.categoryName))
    })
    if (this.categories.length) {
      this.authorService.getAuthors().subscribe(res => {
        this.authors = res.map(i => new KeyPair(i.authorId.toString(), i.authorName))
      })
    }
  }

  selectAuthors(items: string[]) {
    this.selectedAuthors = items
  }

  selectCategories(items: string[]) {
    this.selectedCategories = items
  }

  onUpdate() {
    var articleFilter = new ArticleFilter(this.selectedAuthors, this.selectedCategories)
    this.update.emit(articleFilter)
  }

}
