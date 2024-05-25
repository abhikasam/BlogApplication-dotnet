export class UserAuthor {
  constructor(
    public userAuthorId: number = 0,
    public userId: number = 0,
    public authorId: number = 0,
    public isFollowing: boolean=false
  )
  { }
}
