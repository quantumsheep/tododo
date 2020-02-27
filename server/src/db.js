import mongoose, { mongo } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export const memory_server = new MongoMemoryServer()

export async function connect() {
  let uri = process.env.MONGO_URL || 'mongodb://localhost:27017/tododo'

  if (process.env.JEST_WORKER_ID !== undefined) {
    uri = await memory_server.getConnectionString(true)
  }

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

connect()

if (process.env.JEST_WORKER_ID !== undefined) {
  beforeAll(async () => await connect())

  afterEach(async () => {
    const collections = Object.values(mongoose.connection.collections)
    await Promise.all(collections.map(c => c.deleteMany()))
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await memory_server.stop()
  })
}

export default mongoose
