
export class PaginatedResult <T>{
  constructor(
    public paginationParams: PaginationParams = new PaginationParams(),
    public data:T[]=[]
  ) { }
}

export class PaginationParams {
  constructor(
    public pageNumber: number = 1,
    public totalPageNumber: number = 1,
    public pageSize: number = 10
  ) { }
}
