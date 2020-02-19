import db from '../db'

export const model = db.model('Checklist', {
    title: { type: String, required: true },
    checked: { type: Boolean, default: false },
    created: { type: Date, default: Date.now, },
})
