import { Router } from 'express'
import { add, edit, remove, search, getOne, getOneById, list } from './db'

const router = new Router()

const makeResponse = (res, status, data, error ) =>
  res.status(status).send({ status, data, error })

router.get('/add', ( req, res ) => {
  const { title, slug, text } = req.query
  return add({title, slug, text})
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 403, err, true))
})

router.get('/remove/:id', ( req, res ) => {
  const { id } = req.params
  return remove(id)
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 404, err, true))
})

router.get('/edit/:id', ( req, res ) => {
  const { title, slug, text } = req.query
  const { id } = req.params
  return edit(id,{title, slug, text})
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 404, err, true))
})

router.get('/list/:sort?/:dir?', ( req, res ) => {
  const { page, amount } = req.query
  const { sort } = req.params
  return list(sort, page, amount, dir)
    .then( articles_list => makeResponse(res, 200, articles_list ))
    .catch( err => makeResponse(res, 500, err, true))
})

router.get('/get/:id', ( req, res ) => {
  const { id } = req.params
  getOneById(id)
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 404, err, true))
})

router.get('/', ( req, res ) => {
  res.send({status:200, message:'articles api works'})
})

export default router
