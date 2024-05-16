import { ArticleCategory } from "./articleCategory.model";

export class Category {
  constructor(
    public categoryId: number = 0,
    public categoryName: string = '',
    public articleCategories: ArticleCategory[] = []
  ) { }
}
