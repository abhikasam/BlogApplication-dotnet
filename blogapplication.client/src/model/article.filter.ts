
export class ArticleFilter {
  constructor(
    public authorIds: string[] = [],
    public categoryIds: string[] = [],
    public pageSize: number = 10,
    public pageNumber: number=1
  ) { }
}
