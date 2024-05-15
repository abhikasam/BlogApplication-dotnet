export class Article {
  constructor(
    public articleId: number = 0,
    public title: string = '',
    public authorId: number = 0,
    public content: string = '',
    public url: string = '',
    public publishedOn: (Date | undefined) = undefined,
    public articleCategories: object[] = [],
    public author: object = {}
  ) { }
}
