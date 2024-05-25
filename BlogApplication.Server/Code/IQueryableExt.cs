namespace BlogApplication.Server.Code
{
    public static class IQueryableExt
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, XPagination xPagination)
        {
            var totalRecords = queryable.Count();

            var totalPages = (totalRecords + xPagination.PageSize) / xPagination.PageSize;

            if (totalRecords % xPagination.PageSize == 0)
            {
                totalPages--;
            }

            if (totalPages < xPagination.PageNumber)
            {
                xPagination.PageNumber = 1;
            }

            var skip = (xPagination.PageNumber - 1) * xPagination.PageSize;
            var take = xPagination.PageSize;

            xPagination.TotalPages = totalPages;

            return queryable.Skip(skip).Take(take);
        }

    }
}
