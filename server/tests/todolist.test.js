import supertest from 'supertest'
import { app } from '../src/app'

const request = supertest(app)

describe('Endpoints for todolist', () => {

  it('should create a new todolist named test 1', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 1',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success')
    expect(res.body.success).toBe(true)
    expect(check.body).toHaveProperty('todolist')
    expect(result.body.todolist.title).toBe('test 2')
  })

  it('should not create a new todolist if title missing', async () => {
    const res = await request
      .post('/api/todolist')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success')
    expect(res.body).toHaveProperty('errors')
    expect(res.body.success).toBe(false)
    expect(res.body.errors[0]).toBe('title is required')
  })

  it('should create a new todolist named test 2', async () => {
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

  it('should get all todolists', async () => {
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

    expect(check.statusCode).toBe(200)
    expect(check.body).toHaveProperty('success')
    expect(check.body.success).toBe(true)
    expect(check.body).toHaveProperty('todolist')
    expect(check.body.todolist.title).toBe('title updated')
  })

  it('should create a new task for a specific todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 5',
      })

    const result = await request
      .post(`/api/todolist/${res.body.todolist.id}`)
      .send({
        title: 'new task',
      })

    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveProperty('success')
    expect(result.body.success).toBe(true)
    expect(result.body).toHaveProperty('task')
    expect(result.body.task.title).toBe('new task')

    const check = await request
      .get(`/api/todolist/${res.body.todolist.id}`)
      .send()

    expect(check.statusCode).toBe(200)
    expect(check.body.todolist.tasks.length).toBe(1)
    expect(check.body.todolist.tasks[0]).toHaveProperty('title')
    expect(check.body.todolist.tasks[0].title).toBe('new task')
  })

  it('should not create a new task for a specific todolist if title is empty', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 6',
      })

    const result = await request
      .post(`/api/todolist/${res.body.todolist.id}`)
      .send()

    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveProperty('success')
    expect(result.body.success).toBe(false)
  })

  it('should update the title property of a task for a specific todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 7',
      })

    const result = await request
      .post(`/api/todolist/${res.body.todolist.id}`)
      .send({
        title: 'new task',
      })

    const res_update = await request
      .put(`/api/todolist/${res.body.todolist.id}/${result.body.task._id}`)
      .send({
        title: 'my new title',
      })

    expect(res_update.statusCode).toBe(200)
    expect(res_update.body).toHaveProperty('success')
    expect(res_update.body.success).toBe(true)
  })

  it('should update the checked property of a task for a specific todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 8',
      })

    const result = await request
      .post(`/api/todolist/${res.body.todolist.id}`)
      .send({
        title: 'new task',
      })

    const res_update = await request
      .put(`/api/todolist/${res.body.todolist.id}/${result.body.task._id}/check`)
      .send({
        checked: true,
      })

    expect(res_update.statusCode).toBe(200)
    expect(res_update.body).toHaveProperty('success')
    expect(res_update.body.success).toBe(true)
  })

  it('should delete a task from a todolist', async () => {
    const res = await request
      .post('/api/todolist')
      .send({
        title: 'test 8',
      })

    const result = await request
      .post(`/api/todolist/${res.body.todolist.id}`)
      .send({
        title: 'new task',
      })

    const res_delete = await request
      .delete(`/api/todolist/${res.body.todolist.id}/${result.body.task._id}`)
      .send()

    expect(res_delete.statusCode).toBe(200)
    expect(res_delete.body).toHaveProperty('success')
    expect(res_delete.body.success).toBe(true)

    const check = await request
      .get(`/api/todolist/${res.body.todolist.id}`)
      .send()

    expect(check.statusCode).toBe(200)
    expect(check.body).toHaveProperty('success')
    expect(check.body.success).toBe(true)
  })

})
