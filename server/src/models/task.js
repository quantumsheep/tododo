import db from '../db'

export const model = db.model('Task', {
    title: { type: String, required: true },
    done: { type: Boolean, default: false, required: true }
})
