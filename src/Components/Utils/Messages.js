import React, {Component} from 'react'

export const Message = ({ type, text, onClose }) => 
  <div>
    <span>{text}</span>
    <button onClick={ onClose }>x</button>
  </div>

export class Messages extends Component{

  constructor(props){
    super(props)
    this.state = {
      messages:props.messages || []
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps != this.props){
      const { messages } = props
      if( messages && messages.length ){
        this.setState( { messages } )
      }
    }
  }

  handleClose = (id) => (event) => {
    const messages = this.state.message.slice()
    messages.splice(id,1)
    this.setState( { messages } )
  }

  render(){

    const { messages } = this.state
    const { handleClose } = this.handleClose

    if(!messages || !messages.length ){ return null }

    return (<div>
      { messages.map( ( message, i ) => <Message text={ message } key={ i } onClose={ handleClose(i) }/> ) }
    </div>)

  }
}

export default Messages