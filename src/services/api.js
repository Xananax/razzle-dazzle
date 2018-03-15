import { Router } from 'express'
import fruits from './Fruits/api'
import articles from './Articles/api'

const router = new Router()

router.use('/articles', articles )
router.use('/fruits', fruits )
router.use('/', (req, res) => res.send({status:200, message:'api works'}))

export default router