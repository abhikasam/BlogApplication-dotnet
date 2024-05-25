import { ArticleCategory } from "./articleCategory.model";
import { Author } from "./author.model";
import { Category } from "./category.model";
import { UserArticleLike } from "./user-article-like.model";
import { UserArticlePin } from "./user-article-pin.model";

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
    public categories: Category[] = [],
    public categoryIds: number[] = [],
    public userArticleLikes: UserArticleLike[]=[],
    public likedUsers: number[] = [],
    public userArticlePins: UserArticlePin[] = [],
    public pinnedUsers: number[]=[]
  ) { }
}
