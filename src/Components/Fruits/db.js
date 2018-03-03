const fruits_list = [
  { id:0,
    title:'banana',
    rating:2,
    description:'A nice enough fruit, but really lacking the potato-ness necessary to be really nice.'
  },
  { id:1,
    title:'cucumber',
    rating:-4,
    description:'A disgusting green slimy thing'
  },
  { id:2,
    title:'Batata',
    rating:20,
    description:'A delicious deliciousness'
  }
]

let ids = fruits_list.length

export const add = ({ title, rating, description }) => {
  const id = ids++
  const new_fruit = { title, rating, description, id }
  return validate(new_fruit)
    .then( new_fruit => {
      fruits_list.push(new_fruit)
      return new_fruit
    })
}

export const remove = (_id) => {
  const index = fruits_list.findIndex( ({id})=> id === _id )
  if(index < 0){
    return Promise.reject(new Error(`fruit ${_id} does not exist`))
  }
  const removed = fruits_list[index]
  fruits_list.splice(index,1)
  return Promise.resolve(removed)
}

export const edit = ( _id, modified) => {
  const index = fruits_list.findIndex( ({id})=> id === _id )
  if(index < 0){ 
    return Promise.reject(new Error(`fruit ${_id} does not exist`))
  }
  const fruit = fruits_list[index]
  const title = modified.title || fruit.title
  const rating = modified.rating || fruit.rating
  const description = modified.description || fruit.description
  const modified_fruit = { id:_id, title, rating, description }
  return validate(modified_fruit)
    .then( modified_fruit => {
      fruits_list[index] = modified_fruit
      return modified_fruit
    })
}

export const list = (start, amount, sort) => {
  start = start || 0
  amount = amount ? start + amount : undefined
  if(sort === 'rating'){
    const list = fruits_list.slice().sort( ({rating:a},{rating:b})=>a-b).slice(start,amount)
    return Promise.resolve(list)
  }
  if(sort === 'title'){
    const list = fruits_list.slice().sort( ({title:a},{title:b})=>a-b).slice(start,amount)
    return Promise.resolve(list)
  }
  const list = fruits_list.slice(start,amount)
  return Promise.resolve(list)
}

export const getOne = (_id) => {
  const index = fruits_list.findIndex( ({id})=> id === _id )
  if(index < 0){ 
    return Promise.reject(new Error(`fruit ${_id} does not exist`))
  }
  return Promise.resolve(fruits_list[index])
}

export const validate = (fruit) => {
  if(!fruit){ return Promise.reject(new Error(`no fruit provided`)) }
  const errors = []
  if(!fruit.title){ errors.push(`no title provided`) }
  if(!fruit.rating){ errors.push(`no rating provided`)}
  if(!fruit.description){ errors.push(`no description provided`)}
  if(errors.length){
    const error_message = errors.join(', ')
    const error = new Error(error_message)
    return Promise.reject(error)
  }
  return Promise.resolve(fruit)
}