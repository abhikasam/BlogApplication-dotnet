namespace BlogApplication.Server.Code
{
    public interface IPaginationResult<T>
    {
        abstract static PaginatedResult<T> GetPaginatedResult(IQueryable<T> queryable,int pageNumber=1,int pageSize=10);        
    }
    public class PaginatedResult<T>
    {
        public int PageNumber { get; set; }
        public int TotalPageNumber { get; set; }
        public int PageSize { get; set; }
        public IQueryable<T> Result { get; set; }
    }
}
