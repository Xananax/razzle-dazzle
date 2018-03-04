import React from 'react'
import { Route, Link } from "react-router-dom"
import Fruit from './Fruit'
import FruitNotFound from './FruitNotFound'

export const FruitsList = ( { fruits, url } ) => 
  <div>
    <h2>Fruits</h2>
    <ul>
    { fruits.map ( ( fruit, id ) => <li key={id}><Link to={`${url}/${id}`}>{fruit.title}</Link></li> )
    }
    <li><Link to={`${url}/nope`}>wrong link</Link></li>
    </ul>
    <hr/>
    <Route path={`${url}/:fruitId`} render={({match}) => getFruit(fruits, match.params.fruitId)}/>
    <Route exact path={url} render={() => <h3>Please select a fruit.</h3>}/>
  </div>

export const getFruit = ( fruits, id ) => {
  const fruit = fruits[id]
  if(!fruit){
    return <FruitNotFound id={id}/>
  }
  return <Fruit{...fruit}/>
}

export default FruitsList