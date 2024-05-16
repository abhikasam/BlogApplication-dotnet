import { Article } from "./article.model";
import { Category } from "./category.model";

export class ArticleCategory {
  constructor(
    public articleCategoryId: number = 0,
    public articleId: number = 0,
    public categoryId: number = 0,
    public article: Article = new Article(),
    public category: Category = new Category()
  ) { }
}
