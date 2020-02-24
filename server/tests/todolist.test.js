import supertest from 'supertest'
import { app } from '../src/app'

const request = supertest(app)

describe('Endpoints for a todolist', () => {

  it('should create a new todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test to create a todolist',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success')
    expect(res.body.success).toBe(true)
  })

  it('should not create a new todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("success")
    expect(res.body).toHaveProperty("errors")
    expect(res.body.success).toBe(false)
  })

  it('should get all the todolists', async () => {
    const res = await request
      .get('/api/todolist')
      .send()
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("success")
    expect(res.body.success).toBe(true)
    expect(res.body).toHaveProperty("todolists")
  })
})
