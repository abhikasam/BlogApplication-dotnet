using System.Drawing.Printing;

namespace BlogApplication.Server.Code
{
    public class PaginationResult<T>
    {
        public static PaginatedResult<T> GetPaginatedResult(IQueryable<T> queryable,int pageNumber=1,int pageSize=10)
        {
            var totalRecords =  queryable.Count();

            var totalPageNumber = (totalRecords + pageSize) / pageSize;

            if (totalRecords % pageSize == 0)
            {
                totalPageNumber--;
            }

            if (totalPageNumber < pageNumber)
            {
                pageNumber = 1;
            }

            var skip = (pageNumber - 1) * pageSize;
            var take = pageSize;

            queryable = queryable.Skip(skip).Take(take);
            PaginatedResult<T> result = new PaginatedResult<T>()
            {
                PaginationParams=new PaginationParams()
                {
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalPageNumber = totalPageNumber
                },
                Data = queryable
            };
            return result;
        }
    }

    public class PaginationParams
    {
        public int PageNumber { get; set; } = 1;
        public int TotalPageNumber { get; set; }
        public int PageSize { get; set; } = 10;
    }
    public class PaginatedResult<T>
    {
        public PaginationParams PaginationParams { get; set; }=new PaginationParams();
        public IQueryable<T> Data { get; set;}
    }
}
