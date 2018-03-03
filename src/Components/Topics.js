import React from 'react'
import { Route, Link } from "react-router-dom";

const fruits = [
  { 
    title:'banana',
    rating:2,
    description:'A nice enough fruit, but really lacking the potato-ness necessary to be really nice.'
  },
  { 
    title:'cucumber',
    rating:-4,
    description:'A disgusting green slimy thing'
  },
  { 
    title:'Batata',
    rating:20,
    description:'A delicious deliciousness'
  }
]

const Fruit = ({ match }) => {
  const fruit = fruits[match.params.fruitId]
  if(!fruit){
    return <FruitNotFound id={match.params.fruitId}/>
  }
  return <FruitFound {...fruit}/>
}

const FruitNotFound = ({id}) =>
  <div>unfortunately, this fruit {id} does not exist</div>

const FruitFound = ({ title, rating, description }) =>
  <div>
    <h2>{ title }</h2>
    <h2>rating: { rating }/5</h2>
    <h3>{ description }</h3>
  </div>

export const Fruits = ({ match }) => (
  <div>
    <h2>Fruits</h2>
    <ul>
    { fruits.map ( ( fruit, id ) => <li key={id}><Link to={`${match.url}/${id}`}>{fruit.title}</Link></li> )
    }
    <li><Link to={`${match.url}/nope`}>wrong link</Link></li>
    </ul>
    <hr/>
    <Route path={`${match.url}/:fruitId`} component={Fruit}/>
    <Route exact path={match.url} render={() => <h3>Please select a fruit.</h3>}/>
  </div>
) 

export default Fruits