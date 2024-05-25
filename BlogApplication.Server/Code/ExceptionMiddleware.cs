using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using System;

namespace BlogApplication.Server.Code
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;

        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger)
        {
            this.next = next;
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        public static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";
            switch (ex)
            {
                case UnauthorizedAccessException _:
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    break;
                default:
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    break;
            }

            if (!context.User.Identity.IsAuthenticated)
            {
                var response = new
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "Please sign in",
                    Detailed = ex.Message
                };
                return context.Response.WriteAsync(JsonHelper.Serialize(response));
            }
            else
            {
                var response = new
                {
                    StatusCode = context.Response.StatusCode,
                    Message = "Internal Server Error. Please try again later.",
                    Detailed = ex.Message // You might want to remove this in production
                };
                return context.Response.WriteAsync(JsonHelper.Serialize(response));
            }
        }
    }
}
