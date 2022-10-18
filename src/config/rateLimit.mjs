import rateLimit from 'express-rate-limit'

export const setupRateLimit = (app, routes) => {
  routes.forEach(r => {
    if (r.rateLimit) {
      app.use(r.url, rateLimit(r.rateLimit));
    }
  })
}
