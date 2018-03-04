import React from 'react'
import FruitsContainer from './FruitsContainer'

export class FruitsManager extends FruitsContainer{
  render(){
    const { fruits, url, error, loaded } = this.prepareRender()

    if(error){ return this.renderError(error) }
    if( !loaded ){ return this.renderLoading() }

    return <FruitsList url={url} fruits={fruits}/>
  }
}

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
