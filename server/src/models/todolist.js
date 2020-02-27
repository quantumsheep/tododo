import { Schema } from 'mongoose'

import db from '../db'

const Task = new Schema({
  title: { type: String, required: true, },
  checked: { type: Boolean, default: false, },
})

export const model = db.model('Todolist', {
  title: { type: String, required: true },
  checked: { type: Boolean, default: false, },
  tasks: { type: [Task], default: [], },
  created: { type: Date, default: Date.now, },
})
