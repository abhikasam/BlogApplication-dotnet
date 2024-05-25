import { Article } from "./article.model";
import { UserAuthor } from "./user-author.model";

export class Author {
  constructor(
    public authorId: number = 0,
    public authorName: string = '',
    public articles: Article[] = [],
    public userAuthors: UserAuthor[] = [],
    public users: number[]=[]
  ) { }
}
