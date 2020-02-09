const express = require('express')
const app = express()

app.set('trust proxy', true)

const body_parser = require('body-parser')
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

const routes = require('./routes')
app.use(routes)

app.use('*', (req, res) => {
  res.status(404).send({
    error: '404 Not Found',
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Running on http://localhost:${port}`))
