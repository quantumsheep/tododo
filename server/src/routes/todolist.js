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
    .then((todolist) => {
      res.send({
        success: true,
        todolist: {
          id: todolist._id,
          title: todolist.title,
          checked: todolist.checked,
          tasks: todolist.tasks,
          created: todolist.created,
        }
      })
    })
})

router.delete('/api/todolist/:id', async (req, res) => {
  if (!req.params.id) {
    return res.send({
      success: false,
      errors: ["id is required"],
    })
  }

  await todolists.model.findByIdAndDelete(req.params.id)

  res.send({
    success: true,
  })
})

router.put('/api/todolist/:id', async (req, res) => {
  if (!req.params.id) {
    return res.send({
      success: false,
      errors: ["id is required"],
    })
  }

  if (!req.body.title) {
    return res.send({
      success: false,
      errors: ["title is required"],
    })
  }

  await todolists.model.findByIdAndUpdate(req.params.id, { title: req.body.title })

  return res.send({
    success: true,
  })
})

router.post('/api/todolist/:id', async (req, res) => {

  if (!req.params.id) {
    return res.send({
      success: false,
      errors: ["id is required"],
    })
  }

  const todolist = await todolists.model.findById(req.params.id)

  if (!req.body.title) {
    return res.send({
      success: false,
      errors: ["title is required"],
    })
  }

  const task = await todolist.tasks.create({
    title: req.body.title
  })

  todolist.tasks.push(task)
  todolist.save()

  res.send({
    success: true,
    task: {
      _id: task._id,
      title: task.title,
      checked: task.checked,
    },
  })
})

router.put('/api/todolist/:todolist_id/:task_id', async (req, res) => {
  if (!req.params.todolist_id) {
    return res.send({
      success: false,
      errors: ["todolist id is required"],
    })
  }
  else if (!req.params.task_id) {
    return res.send({
      success: false,
      errors: ["task id is required"],
    })
  }
  else if (!req.body.title) {
    return res.send({
      success: false,
      errors: ["title is required"],
    })
  }

  await todolists.model.findOneAndUpdate(
    { "_id": req.params.todolist_id, "tasks._id": req.params.task_id },
    {
      "$set": {
        "tasks.$.title": req.body.title
      }
    })

  res.send({
    success: true,
  })
})

router.put('/api/todolist/:todolist_id/:task_id/check', async (req, res) => {
  if (!req.params.todolist_id) {
    return res.send({
      success: false,
      errors: ["todolist id is required"],
    })
  }
  else if (!req.params.task_id) {
    return res.send({
      success: false,
      errors: ["task id is required"],
    })
  }
  else if (!req.body.checked && !typeof req.body.checked === "boolean") {
    return res.send({
      success: false,
      errors: ["checked property is required"],
    })
  }

  await todolists.model.findOneAndUpdate(
    { "_id": req.params.todolist_id, "tasks._id": req.params.task_id },
    {
      "$set": {
        "tasks.$.checked": req.body.checked
      }
    })

  res.send({
    success: true,
  })
})

router.delete('/api/todolist/:todolist_id/:task_id', async (req, res) => {
  if (!req.params.todolist_id) {
    return res.send({
      success: false,
      errors: ["todolist id is required"],
    })
  }
  else if (!req.params.task_id) {
    return res.send({
      success: false,
      errors: ["task id is required"],
    })
  }

  try {
    const todolist = await todolists.model.findById(req.params.todolist_id)

    todolist.tasks.pull({ _id: req.params.task_id })
    todolist.save();

    res.send({
      success: true,
    })
  } catch {
    res.send({
      success: false,
      errors: ["id does not exists"]
    })
  }
})
