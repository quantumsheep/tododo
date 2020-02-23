import { Router } from 'express'
const router = Router()
export default router

import * as todolists from '../models/todolist'

router.get('/api/todolist', async (req, res) => {
  const todolists = await todolists.model.find()

  res.send({
    success: true,
    todolists,
  })
})

router.get('/api/todolist/:id', async (req, res) => {
  try {
    const todolist = await todolists.model.findById(req.params.id)

    res.send({
      success: true,
      todolist: {
        title: todolist.title,
        checked: todolist.checked,
        tasks: todolist.tasks,
        created: todolist.created,
      },
    })
  } catch {
    res.send({
      success: false,
      errors: ["id is not valid."],
    })
  }
})

router.post('/api/todolist', async (req, res) => {
  await todolists.model.create({
    title: req.query.title
  })

  res.send({
    success: true,
  })
})
