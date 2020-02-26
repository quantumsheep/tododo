import supertest from 'supertest'
import { app } from '../src/app'
import * as todolists from '../src/models/todolist'

const request = supertest(app)

describe('Endpoints for todolist', () => {

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
    expect(res.body.todolist).toHaveProperty('id')

    const result = await request
      .get(`/api/todolist/${res.body.todolist.id}`)
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

  it('should delete a specific todo', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 3',
      })

    const result = await request
      .delete(`/api/todolist/${res.body.todolist.id}`)
      .send()

    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveProperty('success')
    expect(result.body.success).toBe(true)

    const check = await request
      .get(`/api/todolist/${res.body.id}`)
      .send()

    expect(check.statusCode).toBe(200)
    expect(check.body).toHaveProperty('success')
    expect(check.body.success).toBe(false)
  })

  it('should update a specific todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 4',
      })

    const result = await request
      .put(`/api/todolist/${res.body.todolist.id}`)
      .send({
        title: 'title updated',
      })

    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveProperty('success')
    expect(result.body.success).toBe(true)

    const check = await request
      .get(`/api/todolist/${res.body.todolist.id}`)
      .send()

    console.log(result.body)

    expect(check.statusCode).toBe(200)
    expect(check.body).toHaveProperty('success')
    expect(check.body.success).toBe(true)
    expect(check.body).toHaveProperty('todolist')
    expect(check.body.todolist.title).toBe('title updated')
  })

})
