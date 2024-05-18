import { ArticleCategory } from "./articleCategory.model";
import { Author } from "./author.model";
import { PaginatedResult, PaginationParams } from "./paginatedResult.model";

export class Category {
  constructor(
    public categoryId: number = 0,
    public categoryName: string = '',
    public articleCategories: ArticleCategory[] = [],
    public paginationParams: PaginationParams=new PaginationParams()
  ) {  }
}
