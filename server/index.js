
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index.js')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" })
})

router.use('/api', routes);

app.listen(port, () => {
  console.log("App running on port ${port}.")
})