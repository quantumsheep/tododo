const express = require('express')
const app = express()

const routes = require('./routes/router')
app.use(routes)

app.use('*', (req, res) => {
  res.status(404).send({
    error: '404 Not Found',
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Running on http://localhost:${port}`))
