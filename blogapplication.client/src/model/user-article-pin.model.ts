
export class UserArticlePin{
  constructor(
    private userArticlePinId: number=0,
    private userId: number = 0,
    private articleId: number = 0,
    private orderId: number = 0,
    private pinned: boolean=true
  )
  { }
}

