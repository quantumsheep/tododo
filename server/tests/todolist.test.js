import supertest from 'supertest'
import { app } from '../src/app'
import * as todolists from '../src/models/todolist'

const request = supertest(app)

describe('Endpoints for a todolist', () => {

  it('should create a new todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 1',
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
    expect(res.body).toHaveProperty('success')
    expect(res.body).toHaveProperty('errors')
    expect(res.body.success).toBe(false)
  })

  it('should create a new todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 2',
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success')
    expect(res.body.success).toBe(true)
    expect(res.body).toHaveProperty('id')

    const result = await request
      .get(`/api/todolist/${res.body.id}`)
      .send()

    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveProperty('success')
    expect(result.body.success).toBe(true)
    expect(result.body).toHaveProperty('todolist')
    expect(result.body.todolist.title).toBe('test 2')
  })

  it('should get all the todolists', async () => {
    const res = await request
      .get('/api/todolist')
      .send()

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('success')
    expect(res.body.success).toBe(true)
    expect(res.body).toHaveProperty('todolists')
    expect(Array.isArray(res.body.todolists)).toBe(true)
    expect(res.body.todolists.length).toBe(2)
  })

})
