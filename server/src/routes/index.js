const router = require('express').Router()
module.exports = router

router.get('/api', (req, res) => {
  res.send({
    name: 'Tododo',
  })
})
