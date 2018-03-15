import { Router } from 'express'
import { add, edit, remove, search, getOne, getOneById, list } from './db'
import strToSlug from '../../utils/strToSlug'

const router = new Router()

const makeResponse = (res, status, data, error ) =>
  res.status(status).send({ status, data, error })

router.get('/add', ( req, res ) => {
  const { title, text } = req.query
  const slug = req.query.slug || ( title && strToSlug(title) )
  return add({title, slug, text})
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 403, err.message, true))
})

router.get('/remove/:id', ( req, res ) => {
  const { id } = req.params
  return remove(id)
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 404, err.message, true))
})

router.get('/edit/:id', ( req, res ) => {
  const { title, slug, text } = req.query
  const { id } = req.params
  return edit(id,{title, slug, text})
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 404, err.message, true))
})

router.get('/list/:sort?/:dir?', ( req, res ) => {
  const { amount } = req.query
  const page = (req.query || 1) - 1
  const { sort, dir } = req.params
  return list(sort, page, amount, dir)
    .then( articles_list => makeResponse(res, 200, articles_list ))
    .catch( err => makeResponse(res, 500, err.message, true))
})

router.get('/get/:id', ( req, res ) => {
  const { id } = req.params
  return getOneById(id)
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 404, err.message, true))
})

router.get('/getBy/:prop/:value', ( req, res ) => {
  const { prop, value } = req.params
  return getOne(prop,value)
    .then( article => makeResponse(res, 200, article ))
    .catch( err => makeResponse(res, 404, err.message, true))
})

router.get('/search/:term/:prop?', ( req, res ) => {
  const { term } = req.params
  const prop = req.params.prop || 'slug'
  return search(prop,term)
    .then( articles_list => makeResponse(res, 200, articles_list ))
    .catch( err => makeResponse(res, 404, err.message, true))
})

router.get('/', ( req, res ) => {
  res.send({status:200, message:'articles api works'})
})

export default router
