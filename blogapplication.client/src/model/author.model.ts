import { Article } from "./article.model";
import { PaginationParams } from "./paginatedResult.model";

export class Author {
  constructor(
    public authorId: number = 0,
    public authorName: string = '',
    public articles: Article[] = [],
    public paginationParams: PaginationParams = new PaginationParams()
  ) { }
}
