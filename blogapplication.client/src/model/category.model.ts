import { Article } from "./article.model";
import { ArticleCategory } from "./articleCategory.model";
import { UserCategory } from "./user-category.model";
import { User } from "./user.model";

export class Category {
  constructor(
    public categoryId: number = 0,
    public categoryName: string = '',
    public articleCategories: ArticleCategory[] = [],
    public articles: Article[] = [],
    public userCategories: UserCategory[] = [],
    public users: number[] = [],
    public isFollowing:boolean=false
  ) { }
}
