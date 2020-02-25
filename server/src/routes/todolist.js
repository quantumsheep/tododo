import { Router } from 'express'
const router = Router()
export default router

import * as todolists from '../models/todolist'

router.get('/api/todolist', async (req, res) => {

  res.send({
    success: true,
    todolists: (await todolists.model.find()).map(todolist => ({
      id: todolist._id,
      title: todolist.title,
      tasks: todolist.tasks,
      checked: todolist.checked,
      created: todolist.created,
    })),
  })
})

router.get('/api/todolist/:id', async (req, res) => {
  try {
    const todolist = await todolists.model.findById(req.params.id)

    res.send({
      success: true,
      todolist: {
        id: todolist._id,
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
  if (!req.body?.title) {
    return res.send({
      success: false,
      errors: ["title is required"],
    })
  }

  await todolists.model.create({
    title: req.body.title
  })

  res.send({
    success: true,
  })
})
