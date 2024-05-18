
export class PaginatedResult <T>{
  constructor(
    public pageNumber: number = 0,
    public totalPageNumber: number = 0,
    public pageSize: number = 0,
    public result:T[]=[]
  ) { }
}
