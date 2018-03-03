import { Router } from 'express'
import { add, remove, edit, list, getOne } from './db'

const router = new Router()

const makeResponse = (res, status, data, error ) =>
  res.status(status).send({ status, data, error })

router.get('/add', ( req, res ) => {
  const { title, rating, description } = req.query
  return add({title,rating,description})
    .then( fruit => makeResponse(res, 200, fruit ))
    .catch( err => makeResponse(res, 403, err, true))
})

router.get('/remove/:id', ( req, res ) => {
  const { id } = req.params
  return remove(id)
    .then( fruit => makeResponse(res, 200, fruit ))
    .catch( err => makeResponse(res, 404, err, true))
})

router.get('/edit/:id', ( req, res ) => {
  const { title, rating, description } = req.query
  const { id } = req.params
  return edit(id,{title, rating, description})
    .then( fruit => makeResponse(res, 200, fruit ))
    .catch( err => makeResponse(res, 404, err, true))
})

router.get('/list/:sort?', ( req, res ) => {
  const { start, amount } = req.query
  const { sort } = req.params
  return list(start,amount,sort)
    .then( fruits_list => makeResponse(res, 200, fruits_list ))
    .catch( err => makeResponse(res, 500, err, true))
})

router.get('/get/:id', ( req, res ) => {
  const { id } = req.params
  getOne(id)
    .then( fruit => makeResponse(res, 200, fruit ))
    .catch( err => makeResponse(res, 404, err, true))
})

router.get('/', ( req, res ) => {
  res.send({status:200, message:'fruits api works'})
})

export default router