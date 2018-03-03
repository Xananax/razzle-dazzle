import React, { Component } from 'react'
import FruitsList from './FruitsList'
import FruitLoading from './FruitLoading'
import FruitsError from './FruitsError'

class FruitsContainer extends Component{
  constructor(props){
    super(props)
    this.state = { fruits: null }
  }
  get(url){
    return fetch(url)
      .then( response => response.json() )
      .then( response => {
        if(response.error){
          throw new Error(response.data)
        }
        this.setState({ error:null })
        return response.data
      })
      .catch( err => this.setState({error:err.message}))
  }
  loadList(){
    const url = '/api/fruits/list'
    this.get(url)
      .then( fruits => {
        this.setState({ fruits })
      })
  }
  componentDidMount(){
    this.loadList()
  }
  prepareRender(){
    const fruits = this.state.fruits
    const url = this.props.match.url
    const error = this.state.error
    const loaded = fruits !== null
    return { fruits, url, error, loaded }
  }
  renderError(message){
    return <FruitsError message={message}/>
  }
  renderLoading(){
    return <FruitLoading/>
  }
  render(){
    const { fruits, url, error, loaded } = this.prepareRender()

    if(error){ return this.renderError(error) }
    if( !loaded ){ return this.renderLoading() }

    return <FruitsList url={url} fruits={fruits}/>
  }
}

export default FruitsContainer