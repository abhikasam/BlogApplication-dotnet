import { Article } from "./article.model";

export class Author {
  constructor(
    public authorId: number = 0,
    public authorName: string = '',
    public articles: Article[] = []
  ) { }
}
