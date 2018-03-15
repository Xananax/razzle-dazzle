import React, { Component } from 'react'
import fetchJSON from '../../utils/fetchJSON'

class ArticlesContainer extends Component{
  constructor(props){
    super(props)
    this.state = { articles: null }
  }
  get(url){
    return fetchJSON(url)
      .then( response => {
        this.setState({ error:null })
        return response
      })
      .catch( err => this.setState({error:err.message}))
  }
  loadList(){
    const url = '/api/articles/list'
    this.get(url)
      .then( articles => {
        this.setState({ articles })
      })
  }
  componentDidMount(){
    this.loadList()
  }
  prepareRender(){
    const articles = this.state.articles
    const url = this.props.match.url
    const error = this.state.error
    const loaded = articles !== null
    return { articles, url, error, loaded }
  }
  renderError(message){
    return <div>Error! {message}</div>
  }
  renderLoading(){
    return <div>...loading...</div>
  }
  render(){
    const { articles, url, error, loaded } = this.prepareRender()

    if(error){ return this.renderError(error) }
    if( !loaded ){ return this.renderLoading() }
    console.log(url)
    return <div>{articles.map(article=><div>{article.title}</div>)}</div>
  }
}

export default ArticlesContainer