import { Router } from 'express'
const router = Router()
export default router

router.get('/api', (req, res) => {
  res.send({
    name: 'Tododo',
  })
})
