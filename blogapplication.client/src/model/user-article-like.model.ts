
export class UserArticleLike {
  constructor(
    private userArticleLikeId: number = 0,
    private userId: number = 0,
    private articleId: number = 0,
    private liked: boolean=true
  ) { }
}
