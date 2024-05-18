using System.Drawing.Printing;

namespace BlogApplication.Server.Code
{
    public class PaginationResult<T> : IPaginationResult<T> where T : class
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
                PageNumber = pageNumber,
                TotalPageNumber = totalPageNumber,
                PageSize = pageSize,
                Result = queryable
            };
            return result;
        }
    }
}
