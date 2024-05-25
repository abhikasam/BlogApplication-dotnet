const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7158';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/article",
      "/api/category",
      "/api/author",
      "/api/register",
      "/api/login",
      "/api/userarticlelike",
      "/api/userarticlepin"
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
