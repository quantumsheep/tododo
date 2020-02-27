import path from 'path'
import express from 'express'
import helmet from 'helmet'
import body_parser from 'body-parser'

import * as routes from './routes'

export const app = express()

app.set('trust proxy', true)

app.use(helmet())

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

app.use(Object.values(routes))

const client = path.resolve(__dirname, '../..', 'client/build')
app.use(express.static(client))

app.use('*', (req, res) => {
  res.sendFile(path.resolve(client, 'index.html'))
})

if (process.env.JEST_WORKER_ID === undefined) {
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Running on http://localhost:${port}`))
}
