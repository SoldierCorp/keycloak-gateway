import express from 'express'
import { setupLogging } from './config/morgan.mjs'
import { routes } from './config/routes.mjs'
import { setupProxies } from './config/proxy.mjs'
import { setupAuth } from './config/auth.mjs'
import { setupRateLimit } from './config/rateLimit.mjs'
import { login } from './gm/index.mjs'

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }));
setupLogging(app)
setupRateLimit(app, routes)
setupAuth(app, routes)

app.post('/gm/login', async (req, res) => {
  const response = await login(req.body.username, req.body.password)
  res.jsonp(response)
})

app.get("/statements", (req, res) => {
  const statements = ['statement1', 'statement2', 'statement3']
  res.jsonp({
    data: { statements }
  })
})

app.post("/statements", (req, res) => {
  const statements = ['statement1', 'statement2', 'statement3', 'statement4']
  res.jsonp({
    message: 'statement4 created successfully',
    data: { statements }
  })
})

app.put("/statements/:id", (req, res) => {
  const statements = ['statement1', 'statement2', 'statement3', 'statement4Updated']
  res.jsonp({
    message: 'statement4 updated successfully',
    data: { statements }
  })
})

setupProxies(app, routes)

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`)
})
