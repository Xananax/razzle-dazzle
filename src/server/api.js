import { Router } from 'express'
import fruits from "../services/Fruits/api"

const router = new Router()

router.use('/fruits', fruits )
router.use('/', (req, res) => res.send({status:200, message:'api works'}))

export default router