const db = require('../db')

const model = db.model('TodoList', {
    title: { type: String, required: true},
    checked: { type: Boolean, default: false},
    created: { type: Date, default: Date.now, },
})

exports.model = model

