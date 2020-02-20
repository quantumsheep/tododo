import { Router } from 'express'
const router = Router()
export default router

import { uri } from '../db'

router.get('/api', (req, res) => {
  console.log(uri)
  res.send({
    name: 'Tododo',
  })
})
