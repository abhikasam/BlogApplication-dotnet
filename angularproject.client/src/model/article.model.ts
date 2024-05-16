import { ArticleCategory } from "./articleCategory.model";
import { Author } from "./author.model";
import { Category } from "./category.model";

export class Article {
  constructor(
    public articleId: number = 0,
    public title: string = '',
    public authorId: number = 0,
    public content: string = '',
    public url: string = '',
    public publishedOn: Date = new Date(),
    public articleCategories: ArticleCategory[] = [],
    public author: Author = new Author(),
    public categories: string[] =[]
  ) { }
}
