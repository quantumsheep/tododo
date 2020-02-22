import { Router } from 'express'
const router = Router()
export default router

import * as checklists from '../models/checklist'

router.get('/api/todolist', async (req, res) => {
  const todolists = await checklists.model.find()

  res.send({
    success: true,
    todolists,
  })
})

router.get('/api/todolist/:id', async (req, res) => {
  try {
    const todolist = await checklists.model.findById(req.params.id)

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
  await checklists.model.create({
    title: req.query.title
  })

  res.send({
    success: true,
  })
})
