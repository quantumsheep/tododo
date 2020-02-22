import { Router } from 'express'
import { model } from 'mongoose'
import * as checklists from '../models/checklist'
const router = Router()
export default router

router.get('/api/todolist/:id', (req, res) => {
  const todolist = checklists.model.findById(req.params.id)

  res.send({
    success: true,
    checklist: {
      title: checklist.title,
      checked: checklist.checked,
      tasks: checklist.tasks,
      created: checklist.created
    },
  })
})
