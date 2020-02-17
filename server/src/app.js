const path = require('path')

const express = require('express')
const app = express()

app.set('trust proxy', true)

const helmet = require('helmet')
app.use(helmet())

const body_parser = require('body-parser')
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

const routes = require('./routes')
app.use(routes)

const client = path.resolve(__dirname, '../..', 'client/build')
app.use(express.static(client))

app.use('*', (req, res) => {
  res.status(404).send({
    error: '404 Not Found',
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Running on http://localhost:${port}`))
